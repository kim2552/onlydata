import csv
from urllib.request import urlopen
import codecs
import json

CSV_POPULATION_URL = "https://www150.statcan.gc.ca/t1/tbl1/en/dtl!downloadDbLoadingData-nonTraduit.action?pid=1710000901&latestN=1&startDate=&endDate=&csvLocale=en&selectedMembers=%5B%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C14%2C15%5D%5D"
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
                most_recent_date = row[3]
            line_count += 1

    if(most_recent_date != "0"):               # Update the posts file with the most recent dated update
        update_date(most_recent_date)

    f.close()

'''
Creates a csv file that contains a table for all regions and the selected category (header) for the most recent date
category: available categories are numtoday, numtotal, numconf, numdeath, numactive
'''
def create_covid19_vaccination_table(category="numtotal_all_administered"):
    response = urlopen(CSV_VAC_URL)
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'canada-covid-19-vaccination-totals.csv','w', newline='')
    writer = csv.writer(f)
    line_count = 0
    desired_row = 0
    most_recent_values = {}             # Create a dictionary out of all the regions
    for region in selection_list:
        most_recent_values[region] = 0
    
    most_recent_date = "0"              # Gets the most recent date in the data
    for row in csv_reader:
        if line_count == 0:
            writer.writerow(['Region','Total Number of Covid-19 Vaccine Doses Administered', 'Date', 'Total Population'])
            for index,header in enumerate(row):
                if(header == category):
                    desired_row = index
        elif( row[1] in selection_list ):           # prename
            most_recent_date = row[2]           # report_date
            most_recent_values[row[1]] = [row[desired_row],most_recent_date] # numtotal

        line_count += 1
    for val in most_recent_values:
        writer.writerow([val, most_recent_values[val][0], most_recent_values[val][1]])  # name, total, date

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
    create_covid19_vaccination_table()
    for selection in selection_list:
        create_selection_covid19_data_per_day(selection,"numtoday")

if __name__ == '__main__':
    generate_canada_covid19_data()
    