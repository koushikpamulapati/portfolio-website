from flask import Flask, render_template, request, jsonify
import mysql.connector
import re
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

db = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/contact", methods=["POST"])
def contact():

    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    message = data.get("message")

    if not name or not email or not message:
        return jsonify({
            "message": "All fields are required."
        }), 400

    if not re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email):
        return jsonify({
            "message": "Please enter a valid email address."
        }), 400

    cursor = db.cursor()

    query = """
        INSERT INTO contact_messages (name, email, message)
        VALUES (%s, %s, %s)
    """

    cursor.execute(query, (name, email, message))

    db.commit()

    cursor.close()

    return jsonify({
        "message": "Message saved successfully!"
    })


if __name__ == "__main__":
    app.run(debug=True)