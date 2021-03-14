import csv
from urllib.request import urlopen
import codecs
import datetime
import json
#Number of persons of working age, 25 years and over. Estimates in thousands, rounded to the nearest hundred.
FILE_PATH = "src/assets/"

def get_previous_month_date():
    today = datetime.date.today()
    first = today.replace(day=1)
    lastMonth = first - datetime.timedelta(days=1)
    update_date(lastMonth.strftime("%Y-%m-01"))
    return (lastMonth.strftime("%Y%m01"))

def get_current_url(desired_date):
    current_url_pt1 = "https://www150.statcan.gc.ca/t1/tbl1/en/dtl!downloadDbLoadingData.action?pid=1410028703&latestN=0&startDate="
    current_url_pt2 = "&endDate="
    current_url_pt3 = "&csvLocale=en&selectedMembers=%5B%5B%5D%2C%5B1%2C7%2C9%5D%2C%5B%5D%2C%5B5%5D%2C%5B1%5D%2C%5B1%5D%5D&checkedLevels=0D1%2C0D2%2C1D2%2C1D3%2C1D4%2C2D1%2C2D2"
    return (current_url_pt1+desired_date+current_url_pt2+desired_date+current_url_pt3)

def get_canada_alltime_url(desired_date):
    current_url_pt1 = "https://www150.statcan.gc.ca/t1/tbl1/en/dtl!downloadDbLoadingData-nonTraduit.action?pid=1410028703&latestN=0&startDate=20050101&endDate="
    current_url_pt2 = "&csvLocale=en&selectedMembers=%5B%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%5D%2C%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%5D%2C%5B1%5D%2C%5B5%5D%2C%5B1%5D%2C%5B1%5D%5D"
    return (current_url_pt1+desired_date+current_url_pt2)

def create_canada_employment_timeline():
    response = urlopen(get_canada_alltime_url(get_previous_month_date()))
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'canada-employment-timeline-data.csv','w', newline='')
    writer = csv.writer(f)
    line_count = 0
    desired_column = 0
    for row in csv_reader:
        if( len(row) > 0):
            if line_count == 0:
                writer.writerow(['Date','Employment rate (%)'])
                line_count += 1
                for index,header in enumerate(row):
                    if(header == "VALUE"):
                        desired_column = index
            if((row[1] == 'Canada') and (row[3] == 'Employment rate')):
                writer.writerow([row[0], row[desired_column]])
    f.close()

def create_canada_unemployment_timeline():
    response = urlopen(get_canada_alltime_url(get_previous_month_date()))
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'canada-unemployment-timeline-data.csv','w', newline='')
    writer = csv.writer(f)
    line_count = 0
    desired_column = 0
    for row in csv_reader:
        if( len(row) > 0):
            if line_count == 0:
                writer.writerow(['Date','Unemployment rate (%)'])
                line_count += 1
                for index,header in enumerate(row):
                    if(header == "VALUE"):
                        desired_column = index
            if((row[1] == 'Canada') and (row[3] == 'Unemployment rate')):
                writer.writerow([row[0], row[desired_column]])
    f.close()

def update_date(new_date):
    json_file = open(FILE_PATH+'posts.json', "r")
    data = json.load(json_file)
    for d in data['posts']:
        if(d['slug'] == 'canada-employment-data'):
            d['last_updated'] = new_date
    json_file.close()

    new_json_file = open(FILE_PATH+'posts.json', "w")
    json.dump(data, new_json_file)
    new_json_file.close()

def generate_employment_data():
    create_canada_employment_timeline()
    create_canada_unemployment_timeline()


generate_employment_data()