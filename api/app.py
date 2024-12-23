from cs50 import SQL
from flask import Flask, request, session, jsonify
from flask_cors import CORS
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash
from collections import Counter
from helpers import login_required

# Create a Flask app instance
app = Flask(__name__)

CORS(app, supports_credentials=True)
# app.secret_key = "12gfkk3"

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
# app.config["SESSION_USE_SIGNER"] = True
app.config['SESSION_COOKIE_SAMESITE'] = "Lax"
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = False
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///app.db")

# placeholder user
# user_id = 1


@app.route("/chart-data/frequency")
@login_required
def dashboard():
    user_id = session["user_id"]
    frequency = db.execute('''
        SELECT 
            strftime('%Y-%m', date) AS month,
            COUNT(*) AS logs_count                 
        FROM notes
        WHERE user_id = ?
        GROUP BY month
        ORDER BY month
    ''', (user_id,))
    return jsonify(frequency)

@app.route("/chart-data/disciplines")
@login_required
def disciplines():
    user_id = session["user_id"]
    disciplines = db.execute('SELECT distinct discipline, COUNT(discipline) as count FROM notes WHERE user_id = ? GROUP BY discipline', user_id)
    return jsonify(disciplines)

@app.route("/chart-data/techniques")
@login_required
def techniques():
    user_id = session["user_id"]
    techniques_data = db.execute('SELECT techniques FROM notes WHERE user_id = ?', user_id)
    techniques = []
    for technique in techniques_data:
        technique_list = technique['techniques'].split(",")
        techniques.extend(technique_list)
    print("Counter: ", Counter(techniques))
    return jsonify(Counter(techniques))

@app.route("/chart-data/summary")
@login_required
def summary():
    user_id = session["user_id"]
    user_name = db.execute('SELECT username FROM users WHERE id = ?', user_id)
    welcome_data = db.execute('SELECT COUNT(*) AS total, AVG(feel_rating) AS average_mood FROM notes WHERE user_id = ?', user_id)
    return jsonify({
        "user_name":  user_name[0]['username'],
        "total_training": welcome_data[0]['total'],
        "average_mood": round(welcome_data[0]['average_mood']),
    })

@app.route("/auth-status", methods=["GET"])
def auth_status():
    if 'user_id' in session:
        return jsonify({'isLoggedIn': True})
    return jsonify({'isLoggedIn': False})

@app.route("/logout")
@login_required
def logout():
    session.clear()
    return jsonify({"message": "User logged out"}), 200

# Adapted from finance
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
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
        return jsonify({"message": "Registration successful"}), 201
    except:
        print("An exception has occurred!")
        return jsonify({"error": "Something went wrong"}), 400
    


@app.route('/notes', methods=["GET", "POST"])
@login_required
def notes():
    user_id = session['user_id']
    notes = db.execute("SELECT * FROM notes WHERE user_id = ?", user_id)
    if not note:
        return jsonify({"error": "Notes not found"}), 404
    if request.method == "POST":
        data = request.get_json()
        discipline = data.get('discipline').lower().strip()
        techniques = data.get('techniques').lower().strip()
        feel_rating = data.get('feelRating')
        insights = data.get('insights').strip()
        db.execute('''INSERT INTO notes (user_id, discipline, techniques, feel_rating, insights, date) 
                  VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)''', user_id, discipline, techniques, feel_rating, insights)
        return jsonify({"message": "Note was added succesfuly"}), 201
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
        return jsonify({"message": "Note was deleted succesfuly"}), 201
    if request.method == "PUT":
        data = request.get_json()
        discipline = data.get('discipline').lower().strip()
        techniques = data.get('techniques').lower().strip()
        feel_rating = data.get('feelRating')
        insights = data.get('insights').strip()
        db.execute("UPDATE notes SET discipline = ?, techniques = ?, feel_rating = ?, insights = ?  WHERE user_id = ? AND id = ?", discipline, techniques, feel_rating, insights, user_id, note_id)
        return jsonify({"message": "Note was edited succesfuly"}), 201
    else:
        return jsonify(note)
    
@app.route("/debug_session", methods=["GET"])
def debug_session():
    return jsonify({"user_id": session.get("user_id")})


# Run the app on localhost with debugging enabled
if __name__ == '__main__':
    app.run(debug=True)

