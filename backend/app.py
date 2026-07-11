from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from services.license_checker import check_licenses
from services.dependency_graph import build_dependency_graph, graph_to_json
from services.vulnerability_service import check_vulnerabilities
from config import Config
from services.parser import parse_sbom

from flask import Flask
from flask_cors import CORS

from routes.upload import upload_bp

latest_sbom = None
app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

UPLOAD_FOLDER = Config.UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.route("/")
def home():
    return jsonify({
        "message": "SBOM Analyzer Backend Running 🚀"
    })


@app.route("/upload", methods=["POST"])
def upload_sbom():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)

    file.save(filepath)

    data = parse_sbom(filepath)

    global latest_sbom
    latest_sbom = data
    graph = build_dependency_graph(data["dependencies"])
    graph_json = graph_to_json(graph)

    return jsonify({
    "component_count": len(data["components"]),
    "dependency_count": len(data["dependencies"]),
    "components": data["components"],
    "dependencies": data["dependencies"],
    "graph": graph_json
})
@app.route("/vulnerabilities", methods=["GET"])
def vulnerabilities():

    global latest_sbom

    if latest_sbom is None:
        return jsonify({
            "error": "Upload an SBOM first."
        }), 400

    results = check_vulnerabilities(
        latest_sbom["components"]
    )

    return jsonify({
        "total_packages": len(results),
        "results": results
    })
@app.route("/licenses", methods=["GET"])
def licenses():

    global latest_sbom

    if latest_sbom is None:
        return jsonify({
            "error": "Upload an SBOM first"
        }), 400

    result = check_licenses(
        latest_sbom["components"]
    )

    return jsonify({
        "total": len(result),
        "licenses": result
    })

if __name__ == "__main__":
    app.run(debug=True)