import json
from urllib.parse import urlparse, urljoin, parse_qs
import requests
from bs4 import BeautifulSoup
import sqlite3
from sqlite3 import Error


def create_connection(db_file):
  """ create a database connection to the SQLite database
      specified by the db_file
  :param db_file: database file
  :return: Connection object or None
  """
  conn = None
  try:
    conn = sqlite3.connect(db_file)
  except Error as e:
    print(e)

  return conn


def save_record(records):
  database = r"SayItOut2.db"

  conn = create_connection(database)
  with conn:
    cur = conn.cursor()
    for record in records:
        if 'title' in record.keys():
            query = "UPDATE Cards SET cat_id = ? WHERE lower(name) LIKE ?"
            cur.execute(query, (record['catid'], record['title'].replace(' ', '_').replace('...','').lower()+'%'))
            print(f"SAVING CARD {record['title']}")
        else:
            query = "INSERT INTO Categories (name, id, is_parent, children, parent) VALUES (?, ?, ?, ?, ?)"
            cur.execute(query, (str(record['name']), record['catid'], record['isParent'], record['children'], str(record['parent'])))
            print(f"SAVING CATEGORY {record['name']}")
  

def scrap_categorie(uri):
    page = requests.get('http://mypecs.com/' + str(uri))
    soup = BeautifulSoup(page.content, 'html.parser')
    main_content = soup.find('table', {'class': 'listing'})
    cards = main_content.findAll('a')

    parsed_url = urlparse(uri)
    url_params = parse_qs(parsed_url.query)
    catid = int(url_params['catid'][0])

    results = []

    for card in cards:
        record = {}
        if (cards.index(card) % 2) == 0:
            record["title"] = card.get('title')
            record["catid"] = catid
            results.append(record)
        
    save_record(results)


def scrap_home(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    main_content = soup.find('div', {'class': 'content-main'})
    categories = main_content.findAll('a')

    results = []
    uris = []
    parent = ''

    for categorie in categories:
        if len(categorie.text):
            parsed_url = urlparse(urljoin(url, '.') + categorie.get('href'))
            url_params = parse_qs(parsed_url.query)

            record = {}

            name = categorie.text.strip()
            is_parent = True if 'isParent' in url_params.keys() else False
            parent = name.split('(')[0] if is_parent else parent

            record["name"] = name.split('(')[0]
            record["catid"] = int(url_params['catid'][0])
            record["isParent"] = True if is_parent else False
            record["children"] = 0 if ')' not in name else int(name.split('(')[1].split(')')[0])
            record["parent"] = parent.strip()

            if not is_parent:
                uris.append(categorie.get('href'))

            results.append(record)

    for uri in uris:
        scrap_categorie(uri)

    save_record(results)
    search_and_categorize()

    return results


def search_and_categorize():
    database = r"SayItOut2.db"
    conn = create_connection(database)
    cur = conn.cursor()
    cur.execute("SELECT name FROM Cards WHERE cat_id IS NULL")

    rows = cur.fetchall()

    for row in rows:
        name = row[0].lower().replace('_', ' ')
        page = requests.get('http://mypecs.com/Search.aspx?keywords=' + str(name))
        soup = BeautifulSoup(page.content, 'html.parser')
        main_content = soup.find('table', {'class': 'listing'})

        if main_content:
            card = main_content.findAll('a')[1]
            subpage = requests.get('http://mypecs.com/' + str(card.get('href')))
            subsoup = BeautifulSoup(subpage.content, 'html.parser')
            sub_main_content = subsoup.find('table', {'class': 'product-detail'})

            if sub_main_content:
                links = sub_main_content.findAll('a')
                for link in links:
                    parsed_link_url = urlparse(link.get('href'))
                    link_url_params = parse_qs(parsed_link_url.query)
                    link_catid = int(link_url_params['catid'][0]) if 'catid' in link_url_params.keys() else False

                    if link_catid:
                        query = "UPDATE Cards SET cat_id = ? WHERE lower(name) LIKE ?"
                        cur.execute(query, (link_catid, name.replace(' ', '_').lower()+'%'))
                        conn.commit()
                        print(f"SAVING CARD {query, link_catid, name.replace(' ', '_').lower()+'%'}")


print(json.dumps(scrap_home("http://mypecs.com/categories.aspx"), indent=4))