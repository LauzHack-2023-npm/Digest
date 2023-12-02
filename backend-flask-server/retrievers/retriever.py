import xml.etree.ElementTree as ET
from abc import abstractmethod
from datetime import date
import datetime as DT
import requests


# TODO: 
# - fix customFrequency
# - fix customNarrationStyle

class Retriever:
    def __init__(ABC):
        pass
    
    @abstractmethod
    def fetch_data(self, *args, **kwargs):
        """
        Abstract method to be implemented by subclasses.
        """
        raise NotImplementedError
    
class ArxivRetriever(Retriever):
    def fetch_data(self, query, max_results=10):
        base_url = 'http://export.arxiv.org/api/query?'
        
        # Construct a request to list records (e.g., recent submissions)
        params = {
            'search_query': query,
            'start': 0,
            'max_results': max_results,
        }
        
        response = requests.get(base_url, params=params)

        if response.status_code == 200:
            root = ET.fromstring(response.text)
            data = []
            for record in root.findall('.//{http://www.w3.org/2005/Atom}entry'):
                title = record.find('{http://www.w3.org/2005/Atom}title').text
                abstract = record.find('{http://www.w3.org/2005/Atom}summary').text
                id = record.find('{http://www.w3.org/2005/Atom}id').text
                data.append({"id": id, "title": title, "abstract": abstract})

            return {
                'success': True,
                'data': data,
            }
        else:
            return {
                'success': False,
                'error': f"Error fetching Arxiv articles: {response.status_code}"
            }
            

class WikiRetriever(Retriever):
    def fetch_data(self, topic, limit=5, language='en'):
        base_url = f'https://{language}.wikipedia.org/w/api.php'
        params = {
            'action': 'query',
            'format': 'json',
            'list': 'search',
            'srsearch': topic,
            'utf8': 1,
            'srlimit': limit,
        }

        try:
            response = requests.get(base_url, params=params)
            response.raise_for_status()
            data = response.json()
        
            if 'query' in data and 'search' in data['query']:
                articles = data['query']['search']
                
                data_array = []

                for article in articles:
                    page_title = article['title']
                    page_url = f'https://{language}.wikipedia.org/w/api.php'
                    page_params = {
                        'action': 'query',
                        'format': 'json',
                        'titles': page_title,
                        'prop': 'extracts',
                        'exintro': True,
                        'explaintext': True,
                    }

                    page_response = requests.get(page_url, params=page_params)
                    page_response.raise_for_status()

                    page_data = page_response.json()
                    pages = page_data.get('query', {}).get('pages', {})

                    for page_id, page_info in pages.items():
                        text_content = page_info.get('extract', '').strip()
                        title = page_info.get('title', '')
                        if text_content:
                            data_array.append({'id': page_id, 'abstract': text_content, 'title': title})

                return {
                    'success': True,
                    'data': data_array,
                }

            else:
                return {
                    'success': False,
                    'error': 'No search results found.'
                }

        except requests.exceptions.RequestException as e:
            return {
                'success': False,
                'error': f"Error fetching Wikipedia articles: {e}"
            }
