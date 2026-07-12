from services.parser import parse_sbom
from services.license_checker import check_licenses
from services.vulnerability_service import check_vulnerabilities
from services.dependency_graph import (
    build_dependency_graph,
    graph_to_json,
    load_transitive_dependencies,
    find_attack_paths
)
from services.risk_score import calculate_risk_score
from services.maintenance_checker import check_maintenance
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

def generate_report(filepath, application=None):
    if application is None:
        application = APPLICATIONS[0]

    data = parse_sbom(filepath)

    # Extract parsed data
    metadata = data["metadata"]
    components = data["components"]
    dependencies = data["dependencies"]

    # Run analysis
    licenses = check_licenses(components)

    vulnerabilities = check_vulnerabilities(components)

    maintenance = check_maintenance(components)

    risk = calculate_risk_score(
    vulnerabilities,
    licenses,
    maintenance,
    application
)

    graph = build_dependency_graph(dependencies)

    graph = load_transitive_dependencies(graph)

    attack_paths = find_attack_paths(
    graph,
    vulnerabilities
)

    return {

        "application": application,

        "metadata": metadata,

        "summary": {

    "risk_score": risk["risk_score"],

    "risk_level": risk["risk_level"],

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

        "maintenance": maintenance,

        "graph": graph_to_json(graph),

        "attack_paths": attack_paths,

        "licenses": licenses,

        "vulnerabilities": vulnerabilities

    }