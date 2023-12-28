from marshmallow import Schema
from typing import Any
from marshmallow.exceptions import ValidationError
from utils.response import abort

def serialize(data: Any, schema: Schema, toString=True) -> str:
    try:
        s = schema.dumps(obj=data) if toString else schema.dump(obj=data)
        return s
    except ValidationError as e:
        abort(500,str(e))

def deserialize(data: Any, schema: Schema) -> Any:
    try:
        d = schema.load(data=data)
        return d
    except ValidationError as e:
        abort(400,  str(e))