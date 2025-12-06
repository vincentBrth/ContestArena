import os

import firebase_admin
from firebase_admin import credentials, storage


def init_firebase(service_account_path: str, storage_bucket: str):
    cred = credentials.Certificate(service_account_path)
    firebase_admin.initialize_app(cred, {"storageBucket": storage_bucket})
    print("✔️ Firebase connecté.")


def upload_image(local_path: str, remote_path: str):
    bucket = storage.bucket()
    blob = bucket.blob(remote_path)

    blob.upload_from_filename(local_path)
    blob.make_public()  # rendre public (optionnel)

    print(f"📤 Upload : {remote_path}")
    print(f"🌍 URL : {blob.public_url}")
    return blob.public_url


def upload_folder(local_folder: str, remote_folder: str = ""):
    urls = {}

    for filename in os.listdir(local_folder):
        if filename.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
            local_path = os.path.join(local_folder, filename)
            remote_path = os.path.join(remote_folder, filename)

            url = upload_image(local_path, remote_path)
            urls[filename] = url

    return urls


if __name__ == "__main__":
    # https://console.firebase.google.com/u/0/project/contestarena-5c70a/settings/serviceaccounts/adminsdk
    SERVICE_ACCOUNT = "contestarena-5c70a-firebase-adminsdk-mevm8-beaa67e90d.json"  # fichier JSON Firebase
    BUCKET_NAME = "contestarena-5c70a.appspot.com"  # bucket Firebase

    FOLDER_LOCAL = "bikini/"  # dossier local contenant les images
    FOLDER_REMOTE = "contest/MissFrance2k26/bikini/"  # dossier dans Firebase

    init_firebase(SERVICE_ACCOUNT, BUCKET_NAME)
    urls = upload_folder(FOLDER_LOCAL, FOLDER_REMOTE)

    print("\n🎉 Upload terminé ! URLs générées :")
    for name, url in urls.items():
        print(f"{name} → {url}")
