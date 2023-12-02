import time
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, Flask!'

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/get-dummy-digest-sequences')
def get_dummy_digest_sequences():
    digest_sequences = [
        {"hello": "world"},
        {"hello": "world"},
    ]
    return jsonify(digest_sequences)

# if __name__ == '__main__':
#     app.run(debug=True)