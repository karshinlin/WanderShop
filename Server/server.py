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


## Flights handling
@app.route('/flights/getByDate/', methods=["POST"])
def flights_handler():
    
    error = ''
    try:
        if request.method == "POST":
            print("request was a post", file=sys.stderr)
            jsonReq = request.get_json()
            departDate = jsonReq['departDate'] # mm/dd/yyyy
            returnDate = jsonReq['returnDate']
            origin = jsonReq['origin']
            destination = jsonReq['destination']

            # We can allow to specify these through the app in the future 
            numAdults = 1 
            numChilds = 0 
            numInfants = 0 
            classType = "Economy"
            currency = "USD"
            flightsLimit = "30ITINS" # num of flights in response
            tripType = "R" # O for one-way, R for round-trip

            headers = {"apikey": config.AIRHOB_API_KEY, "mode": "sandbox", "Content-Type": "application/json"}

            params = { 
                "TripType": tripType, "NoOfAdults": numAdults, "NoOfChilds": numChilds, "NoOfInfants": numInfants, "ClassType": classType, "OriginDestination": 
                    [ { "Origin": origin, "Destination": destination, "TravelDate": departDate }, 
                    { "Origin": destination, "Destination": origin, "TravelDate": returnDate } ], 
                "Currency": "USD" }

            r = requests.post("https://dev-sandbox-api.airhob.com/sandboxapi/flights/v1.3/search", data = params, headers=headers)

            
            print(r.url)
            

            return str(r.json())


            ##return json.jsonify({'success':1, 'token': token.decode('utf-8'), 'email': email, 'name': name, 'phone': phone})
        
        return json.jsonify({'success':0})


    except Exception as e:
        #flash(e)
        print (e)
        print ("error")
        return json.jsonify({'success':0})





if __name__ == '__main__':
    app.run(debug=True)
