from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from services.license_checker import check_licenses
from services.dependency_graph import build_dependency_graph, graph_to_json
from services.vulnerability_service import check_vulnerabilities
from config import Config
from services.parser import parse_sbom
from services.report_service import generate_report
from services.correlation_service import initialize_default_sboms, get_cross_system_correlations

latest_sbom = None
app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

UPLOAD_FOLDER = Config.UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load applications configuration
APP_PATH = os.path.join(
    os.path.dirname(__file__),
    "sample_data",
    "applications.json"
)
with open(APP_PATH) as f:
    APPLICATIONS = json.load(f)

# Initialize default SBOMs for the apps
initialize_default_sboms(UPLOAD_FOLDER)

@app.route("/analyze", methods=["POST"])
def analyze():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    app_id = request.form.get("app_id", "APP-001")

    # Find the application object
    selected_app = None
    for app_item in APPLICATIONS:
        if app_item["app_id"] == app_id:
            selected_app = app_item
            break

    if selected_app is None:
        selected_app = APPLICATIONS[0]

    # Save specifically as {app_id}.json in the uploads directory
    filepath = os.path.join(
        UPLOAD_FOLDER,
        f"{selected_app['app_id']}.json"
    )

    file.save(filepath)

    global latest_sbom
    latest_sbom = parse_sbom(filepath)

    report = generate_report(filepath, application=selected_app)

    return jsonify(report)

@app.route("/")
def home():
    return jsonify({
        "message": "SBOM Analyzer Backend Running 🚀"
    })

@app.route("/applications", methods=["GET"])
def get_applications():
    return jsonify(APPLICATIONS)

@app.route("/correlations", methods=["GET"])
def get_correlations():
    correlations = get_cross_system_correlations(UPLOAD_FOLDER)
    return jsonify(correlations)


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
    app.run(debug=True, port=5001)