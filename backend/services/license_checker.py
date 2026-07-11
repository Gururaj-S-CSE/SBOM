import json

POLICY_FILE = "sample_data/license_policy.json"


def load_policy():
    with open(POLICY_FILE, "r") as file:
        return json.load(file)


def check_licenses(components):

    policy = load_policy()

    results = []

    for component in components:

        licenses = component.get("licenses", [])

        if not licenses:
            licenses = ["Unknown"]

        for license_name in licenses:

            risk = policy.get(license_name, "Unknown")

            results.append({
                "component": component["name"],
                "version": component["version"],
                "license": license_name,
                "risk": risk
            })

    return results