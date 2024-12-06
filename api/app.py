from cs50 import SQL
from flask import Flask, request, session, jsonify
from flask_session import Session
from werkzeug.security import check_password_hash, generate_password_hash

from helpers import login_required

# Create a Flask app instance
app = Flask(__name__)

# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Configure CS50 Library to use SQLite database
db = SQL("sqlite:///app.db")

# placeholder user
user_id = 1

@app.route('/notes', methods=["GET", "POST"])
def notes():
    notes = db.execute("SELECT * FROM notes WHERE user_id = ?", 1)
    if not note:
        return jsonify({"error": "Notes not found"}), 404
    if request.method == "POST":
        db.execute('''INSERT INTO notes
            (user_id, discipline, date, techniques, feel_rating, insights) VALUES 
            (?, ?, ?, ?, ?, ?)''', user_id)
        # (1, 'bjj', '2024-12-01', 'armbar, triangle', 2, 'Focus on hip movement for triangle.'
        return "NOICE"
    else:
        return jsonify(notes)

@app.route('/notes/<int:note_id>', methods=["GET", "PUT", "DELETE"])
def note(note_id):
    note = db.execute("SELECT * FROM notes WHERE user_id = ? AND id = ?", user_id, note_id)
    if not note:
        return jsonify({"error": "Note not found"}), 404
    if request.method == "DELETE":
        db.execute("DELETE FROM notes WHERE user_id = ? AND id = ?", user_id, note_id)
        return "deleted"
    else:
        return jsonify(note)
    



# Run the app on localhost with debugging enabled
if __name__ == '__main__':
    app.run(debug=True)
