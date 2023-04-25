from flask import Flask, request, jsonify
import requests
import re
from flask_cors import CORS
from dabas import ocr_space_file
import pickle
import numpy as np
import pandas as pd
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import openai

app = Flask(__name__)
CORS(app)

total = 3500

categories = ['Shopping', 'Home Improvement', 'Foods', 'Credit Card Payment', 'Entertainment', 'Misc', 'Groceries', 'Paycheck']
models = {}
for cat in categories:
    with open("models/"+cat+"_model.pkl", 'rb') as file:
        models[cat] = pickle.load(file)
print(models.keys())

@app.route('/send_mail', methods=['POST'])
def send_mail(receiver_email='chinmaysonawane57@gmail.com',name = "Kshitij",category = "Shopping"):
    category = request.json["category"]
# Email account credentials
    body = "\nDear "+name+",\n\nYour expenditure in "+category+" has exceeded the budget limit set for this category. We urge you to take immediate action to address this situation and bring your spending in line with the budget limit. Failure to do so may have a negative impact on your overall financial position and hinder your ability to achieve your financial goals.\n\nAs a budget monitoring company, we understand the importance of financial prudence and effective resource management. We offer budget monitoring and management solutions that can assist you in managing your finances effectively. Please contact us if you require any assistance.\n\nBest regards,\n\nTaher Barwaniwala\n\nTerraFinances"
    sender_email = ''
    sender_password = ''
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

    return json.dumps({"success":"200"})


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

@app.route('/forecast-spending', methods = ['POST'])
def forecast_spending():
    df = pd.read_csv('ccpay.csv')
    data = df.head(10)

    df2 = pd.read_csv('homeimp.csv')
    data2 = df2.head(10)

    # category = request.json["category"]
    model = models['Credit Card Payment']
    model2 = models['Home Improvement']
    prediction1 = model.predict(start = len(data),end = len(data)+5,typ = 'levels')
    prediction2 = model2.predict(start = len(data2),end = len(data2)+5,typ = 'levels')
    print(prediction1)
    print(prediction2)
    return ({{"name":"Credit Card Payment", "data":prediction1.tolist()}, {"name": "Home Improvement", "data":prediction2.tolist()}})

openai.api_key = "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"
model = "text-davinci-003"

@app.route('/product', methods=['POST'])
def get_product_info():
    # Get product_name from the JSON payload
    product_name = request.json.get('product_name')

    # Check if product_name is provided 
    if not product_name:
        return jsonify({'error': 'Product name not provided.'})

    # Generate instructions
    instructions = openai.Completion.create(
        model=model,
        prompt=f"Is {product_name} renewable or sustainable? Answer in only yes or no.",
        max_tokens=200,
    )

    # Get generated text
    generated_text = instructions.choices[0].text.strip()

    # Check if the answer is "No"
    if "No" in generated_text:
        # Generate alternative
        alternative = openai.Completion.create(
            model=model,
            prompt=f"Suggest renewable or sustainable alternatives to {product_name} in the year 2050",
            max_tokens=200,
        )
        # Get alternative text
        alt_text = alternative.choices[0].text.strip()

        # Return response as JSON
        return { "key" : '0'}
    
    # Return response as JSON
    return {"key" : '1'}


@app.route("/send_point_mail",methods = ["POST"])
def send_point_mail(receiver_email='barwaniwalataher6@gmail.com',name = "Kshitij"):
    product = request.json["product"]
    type = request.json["type"]
    # product = "Oxygen"
    # type = "loss"
# Email account credentials
    body = expense_vinci(type=type,product = product)
    sender_email = 'barwaniwalataher6@outlook.com'
    sender_password = '_Taher@2002'
    receiver_email = receiver_email

    # Create message object instance
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = 'You Got Some sustainable reward'

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

    return json.dumps({"success":"200"})




def expense_vinci(type="earn",product = "Oxygen"):
    instructions = openai.Completion.create(
        model=model,
        prompt=f"Write a Mail body stating you got {type} points and suggest reneawable and sustainable alternative of {product} to them.",
        max_tokens=200,
    )
    print(instructions)
    return instructions.choices[0].text.strip()


@app.route('/create_budget', methods=['POST'])
def create_budget():
    data = request.json["income"]
    prompt = f"I have {data} dollars, help me create a budget for this month for my education, medical, investment, groceries, misc and bills for a month"
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        max_tokens=200,
    )
    generated_text = response.choices[0].text.strip()

    print(generated_text)
    return {'generated_text': generated_text}

if __name__ == '__main__':
    # send_point_mail()
    app.run(port=4000)
