import json


def parse_sbom(file_path):
    with open(file_path, "r") as file:
        sbom = json.load(file)

    components = []

    for component in sbom.get("components", []):

        licenses = []

        for item in component.get("licenses", []):
            if "license" in item:
                licenses.append(
                    item["license"].get("id", "Unknown")
                )

        components.append({
            "name": component.get("name"),
            "version": component.get("version"),
            "type": component.get("type"),
            "licenses": licenses
        })

    dependencies = []

    for dependency in sbom.get("dependencies", []):

        dependencies.append({
            "component": dependency.get("ref"),
            "depends_on": dependency.get("dependsOn", [])
        })

    return {
        "metadata": {
            "bomFormat": sbom.get("bomFormat"),
            "specVersion": sbom.get("specVersion"),
            "serialNumber": sbom.get("serialNumber"),
            "version": sbom.get("version")
        },
        "components": components,
        "dependencies": dependencies
    }