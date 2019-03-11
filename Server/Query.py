import requests
try: # only import locally
    import private_config
except ImportError:
    pass
import public_config
import urllib.parse
from datetime import date
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
    # if start_date_time:
    #     params["startDateTime"] = str(start_date_time)
    # if end_date_time:
    #     params["endDateTime"] = str(end_date_time)
    
    param_string = urllib.parse.urlencode(params)
    url += "?" + param_string
    request = requests.get(url)
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

def searchQuery(term="burrito", location="NYC"):
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

