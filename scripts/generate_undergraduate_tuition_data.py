import csv
from urllib.request import urlopen
import codecs
import datetime
import json
FILE_PATH = "src/assets/"

def get_previous_year_date():
    today = datetime.date.today()
    lastyear = today - datetime.timedelta(days=365)
    update_date(today.strftime("%Y-01-01")) # Updated current year
    return (lastyear.strftime("%Y0101"))    # URL search requires previous year

def get_canada_alltime_url(desired_date):
    url_part_1 = "https://www150.statcan.gc.ca/t1/tbl1/en/dtl!downloadDbLoadingData-nonTraduit.action?pid=3710000301&latestN=0&startDate=20060101&endDate="
    url_part_2 = "&csvLocale=en&selectedMembers=%5B%5B1%5D%2C%5B1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%5D%5D"
    return (url_part_1+desired_date+url_part_2)

def create_tuition_fee_all_current():
    current_year = datetime.date.today().year
    response = urlopen(get_canada_alltime_url(get_previous_year_date()))
    csv_reader = csv.reader(codecs.iterdecode(response, 'utf-8'), delimiter=',')
    f = open(FILE_PATH+'canada-tuition-fee-all-data.csv','w', newline='')
    writer = csv.writer(f)
    line_count = 0
    value_column = 0
    field_column = 0
    for row in csv_reader:
        if( len(row) > 0):
            if line_count == 0:
                writer.writerow(['Field of Study','Tuition Amount (CAD)'])
                line_count += 1
                for index,header in enumerate(row):
                    if(header == "VALUE"):
                        value_column = index
                    if(header == "Field of study"):
                        field_column = index
            if((row[0].find(str(current_year)) != -1) and (row[field_column] != 'Total, field of study')):
                writer.writerow([row[field_column], row[value_column]])
    f.close()

def update_date(new_date):
    json_file = open(FILE_PATH+'posts.json', "r")
    data = json.load(json_file)
    for d in data['posts']:
        if(d['slug'] == 'canada-undergraduate-tuition-data'):
            d['last_updated'] = new_date
    json_file.close()

    new_json_file = open(FILE_PATH+'posts.json', "w")
    json.dump(data, new_json_file)
    new_json_file.close()

if __name__ == '__main__':
    create_tuition_fee_all_current()