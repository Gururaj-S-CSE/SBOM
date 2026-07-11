from services.parser import parse_sbom
from services.license_checker import check_licenses
from services.vulnerability_service import check_vulnerabilities
from services.dependency_graph import build_dependency_graph, graph_to_json


def generate_report(filepath):

    data = parse_sbom(filepath)

    licenses = check_licenses(
        data["components"]
    )

    vulnerabilities = check_vulnerabilities(
        data["components"]
    )

    graph = build_dependency_graph(
        data["dependencies"]
    )

    return {
    "metadata": data["metadata"],

    "summary": {
        "total_components": len(data["components"]),
        "total_dependencies": len(data["dependencies"]),
        "total_vulnerabilities": sum(
            len(v["vulnerabilities"])
            for v in vulnerabilities
        ),
        "high_risk_packages": sum(
            1
            for l in licenses
            if l["risk"] == "High"
        )
    },

    "components": data["components"],
    "dependencies": data["dependencies"],
    "licenses": licenses,
    "vulnerabilities": vulnerabilities,
    "graph": graph_to_json(graph)
}