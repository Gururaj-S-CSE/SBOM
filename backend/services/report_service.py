from services.parser import parse_sbom
from services.license_checker import check_licenses
from services.vulnerability_service import check_vulnerabilities
from services.dependency_graph import build_dependency_graph, graph_to_json

import json
import os

APP_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "sample_data",
    "applications.json"
)

with open(APP_PATH) as f:
    APPLICATIONS = json.load(f)

application = APPLICATIONS[0]

def generate_report(filepath):

    data = parse_sbom(filepath)

    # Extract parsed data
    metadata = data["metadata"]
    components = data["components"]
    dependencies = data["dependencies"]

    # Run analysis
    licenses = check_licenses(components)

    vulnerabilities = check_vulnerabilities(components)

    graph = build_dependency_graph(dependencies)

    return {

        "application": application,

        "metadata": metadata,

        "summary": {

            "total_components": len(components),

            "total_dependencies": len(dependencies),

            "total_vulnerabilities": sum(
                len(v["vulnerabilities"])
                for v in vulnerabilities
            ),

            "high_risk_packages": sum(
                1
                for l in licenses
                if l["risk"] in ["HIGH", "CRITICAL"]
            )

        },

        "components": components,

        "dependencies": dependencies,

        "graph": graph_to_json(graph),

        "licenses": licenses,

        "vulnerabilities": vulnerabilities

    }