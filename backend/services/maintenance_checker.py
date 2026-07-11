import csv
import os
from datetime import datetime

CSV_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "sample_data",
    "sbom_dependencies.csv"
)


def check_maintenance(components):

    results = []

    current_year = datetime.now().year

    with open(CSV_PATH, newline="") as csvfile:

        reader = csv.DictReader(csvfile)

        csv_data = list(reader)

    for component in components:

        status = {
            "component": component["name"],
            "last_updated": "Unknown",
            "maintenance": "UNKNOWN"
        }

        for row in csv_data:

            if row["library"].lower() == component["name"].lower():

                last_updated = row["last_updated"]

                status["last_updated"] = last_updated

                year = int(last_updated.split("-")[0])

                if current_year - year >= 2:
                    status["maintenance"] = "UNMAINTAINED"
                else:
                    status["maintenance"] = "ACTIVE"

                break

        results.append(status)

    return results