from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from config import Config
from services.parser import parse_sbom

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

    components = parse_sbom(filepath)

    return jsonify({
        "total_components": len(components),
        "components": components
    })


if __name__ == "__main__":
    app.run(debug=True)