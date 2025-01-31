#!/usr/bin/env python

import os
import argparse
from PIL import Image
import pprint


def _assets(path):
    return [
        os.path.join(path, f)
        for f in os.listdir(path)
        if os.path.isfile(os.path.join(path, f))
        and f.lower().endswith((".png", ".jpg", ".jpeg", ".gif", ".webp"))
    ]


def crop(assets, output, top, bottom, left, right):
    """
    Crop images from the top, bottom, left and right
    """
    if not os.path.exists(output):
        os.makedirs(output)

    for asset in assets:
        img = Image.open(asset)
        width_orig, height_orig = img.size
        cropped_img = img.crop((left, top, width_orig - right, height_orig - bottom))
        filename = os.path.basename(asset)
        output_path = os.path.join(output, filename.split(".")[0] + ".png")
        cropped_img.save(output_path, format="PNG")
        print(f"{asset} cropped.")


def resize(assets, output, width, height):
    """
    Resize images to the desired size
    """
    if not os.path.exists(output):
        os.makedirs(output)

    for asset in assets:
        img = Image.open(asset)
        width_orig, height_orig = img.size
        width = width if width > 0 else width_orig
        height = height if height > 0 else height_orig
        img = img.resize((width, height), Image.LANCZOS)
        filename = os.path.basename(asset)
        output_path = os.path.join(output, filename.split(".")[0] + ".png")
        img.save(output_path, format="PNG")
        print(f"{asset} resized.")


def check(assets):
    """
    Check if all images have the same size
    """
    if not assets:
        print("No assets found.")
        return {}

    image_sizes = {}
    for asset in assets:
        img = Image.open(asset)
        width, height = img.size
        size_key = (width, height)
        if size_key not in image_sizes:
            image_sizes[size_key] = []
        image_sizes[size_key].append(asset)

    if len(image_sizes) != 1:
        print("Images have different sizes:")
        pprint.pprint(image_sizes)
    else:
        print(f"Images have same sizes {list(image_sizes.keys())[0]}")


def main():
    parser = argparse.ArgumentParser(description="Simple tool to edit images")
    subparsers = parser.add_subparsers(title="commands", dest="commands", required=True)

    # crop
    parser_crop = subparsers.add_parser("crop", help="crop assets")
    parser_crop.add_argument("source_folder", type=str, help="Source asset directory")
    parser_crop.add_argument("output_folder", type=str, help="Output asset directory")
    parser_crop.add_argument(
        "--top", type=int, default=0, help="Number of pixels to crop from the top"
    )
    parser_crop.add_argument(
        "--bottom", type=int, default=0, help="Number of pixels to crop from the bottom"
    )
    parser_crop.add_argument(
        "--left", type=int, default=0, help="Number of pixels to crop from the left"
    )
    parser_crop.add_argument(
        "--right", type=int, default=0, help="Number of pixels to crop from the right"
    )

    # resize
    parser_crop = subparsers.add_parser("resize", help="resize assets")
    parser_crop.add_argument("source_folder", type=str, help="Source asset directory")
    parser_crop.add_argument("output_folder", type=str, help="Output asset directory")
    parser_crop.add_argument(
        "--width", type=int, default=0, help="Width of the desired resize"
    )
    parser_crop.add_argument(
        "--height", type=int, default=0, help="Height of the desired resize"
    )

    # check
    parser_check = subparsers.add_parser(
        "check", help="Check if all images have the same size"
    )
    parser_check.add_argument("source_folder", type=str, help="Source asset directory")

    args = parser.parse_args()

    # Do commands
    assets = _assets(args.source_folder)
    if not assets:
        print("No assets found.")
        return

    if args.commands == "crop":
        crop(assets, args.output_folder, args.top, args.bottom, args.left, args.right)
    elif args.commands == "resize":
        resize(assets, args.output_folder, args.width, args.height)
    elif args.commands == "check":
        check(assets)


if __name__ == "__main__":
    main()
