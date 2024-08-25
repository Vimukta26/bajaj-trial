from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace these with your actual values
user_id = "john_doe_17091999"
email = "john@xyz.com"
roll_number = "ABCD123"

def find_highest_lowercase(alphabets):
    """
    Finds the highest lowercase alphabet in the list.
    """
    lowercase = [chr(i) for i in range(ord('a'), ord('z') + 1)]
    highest = ""
    for char in alphabets:
        if char.islower() and char in lowercase and char > highest:
            highest = char
    return highest

@app.route('/bfhl', methods=['POST', 'GET'])
def handle_request():
    if request.method == 'POST':
        try:
            data = request.get_json().get("data", [])
            numbers = [str(item) for item in data if item.isdigit()]
            alphabets = [str(item) for item in data if item.isalpha()]
            highest_lowercase = find_highest_lowercase(alphabets)
            response = {
                "is_success": True,
                "user_id": f"{user_id}",
                "email": email,
                "roll_number": roll_number,
                "numbers": numbers,
                "alphabets": alphabets,
                "highest_lowercase_alphabet": [highest_lowercase] if highest_lowercase else []
            }
            return jsonify(response)
        except Exception as e:
            print(f"Error processing request: {e}")
            return jsonify({"is_success": False, "error": "Invalid request data"}), 400

    

if __name__ == '__main__':
    app.run(port=5001, debug=True)  # Change port number here
