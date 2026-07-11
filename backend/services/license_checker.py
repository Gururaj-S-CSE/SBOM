import json
import os

LICENSE_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "sample_data",
    "license_rules.json"
)

with open(LICENSE_PATH) as f:
    LICENSE_RULES = json.load(f)


def check_licenses(components):

    output = []

    for component in components:

        license_name = "UNKNOWN"

        if component.get("licenses"):

            license_name = component["licenses"][0]

        rule = next(

            (
                x
                for x in LICENSE_RULES
                if x["license"] == license_name
            ),

            None

        )

        if rule:

            output.append({

                "component": component["name"],
                "license": license_name,
                "risk": rule["risk_level"],
                "compatible": rule["compatible_with_proprietary"],
                "notes": rule["notes"]

            })

        else:

            output.append({

                "component": component["name"],
                "license": license_name,
                "risk": "UNKNOWN",
                "compatible": False,
                "notes": "License not found"

            })

    return output