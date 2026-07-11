import json

def parse_sbom(file_path):
    """
    Parse CycloneDX JSON SBOM.
    Returns a list of components.
    """

    with open(file_path, "r") as file:
        data = json.load(file)

    components = []

    for component in data.get("components", []):
        components.append({
            "name": component.get("name"),
            "version": component.get("version"),
            "type": component.get("type"),
            "license": component.get("licenses", [])
        })

    return components