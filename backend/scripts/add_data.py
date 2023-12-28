import json
from lambda_handlers.file_system import lambda_handler as file_system_handler

def generate_event(body, method, path, path_params=None, query_params=None):
    if path_params == None:
        path_params = {}
    return {
        "body": json.dumps(body) if body else None,
        "headers": {
            "Accept": "*/*",
            "Content-Length": "123",
            "Content-Type": "application/json",
            "Host": "localhost:3000",
            "User-Agent": "curl/7.64.1",
            "X-Forwarded-Port": "3000",
            "X-Forwarded-Proto": "http"
        },
        "httpMethod": method,
        "multiValueQueryStringParameters": path_params,
        "path": path,
        "pathParameters": path_params,
        "queryStringParameters": query_params,
    }

def create_file_system(name: str, isFolder: bool, content: str):
    body = {
      "isFolder": isFolder,
      "name": name,
      "content": content
    }

    event = generate_event(body, "POST", "/file_system")
    print(json.dumps(event))
    data = file_system_handler(event, None)
    if data['statusCode'] != 200:
        print(json.loads(data['body']))

    return json.loads(data["body"])

#
def get_all_file_systems():
    event = generate_event(None, "GET", "/file_system")
    data = file_system_handler(event, None)
    if data['statusCode'] != 200:
        print(json.loads(data['body']))
    return json.loads(data["body"])
#
def delete_file_system_by_id(id):
    event = generate_event(None, "DELETE", "/file_system/{file_system_id}", {'file_system_id': id})
    data = file_system_handler(event, None)
    if data['statusCode'] != 200:
        print(json.loads(data['body']))
    return json.loads(data["body"])

if __name__ == "__main__":
    file_category = create_file_system(name='TABAPAY', isFolder=True, content="")
    # file_category = create_file_system(name='TABAPAY/App.tsx', isFolder=False, content="hello world")

    # all_file_systems = get_all_file_systems()
    # file_category = update_category('file')
    # file_category = get_category('file')
    # file_category = delete_category('file')

    # print(file_category)
    # print(all_file_systems)

    # delete = delete_file_system_by_id("0537ed39-8a02-477e-a561-44b15f6dc624")
    # print(delete)
