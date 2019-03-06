import requests
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

def run_yelp_query(query): # A simple function to use requests.post to make the API call. Note the json= section.
    headers = headers = {"Authorization": "Bearer qsFYT-eR_CY_ETu4HINDdE8n2uvabKl4bOdyq-W2nqgZWcFVsiiN66kst8n_gc7PC3CMHHjeMTjCwc53hr7P-QAwOudkvo9SWIq5VARA02_YOgVj79WPgP3i0CKAXHYx",
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
                total
                business {
                name
                rating
                review_count
                location {
                    address1
                    city
                    state
                    country
                }
                }
            }
        }
            ''' % (term, location)
        
    return searchQuery

