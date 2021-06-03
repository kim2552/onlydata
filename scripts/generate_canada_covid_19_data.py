import csv
from urllib.request import urlopen
import codecs
import json

CSV_VAC_URL = "https://health-infobase.canada.ca/src/data/covidLive/vaccination-administration.csv"
CSV_URL = "https://health-infobase.canada.ca/src/data/covidLive/covid19-download.csv"
FILE_PATH = "src/assets/"

selection_list = [ "Canada", "British Columbia", "Alberta", "Saskatchewan", "Manitoba", "Ontario", "Quebec", "Newfoundland and Labrador", "New Brunswick", "Nova Scotia", "Prince Edward Island", "Yukon", "Northwest Territories", "Nunavut"]

'''
Creates a csv file that contains a table for the selected region and the selected category (header) for a list of dates
selection: A Province or Territory of Canada or Canada
category: available categories are numtoday, numtotal, numconf, numdeath, numactive
'''
def create_selection_covid19_data_per_day(selection="Canada", category="numtoday"):
    response = urlopen(CSV_URL)
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+selection.lower()+'-covid-19-data-per-day.csv','w', newline='')
    writer = csv.writer(f)
    line_count = 0
    desired_row = 0
    
    most_recent_date = "0"    # Gets the most recent date in the data
    
    for row in csv_reader:
        if line_count == 0:
            writer.writerow(['Date','Number of Confirmed Cases'])
            line_count += 1
            for index,header in enumerate(row):
                if(header == category):
                    desired_row = index
        elif( row[1].lower() == selection.lower() ):
            writer.writerow([row[3], row[desired_row]]) # date, catagory value
            if(row[3] > most_recent_date):
                print(row[3], most_recent_date, row[3] > most_recent_date)
                most_recent_date = row[3]
            line_count += 1

    if(most_recent_date != "0"):               # Update the posts file with the most recent dated update
        update_date(most_recent_date)

    f.close()

'''
Updates the posts.json file with the last updated date.
'''
def update_date(new_date):
    json_file = open(FILE_PATH+'posts.json', "r")
    data = json.load(json_file)
    for d in data['posts']:
        if(d['slug'] == 'canada-covid-19-data'):
            d['last_updated'] = new_date
    json_file.close()

    new_json_file = open(FILE_PATH+'posts.json', "w")
    json.dump(data, new_json_file)
    new_json_file.close()

def generate_canada_covid19_data():
    for selection in selection_list:
        create_selection_covid19_data_per_day(selection,"numtoday")

generate_canada_covid19_data()
