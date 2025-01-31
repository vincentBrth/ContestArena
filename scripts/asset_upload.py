#!/usr/bin/env python

import argparse
import datetime
import json
import os
import pprint
from dataclasses import dataclass

import firebase_admin
from firebase_admin import credentials, storage
from fuzzywuzzy import process


@dataclass
class EventTemplate:
    """Template"""

    @staticmethod
    def date_time_to_json(date_str, time_str):
        full_date_str = f"{date_str} {time_str}"
        date_time_obj = datetime.datetime.strptime(full_date_str, "%d/%m/%Y %Hh%M")
        date_time_json = date_time_obj.isoformat()

        return date_time_json

    @dataclass
    class Event:
        @dataclass
        class Round:
            locked: bool
            max: int
            name: str
            points: int
            pool: list[str]
            qualified: list[str]
            watch: bool

        rounds: list[Round]

    @dataclass
    class Settings:
        @dataclass
        class Candidate:
            abstract: str
            asset: str
            link: str
            subtitle: str
            title: str
            title_img: str

        @dataclass
        class EventInfo:
            abstract: str
            asset: str
            date: str
            name: str

        admins: list[str]
        base_pool: dict[str, Candidate]
        enabled: bool
        info: EventInfo
        message: str
        password: str
        propagate: bool
        theme: str
        asset_in_use : int

    event: Event
    settings: Settings


class Event(EventTemplate):
    """Event Template"""

    def __init__(
        self,
        name: str,
        date: str,
        abstract: str,
        conf: dict,
        admins: list[str],
        propagate: bool,
        theme: str,
        event_asset: str,
    ):
        self.event = self.Event(
            rounds=[
                self.Event.Round(
                    value["locked"] if "locked" in value else True,
                    value["max"] if "max" in value else 0,
                    value["name"] if "name" in value else "NA",
                    value["points"] if "points" in value else 0,
                    list(conf["pool"].keys()) if key == 0 else [],
                    values["qualfied"] if "qualified" in value else [],
                    value["watch"] if "watch" in value else True,
                )
                for key, value in enumerate(conf["rounds"])
            ]
        )

        self.settings = self.Settings(
            admins=admins,
            base_pool={
                key: self.Settings.Candidate(
                    value["abstract"] if "abstract" in value else "",
                    value["asset"] if "asset" in value else "",
                    value["link"] if "link" in value else "",
                    value["subtitle"] if "subtitle" in value else "",
                    value["title"] if "title" in value else "",
                    value["title_img"] if "title_img" in value else "",
                )
                for key, value in conf["pool"].items()
            },
            enabled=True,
            info=self.Settings.EventInfo(
                abstract=abstract,
                asset=event_asset,
                date=date,
                name=name,
            ),
            message="",
            password="",
            propagate=propagate,
            theme=theme,
            asset_in_use=0,
        )


def _bind(path, pool):
    found = {}
    assets = [
        os.path.join(path, f)
        for f in os.listdir(path)
        if os.path.isfile(os.path.join(path, f))
        and f.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp"))
    ]
    for asset in assets:
        filename = os.path.basename(asset)

        if pool:
            closest_match = process.extractOne(filename, pool)
            if closest_match is not None and len(closest_match) == 2:
                found[asset] = closest_match[0]
            else:
                found[asset] = ""
        else:
            found[asset] = ""

    # check if no duplicates values or empty values
    if len(set(found.values())) != len(found) or "" in found.values():
        pprint.pprint(found)
        exit("Error: duplicate or empty values")

    return found


def gen_template(event, path):
    """Generate template"""
    json_data = json.dumps(
        event, default=lambda o: o.__dict__, ensure_ascii=False, indent=4
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(json_data)
        print(f"\nTemplate generated to {path}")


def rename_assets(path, pool):
    """Rename assets according to pool"""
    # bind assets to candidates
    found = _bind(path, pool)

    # rename assets
    for asset, name in found.items():
        if os.path.basename(asset) == name + ".png":
            continue
        os.rename(asset, os.path.join(path, name + ".png"))
        print(f"{asset} renamed to {name + '.png'}")


def upload_assets(path, dist_path, pool, firebase_json_path, bucket_name):
    """Upload assets to firebase storage"""
    found = _bind(path, pool)
    uploaded = {}
    # Firebase
    cred = credentials.Certificate(firebase_json_path)
    firebase_admin.initialize_app(cred, {"storageBucket": bucket_name})

    found = _bind(path, pool)
    bucket = storage.bucket()

    # upload assets
    for asset_path, asset_key in found.items():
        tmp_dist_path = os.path.join(dist_path, os.path.basename(asset_path))
        blob = bucket.blob(tmp_dist_path)
        ret = blob.upload_from_filename(asset_path)
        print(
            f"[{asset_key}]".ljust(30)
            + f"{asset_path}".ljust(50)
            + f"uploaded to {tmp_dist_path}"
        )

        storage_ref = storage.bucket().get_blob(tmp_dist_path)
        if storage_ref:
            storage_ref.make_public()
            uploaded[asset_key] = storage_ref.public_url

    return uploaded


def main():
    # Parse arguments
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--template",
        help="event template to use",
        choices=["missfrance", "eurovision"],
        required=True,
    )
    parser.add_argument("--name", help="event name", required=True)
    parser.add_argument("--date", help="event date (ex: 01/01/2024)", required=True)
    parser.add_argument("--time", help="event time (ex: 21h00)", required=True)
    parser.add_argument("--abstract", help="event abstract", default="")
    parser.add_argument("--asset", help="event asset", default="")
    parser.add_argument(
        "--admins",
        help="event admins",
        type=list,
        default=["QBOULQWohKMTEIskyDr6cr3AsFg2"],
    )
    parser.add_argument("--path", help="path to assets", required=True)
    parser.add_argument("--conf", help="path to conf", default="conf.json")
    parser.add_argument(
        "--fireconf", help="firebase conf file", default="firebase.json"
    )
    parser.add_argument(
        "--firebucket",
        help="firebase conf file",
        default="contestarena-5c70a.appspot.com",
    )
    parser.add_argument("--firedist", help="firebase dist path", required=True)

    args = parser.parse_args()

    # Load conf
    with open(args.conf, "r", encoding="utf-8") as f:
        conf = json.load(f)

    # Initialize template
    if args.template == "eurovision":
        template = Event(
            args.name,
            EventTemplate.date_time_to_json(args.date, args.time),
            args.abstract,
            conf[args.template],
            args.admins,
            False,
            "purple",
            args.asset
            if args.asset
            else "https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/contest%2FEurovision2k23%2Feurovision_2K23.jpg?alt=media&token=e4e50459-9321-432a-b70b-f7995209c9e7",
        )
    elif args.template == "missfrance":
        template = Event(
            args.name,
            EventTemplate.date_time_to_json(args.date, args.time),
            args.abstract,
            conf[args.template],
            args.admins,
            True,
            "linen",
            args.asset
            if args.asset
            else "https://firebasestorage.googleapis.com/v0/b/contestarena-5c70a.appspot.com/o/contest%2FMissFrance2k23%2F_event.png?alt=media&token=711baedd-f0b8-4fbe-90a7-58ff4511f12b",
        )
    else:
        exit("Error: unknown template")

    # Rename assets
    rename_assets(args.path, template.settings.base_pool.keys())

    # Upload
    uploaded = upload_assets(
        args.path,
        args.firedist,
        template.settings.base_pool.keys(),
        args.fireconf,
        args.firebucket,
    )
    print("-" * 100)
    pprint.pprint(uploaded)

    # Bind assets to candidates
    for key, value in template.settings.base_pool.items():
        value.asset = uploaded[key]
    gen_template(template, "event.json")


if __name__ == "__main__":
    main()
