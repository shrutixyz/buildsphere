from flask import request, render_template, Flask, jsonify
from flask_cors import CORS, cross_origin
from methods import get_data, gemini_api_response

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/getstreamparams', methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type'])
def getstreamparams():
    data = request.form.to_dict()
    print(data)
    # return ""
    parameters = get_data(data)
    print("params")
    return jsonify({
        "status": 200,
        "parameters": {"volume": parameters}
    })

@app.route('/generateplan', methods=["POST"])
@cross_origin(origin='*',headers=['Content-Type'])
def generateplan():
    data = request.form.to_dict()
    response = gemini_api_response(data)
    return jsonify({
        "status": 200,
        "response": response
    })

if  __name__ == '__main__':
    app.run(debug=True)

