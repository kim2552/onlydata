import csv
from urllib.request import urlopen
import codecs
import json

FILE_PATH = "../src/assets/"

selection_list = [ "Canada", "British Columbia", "Alberta", "Saskatchewan", "Manitoba", "Ontario", "Quebec", "Newfoundland and Labrador", "New Brunswick", "Nova Scotia", "Prince Edward Island", "Yukon", "Northwest Territories", "Nunavut"]

def get_csv_data():
    current_url_pt1 = "https://www150.statcan.gc.ca/t1/tbl1/en/dtl!downloadDbLoadingData-nonTraduit.action?pid=1710000901&latestN=5&startDate=&endDate="
    current_url_pt2 = "&csvLocale=en&selectedMembers=%5B%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C14%2C15%5D%5D&checkedLevels="
    return (current_url_pt1+current_url_pt2)

def update_date(new_date):
    json_file = open(FILE_PATH+'posts.json', "r")
    data = json.load(json_file)
    for d in data['posts']:
        if(d['slug'] == 'canada-population-data'):
            d['last_updated'] = new_date
    json_file.close()

    new_json_file = open(FILE_PATH+'posts.json', "w")
    json.dump(data, new_json_file)
    new_json_file.close()

def create_canada_population_table(category="VALUE"):
    """Creates a csv file that contains a table for all regions and the selected category (header) for the most recent date

    :param category: Header name in CSV file, defaults to "VALUE"
    :type category: str, optional
    """    
    response = urlopen(get_csv_data())
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'canada-population-data.csv','w', newline='')
    writer = csv.writer(f)

    line_count = 0
    desired_row = 0
    most_recent_values = {}             # Create a dictionary out of all the regions
    for region in selection_list:
        most_recent_values[region] = 0
    
    most_recent_date = "0"              # Gets the most recent date in the data
    
    for row in csv_reader:
        if line_count == 0:
            writer.writerow(['Region','Population', 'Date'])
            for index,header in enumerate(row):
                if(header == category):
                    desired_row = index
        elif len(row) > 0 and row[1] in selection_list:           # prename
            most_recent_date = row[0]           # report_date
            most_recent_values[row[1]] = [row[desired_row],most_recent_date] # numtotal

        line_count += 1

    for reg in most_recent_values:
        writer.writerow([reg, most_recent_values[reg][0], most_recent_values[reg][1]])  # name, total, date

    if(most_recent_date != "0"):               # Update the posts file with the most recent dated update
        update_date(most_recent_date)

    f.close()

if __name__=='__main__':
    create_canada_population_table()