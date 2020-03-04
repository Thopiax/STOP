from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/create_room")
def create_room():

    return jsonify({
        "blah": "whatever"
    })


app.run(debug=True)

