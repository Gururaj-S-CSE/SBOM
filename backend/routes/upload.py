from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@upload_bp.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Allow only JSON files
    if not file.filename.lower().endswith(".json"):
        return jsonify({"error": "Only JSON files are allowed"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    file.save(filepath)

    return jsonify({
        "message": "Upload successful",
        "filename": filename
    }), 200