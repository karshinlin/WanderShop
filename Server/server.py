from flask import Flask, json, request
from flaskext.mysql import MySQL
import firebase_admin
import requests
from firebase_admin import credentials, auth
import config
import sys
cred = credentials.Certificate("firebase-config.json")
app = Flask(__name__)
firebase_app = firebase_admin.initialize_app(cred)


mysql = MySQL()
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'teamunit'
app.config['MYSQL_DATABASE_DB'] = 'wander_shop'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)

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
    ## Retrieve data from the request
    jsonReq = request.get_json()
    departDate = jsonReq['departDate'] # mm/dd/yyyy
    returnDate = jsonReq['returnDate']
    origin = jsonReq['origin']
    destination = jsonReq['destination']
    
    # Query the db with the flight data request
    conn = mysql.connect()	
    cursor = conn.cursor()
    baseQuery = "SELECT DISTINCT * from Flights WHERE depart_date=%(fDate)s AND origin=%(fOrigin)s AND destination=%(fDestination)s"
    params = {'fDate': departDate, 'fOrigin': origin, 'fDestination': destination}
    cursor.execute(baseQuery, params)
    print("Data queried from the database.")
    flights = []
    for row in cursor:
        print(row)
        print(str(row[4]))
        flight = {  'flightId' : row[0],
	                'origin' : row[1],
	                'destination' : row[2],
                    'departDate' : str(row[3]),
                    'departTime' : str(row[4]),
                    'airline' : row[5],
                    'flightsNumber': row[6],
                    'cost' : row[7]}
        flights.append(flight)
    return json.jsonify({'flights': flights})

    
    

    ## CODE BELOW IS FOR API IMPLEMENTATION
    """ 
    
    # http://127.0.0.1:5000/flights/getByDate/?departDate=04/15/2019&returnDate=04/21/2019&origin=LHR&destination=ATL

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
        return json.jsonify({'success':0}) """



## Flights handling
@app.route('/hotels/getByCity/', methods=["POST"])
def hotels_handler():
    ## Retrieve data from the request
    jsonReq = request.get_json()
    city = jsonReq['city'] # mm/dd/yyyy
    
    
    # Query the db with the flight data request
    conn = mysql.connect()	
    cursor = conn.cursor()
    baseQuery = "SELECT DISTINCT * from Hotels WHERE city=%(hCity)s"
    params = {'hCity': city}
    cursor.execute(baseQuery, params)
    print("Data queried from the database.")
    hotels = []
    for row in cursor:
        print(row)
        print(str(row[4]))
        hotel = {  'hotelId' : row[0],
	                'hotelName' : row[1],
	                'address' : row[3],
                    'phoneNumber' : row[4],
                    'cost' : row[5],
                    'website' : row[6],
                    'rating': row[7]}
        hotels.append(hotel)
    return json.jsonify({'hotels': hotels})

## Flights handling
@app.route('/restaurants/getByCity/', methods=["POST"])
def restaurants_handler():
    ## Retrieve data from the request
    jsonReq = request.get_json()
    city = jsonReq['city'] # mm/dd/yyyy
    
    
    # Query the db with the flight data request
    conn = mysql.connect()	
    cursor = conn.cursor()
    baseQuery = "SELECT DISTINCT * from Restaurants WHERE city=%(rCity)s"
    params = {'rCity': city}
    cursor.execute(baseQuery, params)
    print("Data queried from the database.")
    restaurants = []
    for row in cursor:
        print(row) # We should probably add a cost field $ $$ $$$
        restaurant = {  'restaurantId' : row[0],
	                'restaurantName' : row[1],
	                'address' : row[3],
                    'phone' : row[4],
                    'website' : row[5],
                    'type': row[6],
                    'rating': row[7]}
        restaurants.append(restaurant)
    return json.jsonify({'restaurants': restaurants})



if __name__ == '__main__':
    app.run(debug=True)
