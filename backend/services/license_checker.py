import json
import os

DB_PATH = os.path.join(
    os.path.dirname(__file__),
    "../sample_data/licenses.json"
)

def check_licenses(components):

    with open(DB_PATH, "r") as file:
        database = json.load(file)

    results = []

    for component in components:

        licenses = component.get("licenses", [])

        for license_name in licenses:

            info = database.get(
                license_name,
                {
                    "risk": "UNKNOWN",
                    "compatible": False
                }
            )

            results.append({
                "package": component["name"],
                "version": component["version"],
                "license": license_name,
                "risk": info["risk"],
                "compatible": info["compatible"]
            })

    return results