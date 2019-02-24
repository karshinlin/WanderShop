from flask import Flask, json, request
import firebase_admin
import requests
from firebase_admin import credentials, auth
import config
cred = credentials.Certificate("firebase-config.json")
app = Flask(__name__)
firebase_app = firebase_admin.initialize_app(cred)

_verify_password_url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword'

@app.route('/')
def hello_world():

    return "HELLO ALL!"

@app.route('/login/', methods=["POST"])
def login_page():

    error = ''
    try:
        if request.method == "POST":
            jsonReq = request.get_json()
            print (jsonReq)
            email = jsonReq['email']
            password = jsonReq['password']
            body = {'email': email, 'password': password}
            params = {'key' : config.FIREBASE_API_KEY}
            
            resp = requests.request('post', _verify_password_url, params=params, json=body)
            if bool(resp.json().get('registered')):
                user = auth.get_user_by_email(email)
                return json.jsonify({'success':1, 'email': user.email, 'name': user.display_name, 'phone': user.phone_number})
            else:
                return json.jsonify({'success':0})

        return json.jsonify({'success':0})


    except Exception as e:
        #flash(e)
        print (e)
        print ("error ")
        return json.jsonify({'success':0})

@app.route('/register/', methods=["POST"])
def register_page():

    error = ''
    try:
        if request.method == "POST":
            jsonReq = request.get_json()
            name = jsonReq['name']
            email = jsonReq['email']
            phone = jsonReq['phone']
            password = jsonReq['password']

            user = auth.create_user(display_name=name, email=email, phone_number=phone, password=password)
            token = auth.create_custom_token(user.uid)

            return json.jsonify({'success':1, 'token': token.decode('utf-8'), 'email': email, 'name': name, 'phone': phone})
        return json.jsonify({'success':0})


    except Exception as e:
        #flash(e)
        print (e)
        print ("error")
        return json.jsonify({'success':0})

if __name__ == '__main__':
    app.run(debug=True)
