import requests
try: # only import locally
    import private_config
except ImportError:
    pass
import public_config
import urllib.parse
from datetime import date
import json 

# class YelpQuery(graphene.ObjectType):
#     search = graphene.Field(Search, location=graphene.String(default="NYC"), term=graphene.String(default="pizza"))

# class Search(graphene.ObjectType):
#     total = graphene.Int()
#     business = graphene.List(Business)

# class Business(graphene.ObjectType):
#     name = graphene.String()
#     url = graphene.String()
#     display_phone = graphene.String()
#     rating = graphene.Float()
#     price = graphene.String()
#     location = graphene.Field(Location)

# class Location(graphene.ObjectType):
#     address1 = graphene.String()
#     city = graphene.String()
#     state = graphene.String()
#     postal_code = graphene.String()
#     formatted_address = graphene.String()

def run_ticketmaster_query(postal_code=None, city=None, state_code=None, start_date_time=date.today(), end_date_time=None):
    url = "https://app.ticketmaster.com/discovery/v2/events.json"
    params = dict()
    params["apikey"] = public_config.TICKETMASTER_API_KEY
    if postal_code:
        params["postalCode"] = postal_code
    if city:
        params["city"] = city
    if state_code:
        params["stateCode"] = state_code
    if start_date_time:
        params["startDateTime"] = str(start_date_time)
    if end_date_time:
        params["endDateTime"] = str(end_date_time)
    
    param_string = urllib.parse.urlencode(params)
    url += "?" + param_string
    request = requests.get(url)
    print(url)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, url))

def run_yelp_query(query): # A simple function to use requests.post to make the API call. Note the json= section.
    headers = {"Authorization": public_config.YELP_API_KEY,
    "Content-Type": "application/graphql",
    }
    request = requests.post('https://api.yelp.com/v3/graphql', data=query, headers=headers)
    if request.status_code == 200:
        return request.json()
    else:
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, query))

def searchQuery(term="food", location="NYC"):
    searchQuery = '''
        {
            search(term: "%s",
                    location: "%s") {
                business {
                    id
                    name
                    rating
                    price
                    display_phone
                    url
                    photos
                    location {
                        address1
                        city
                        state
                        postal_code
                        country
                    }
                }
            }
        }
            ''' % (term, location)
        
    return searchQuery

def runFlightsQuery(origin, destination, departDate, endDate):    
    url = "https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?"
    params = dict()
    params["origin1"] = origin
    params["destination1"] = destination
    params["departdate1"] = departDate
    params["origin2"] = destination
    params["destination2"] = origin
    params["departdate2"] = endDate
    params["cabin"] = 'e'
    params["currency"] = "USD"
    params["adults"] = 1
    params["bags"] = 0
    param_string = urllib.parse.urlencode(params)
    url += param_string
    headers = {"X-RapidAPI-Key": public_config.X_RAPIDAPI_KEY,
    "Content-Type": "application/json",
    }
    request = requests.get(url, headers=headers)
    if request.status_code == 200:
        return request.json()
    else: 
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, url))

def postProcessFlights(jsonResponse):
    airports = jsonResponse["airportDetails"]
    airlines = jsonResponse["airlines"]
    airlineLogos = jsonResponse["airlineLogos"]
    base = jsonResponse["baseUrl"]
    for airline in airlineLogos:
        airlineLogos[airline] = base + airlineLogos[airline]
    departDate = jsonResponse["departDate"]
    returnDate = jsonResponse["returnDate"]
    segments = jsonResponse["segset"]
    tripOutput = []
    for trip in jsonResponse["tripset"][:20]:
        segment1List = []
        for segment in trip["legs"][0]["segments"]:
            currSeg = segments[segment]
            newSeg = {
                "airlineCode": currSeg["airlineCode"],
                "airlinePic": airlineLogos[currSeg["airlineCode"]],
                "airlineName": airlines[currSeg["airlineCode"]],
                "flightNumber": currSeg["flightNumber"],
                "originAirportCode": currSeg["originCode"],
                "originAirportName": airports[currSeg["originCode"]],
                "destinationAirportCode": currSeg["destinationCode"],
                "destinationAirportName": airports[currSeg["destinationCode"]],
                "departTime": currSeg["leaveTimeDisplay"],
                "departTimeUnix": currSeg["leaveTime"],
                "arriveTime": currSeg["arriveTimeDisplay"],
                "arriveTimeUnix": currSeg["arriveTime"],
                "arriveDayDiff": currSeg["arrivalDayDiff"]
            }
            segment1List.append(newSeg)
        segment2List = []
        for segment in trip["legs"][1]["segments"]:
            currSeg = segments[segment]
            newSeg = {
                "airlineCode": currSeg["airlineCode"],
                "airlinePic": airlineLogos[currSeg["airlineCode"]],
                "airlineName": airlines[currSeg["airlineCode"]],
                "flightNumber": currSeg["flightNumber"],
                "originAirportCode": currSeg["originCode"],
                "originAirportName": airports[currSeg["originCode"]],
                "destinationAirportCode": currSeg["destinationCode"],
                "destinationAirportName": airports[currSeg["destinationCode"]],
                "departTime": currSeg["leaveTimeDisplay"],
                "departTimeUnix": currSeg["leaveTime"],
                "arriveTime": currSeg["arriveTimeDisplay"],
                "arriveTimeUnix": currSeg["arriveTime"],
                "arriveDayDiff": currSeg["arrivalDayDiff"]
            }
            segment2List.append(newSeg)
        tripId = trip["tripid"]
        thePrice = "Not Available" if trip["displayLowTotal"] == "$-1" else trip["displayLowTotal"]
        tripOutput.append({
            "tripId": tripId,
            "provider": trip["cheapestProviderName"],
            "price": thePrice,
            "departDate": departDate,
            "returnDate": returnDate,
            "segmentsTo": segment1List,
            "segmentsBack": segment2List,
            "bookingUrl": base + trip["shareURL"]
        })
        
    return tripOutput


def runLocationQuery(destination, desiredParams):
    url = "https://apidojo-kayak-v1.p.rapidapi.com/locations/search?"
    params = dict()
    params["where"] = destination
    param_string = urllib.parse.urlencode(params)
    url += param_string
    headers = {"X-RapidAPI-Key": public_config.X_RAPIDAPI_KEY,
    "Content-Type": "application/json",
    }
    request = requests.get(url, headers=headers)
    output = []
    if request.status_code == 200:
        if len(request.json()) > 0:
            for i in range(len(desiredParams)):
                output.append(request.json()[0][desiredParams[i]])
        else:
            raise Exception("Query returned no values. {}".format(url))
    else: 
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, url))
    return output

def runHotelsQuery(cityId, rooms, checkin, checkout, adults):
    url = "https://apidojo-kayak-v1.p.rapidapi.com/hotels/create-session?"
    params = dict()
    params["rooms"] = rooms
    params["citycode"] = cityId
    params["checkin"] = checkin
    params["checkout"] = checkout
    params["adults"] = adults
    param_string = urllib.parse.urlencode(params)
    url += param_string
    headers = {"X-RapidAPI-Key": public_config.X_RAPIDAPI_KEY,
    "Content-Type": "application/json",
    }
    print(url)
    request = requests.get(url, headers=headers)
    if request.status_code == 200:
        return request.json()
    else: 
        raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, url))

def postProcessHotels(jsonResponse):
    checkinDate = jsonResponse["checkinDate"]
    baseUrl = jsonResponse["baseUrl"]
    checkoutDate = jsonResponse["checkoutDate"]
    hotelsOut = []
    for hotel in jsonResponse["hotelset"][:30]:
        hotelsOut.append({
            "checkin": checkinDate,
            "checkout": checkoutDate,
            "bookingId": hotel["id"],
            "hotelPic": baseUrl + hotel["thumburl"],
            "hotelName": hotel["name"],
            "address": hotel["displayaddress"],
            "price": hotel["price"],
            "stars": hotel["stars"],
            "phone": hotel["phone"],
            "bookingUrl": baseUrl + hotel["cheapestProvider"]["url"],
            "bookingLogo": hotel["cheapestProvider"]["logoUrl"],
            "roomsRemaining": hotel["cheapestProvider"]["roomsRemaining"]
        })
    return hotelsOut

#  url = "https://app.ticketmaster.com/discovery/v2/events.json"
#     params = dict()
#     params["apikey"] = public_config.TICKETMASTER_API_KEY
#     if postal_code:
#         params["postalCode"] = postal_code
#     if city:
#         params["city"] = city
#     if state_code:
#         params["stateCode"] = state_code
#     # if start_date_time:
#     #     params["startDateTime"] = str(start_date_time)
#     # if end_date_time:
#     #     params["endDateTime"] = str(end_date_time)
    
#     param_string = urllib.parse.urlencode(params)
#     url += "?" + param_string
#     request = requests.get(url)
#     if request.status_code == 200:
#         return request.json()
#     else:
#         raise Exception("Query failed to run by returning code of {}. {}".format(request.status_code, url))

