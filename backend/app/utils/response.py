from utils.exceptions import AbortException
import json

cors_headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
}

def Response(statusCode, body, headers=None):
    res = {
        "statusCode": statusCode,
        "body": body if isinstance(body, str) else json.dumps(body),
        "headers": cors_headers
    }
    if headers:
        res['headers'].update(headers)
    return res

def abort(statusCode, message):
    raise(AbortException(Response(statusCode, {'messsage': message})))