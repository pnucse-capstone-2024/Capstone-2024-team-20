from fastapi import FastAPI
import requests

from prometheusUtil import *

app = FastAPI()

from dotenv import load_dotenv
load_dotenv(os.path.join(BASE_DIR, ".env"))

url = os.environ["URL"]


@app.get("/monitor/list")
async def root():
    queries = query_list()
    return queries

@app.get("/monitor/query")
async def get_instant_query(namespace: str, metric: str, time: int):
    url = f"http://{url}/dashboard/api/v1/query"

    query =f'sum by (pod) (rate({metric}{{namespace="{namespace}"}}[5m]) * 100)'

    params={'query': query, 'time': time}
    response = requests.get(url, params= params)

    response = response.json()['data']['result']

    return response

@app.get("/monitor/range_query")
async def get_range_query(namespace: str, metric: str, start: int, end: int, step: str):
    url = "http://{url}/dashboard/api/v1/query_range"

    query = ''

    if metric == 'cpu':
        query =f'sum by (pod) (rate(container_cpu_usage_seconds_total{{namespace="{namespace}"}}[5m]) * 100)'
    elif metric == 'memory':
        query =f'sum by (pod) (container_memory_usage_bytes{{namespace="{namespace}"}}) / 1024 / 1024'
    elif metric == 'network':
        query =f'sum by (pod) (rate(container_network_receive_bytes_total{{namespace="{namespace}"}}[5m]) + rate(container_network_transmit_bytes_total{{namespace="{namespace}"}}[5m])) / 1024'

    params={'query': query, 'start': start, 'end': end, 'step': step}
    response = requests.get(url, params= params)

    response = response.json()['data']['result']

    return response
