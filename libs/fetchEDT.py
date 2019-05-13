import requests
def fetch(query) :
    param = '7|0|7|https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/|D6B9DA98EB1E5E3397BA6D6581349354|com.adesoft.gwt.directplan.client.rpc.DirectPlanningServiceProxy|method12searchResource|J|java.lang.String/2004016611|[1]{"StringField""NAME""""'+query+'""false""true""true""true""2147483647""false""CONTAINS""false""false""0"|1|2|3|4|2|5|6|WqulbLy|7|'
    url = 'https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/DirectPlanningServiceProxy'
    headers = {
        'Host': 'edt.telecom-bretagne.eu',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://edt.telecom-bretagne.eu/direct/index.jsp',
        'Content-Type': 'text/x-gwt-rpc; charset=utf-8',
        'X-GWT-Permutation': '998F3A96BC1BF26680D814D889153318',
        'X-GWT-Module-Base': 'https://edt.telecom-bretagne.eu/direct/gwtdirectplanning/',
        'Content-Length': str(338 + len(query)),
        'Connection': 'keep-alive',
        'Cookie': 'JSESSIONID=026181C6D95FA320ACF82CB2FE934215; Direct%20Planning%20Tree=%7B%22state%22%3A%7B%22sortField%22%3A%22s%3ANAME%22%2C%20%22sortDir%22%3A%22s%3AASC%22%7D%7D'
    }

    r = requests.post(url, data=param, headers=headers)
    data = r.text
    d = data.split('\"')
    return d[-19].replace('\\', "")

import json
import psycopg2
connection = psycopg2.connect('') #.env uri
cursor = connection.cursor()
# Print PostgreSQL Connection properties
print ( connection.get_dsn_parameters(),"\n")
# Print PostgreSQL version

with open('./students.json', encoding="utf8") as json_file:  
    data = json.load(json_file)
    for student in data:
        name = student['last_name'] + " " + student['first_name']
        id = int(fetch(name))
        if (int(student['id']) % 50 == 0) : print(student['id'])
        cursor.execute("UPDATE students SET edt_id="+str(id)+" WHERE id="+str(student['id']))
        
connection.commit()
