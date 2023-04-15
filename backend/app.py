from flask import Flask, request
import requests
import re
from flask_cors import CORS
from dabas import ocr_space_file
import pickle
import numpy as np
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
app = Flask(__name__)
CORS(app)

categories = ['Shopping', 'Home Improvement', 'Foods', 'Credit Card Payment', 'Entertainment', 'Misc', 'Groceries', 'Paycheck']
models = {}
for cat in categories:
    with open("models/"+cat+"_model.pkl", 'rb') as file:
        models[cat] = pickle.load(file)
print(models.keys())

def send_mail(receiver_email='barwaniwalataher6@gmail.com',body='Body of the email'):
# Email account credentials
    sender_email = 'barwaniwalataher6@outlook.com'
    sender_password = '_Taher@2002'
    receiver_email = receiver_email

    # Create message object instance
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = 'Alert You have spend over your spending limit'

    # Email body
    body = body
    message.attach(MIMEText(body, 'plain'))

    # Create SMTP session
    session = smtplib.SMTP('smtp.office365.com', 587)
    session.starttls()
    session.login(sender_email, sender_password)

    # Send email
    text = message.as_string()
    session.sendmail(sender_email, receiver_email, text)
    session.quit()
    print('Mail Sent')


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
