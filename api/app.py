from cs50 import SQL
from flask import Flask, request, session, jsonify
from flask_cors import CORS, cross_origin
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

# Create a Flask app instance
app = Flask(__name__)

CORS(app, supports_credentials=True, origins="http://localhost:3000")
# app.secret_key = "12gfkk3"

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# app.config["SESSION_USE_SIGNER"] = True
app.config['SESSION_COOKIE_SAMESITE'] = "Lax"
app.config['SESSION_COOKIE_DOMAIN'] = '.localhost'
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///app.db")

# placeholder user
# user_id = 1

# Adapted from finance
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print("***** request content login headers:", request.headers) 
    print("***** request content login cookies:", request.cookies) 
    # Forget any user_id
    session.clear()

    if not data.get("username"):
        return jsonify({"error": "Must provide username"}), 403

    # Ensure password was submitted
    elif not data.get("password"):
        return jsonify({"error": "Must provide password"}), 403

    # Query database for username
    rows = db.execute(
            "SELECT * FROM users WHERE username = ?", data.get("username")
    )
    # Ensure username exists and password is correct
    if len(rows) != 1 or not check_password_hash(
rows[0]["password_hash"], data.get("password")
    ):
        return jsonify({"error": "invalid username and/or password"}), 403

    # Remember which user has logged in
    session["user_id"] = rows[0]["id"]
    
    return jsonify({"loggedIn": True, "user": session['user_id']}), 200


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    confirmation = data.get("confirmation")

    # adapted from what was done on finance
    if password != confirmation:
        return jsonify({"error": "Passwords didn't match"}), 403
    if password.strip() == "" or username.strip() == "":
        return jsonify({"error": "No empty strings"}), 403
            # add user and password to table
    try:
        print("Adding new user...")
        db.execute("INSERT INTO users (username,  password_hash) VALUES (?, ?)",
                username, generate_password_hash(password))
        # login the user
        user_id = db.execute(
            "SELECT id FROM users WHERE username = ?", username
        )
        session["user_id"] = user_id[0]["id"]
        print("User added and logged in...")
        return jsonify({"message": "Registration successful"}), 200
    except:
        print("An exception has occurred!")
        return jsonify({"error": "Something went wrong"}), 400
    


@app.route('/notes', methods=["GET", "POST"])
@cross_origin(supports_credentials=True)
def notes():
    print("***** request content headers:", request.headers) 
    print("***** request content cookies:", request.cookies) 
    print("***** Session content:", dict(session)) 
    user_id = session['user_id']
    notes = db.execute("SELECT * FROM notes WHERE user_id = ?", user_id)
    if not note:
        return jsonify({"error": "Notes not found"}), 404
    if request.method == "POST":
        data = request.get_json()
        discipline = data.get('discipline')
        techniques = data.get('techniques')
        feel_rating = data.get('feel_rating')
        insights = data.get('insights')
        print("**********", data)
        db.execute('''INSERT INTO notes (user_id, discipline, techniques, feel_rating, insights, date) 
                  VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)''', user_id, discipline, techniques, feel_rating, insights)
        return "NOICE"
    else:
        return jsonify(notes)

@app.route('/notes/<int:note_id>', methods=["GET", "PUT", "DELETE"])
def note(note_id):
    user_id = session['user_id']
    note = db.execute("SELECT * FROM notes WHERE user_id = ? AND id = ?", user_id, note_id)
    if not note:
        return jsonify({"error": "Note not found"}), 404
    if request.method == "DELETE":
        db.execute("DELETE FROM notes WHERE user_id = ? AND id = ?", user_id, note_id)
        return "deleted"
    else:
        return jsonify(note)
    
@app.route("/debug_session", methods=["GET"])
def debug_session():
    return jsonify({"user_id": session.get("user_id")})


# Run the app on localhost with debugging enabled
if __name__ == '__main__':
    app.run(debug=True)
