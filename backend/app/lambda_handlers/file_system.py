import json
from resources.file_system import FileSystemResource
from utils.exceptions import AbortException
from utils.response import Response
import traceback

def lambda_handler(event, context):
    print("event = ", json.dumps(event))

    body = json.loads(event.get('body')) if event.get('body') else None
    headers = event.get('headers')
    httpMethod = event.get('httpMethod')
    pathParameters = event.get('pathParameters', {})
    if pathParameters is None:
        pathParameters = {}
    queryStringParameters = event.get('queryStringParameters')
    path = event.get('path')

    file_system_id = pathParameters.get('file_system_id')

    try:
        if path == '/file_system':
            if httpMethod == 'GET':
                return FileSystemResource.get_all_file_systems()
            elif httpMethod == 'POST':
                print("POSTTTTT")
                return FileSystemResource.post_file_system(body)
        elif path == '/file_system/{file_system_id}' and file_system_id:
            if httpMethod == 'DELETE':
                return FileSystemResource.delete_by_id(file_system_id)
    except AbortException as e:
        print("got AbortException exception {}, trace_back {}".format(e, traceback.format_stack()))
        return e.args[0]
    except Exception as e:
        print("got 500 exception {}, trace_back {}".format(e, traceback.format_stack()))
        raise Exception(e)

    return Response(400, 'method not found')
