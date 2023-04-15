from flask import Flask, request
import requests
import re
from flask_cors import CORS
from dabas import ocr_space_file
import pickle
import numpy as np
import json
app = Flask(__name__)
CORS(app)

categories = ['Shopping', 'Home Improvement', 'Foods', 'Credit Card Payment', 'Entertainment', 'Misc', 'Groceries', 'Paycheck']
models = {}
for cat in categories:
    with open("models/"+cat+"_model.pkl", 'rb') as file:
        models[cat] = pickle.load(file)
print(models.keys())
@app.route('/ocr', methods=['POST'])
def space_file():
    file = request.files['image']
    print('Uploaded file:', file.filename)
    # overlay = False
    # api_key = 'K89580507588957'
    # language = 'eng'
    # payload = {'isOverlayRequired': overlay,
    #            'apikey': api_key,
    #            'language': language}
    # response = requests.post('https://api.ocr.space/parse/image',
    #                          data=payload,
    #                          files={'image': file.read()})
    # money_pattern = r'(?:USD\s*)?\$\d+(?:\.\d{2})?'
    # matches = re.findall(money_pattern, response.content.decode())
    # print(matches)
    matches = ocr_space_file(file.filename)

    return {'matches': matches}

@app.route('/forecast-spending',methods = ['POST'])
def forecast_spending():
    data = request.json["data"]
    category = request.json["category"]
    model = models[category]
    prediction = model.predict(start = len(data),end = len(data)+5,typ = 'levels')
    return json.dumps({"prediction":prediction.tolist()})

if __name__ == '__main__':
    app.run(port=4000)
