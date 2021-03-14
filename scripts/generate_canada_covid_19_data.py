import csv
from urllib.request import urlopen
import codecs
import datetime
import json

CSV_URL = "https://health-infobase.canada.ca/src/data/covidLive/covid19-download.csv"
FILE_PATH = "src/assets/"

def create_canada_covid19_data_per_day():
    response = urlopen(CSV_URL)
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'canada-covid-19-data-per-day.csv','w', newline='')
    writer = csv.writer(f)
    line_count = 0
    desired_row = 0
    for row in csv_reader:
        if line_count == 0:
            writer.writerow(['Date','Number of Confirmed Cases'])
            line_count += 1
            for index,header in enumerate(row):
                if(header == "numtoday"):
                    desired_row = index
        elif( row[1] == 'Canada' ):
            writer.writerow([row[3], row[desired_row]])
            line_count += 1
    f.close()

def create_canada_covid19_data_total():
    response = urlopen(CSV_URL)
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'canada-covid-19-data-total.csv','w', newline='')
    writer = csv.writer(f)
    line_count = 0
    desired_row = 0
    for row in csv_reader:
        if line_count == 0:
            writer.writerow(['Date','Number of Confirmed Cases'])
            line_count += 1
            for index,header in enumerate(row):
                if(header == "numtotal"):
                    desired_row = index
        elif( row[1] == 'Canada' ):
            writer.writerow([row[3], row[desired_row]])
            line_count += 1
    f.close()

def create_canada_covid19_data_by_province():
    response = urlopen(CSV_URL)
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'province-covid-19-data-by-province.csv','w', newline='')
    writer = csv.writer(f)

    yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
    yesterdays_date = yesterday.strftime('%Y-%m-%d')

    line_count = 0
    desired_row = 0
    for row in csv_reader:
        if line_count == 0:
            writer.writerow(['Province/Territory','Number of Confirmed Cases'])
            line_count += 1
            for index,header in enumerate(row):
                if(header == "numtotal"):
                    desired_row = index
        elif( row[3] == yesterdays_date ):
            if( row[1] != "Canada" and row[1] != "Repatriated travellers"):
                writer.writerow([row[1], row[desired_row]])
                line_count += 1
    f.close()

def create_canada_covid19_active_data_by_province():
    response = urlopen(CSV_URL)
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'province-covid-19-active-data-by-province.csv','w', newline='')
    writer = csv.writer(f)

    yesterday = datetime.datetime.now() - datetime.timedelta(days=1)
    yesterdays_date = yesterday.strftime('%Y-%m-%d')
    update_date(yesterdays_date)

    line_count = 0
    desired_row = 0

    for row in csv_reader:
        if line_count == 0:
            writer.writerow(['Province/Territory','Number of Active Cases'])
            line_count += 1
            for index,header in enumerate(row):
                if(header == "numactive"):
                    desired_row = index
        elif( row[3] == yesterdays_date ):
            if( row[1] != "Canada" and row[1] != "Repatriated travellers"):
                writer.writerow([row[1], row[desired_row]])
                line_count += 1
    f.close()

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
    create_canada_covid19_data_per_day()
    create_canada_covid19_data_total()
    create_canada_covid19_data_by_province()
    create_canada_covid19_active_data_by_province()


generate_canada_covid19_data()