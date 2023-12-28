from functools import partial
from utils.schema_helper import serialize, deserialize
from services.file_system import FileSystemService
from schemas.file_system import FileSystemSchema
from uuid import UUID
from typing import Dict
from utils.response import abort, Response
from utils.exceptions import ObjectDoesNotExist, FailToCreateObject, ObjectAlreadyExists

serialize_file_system= partial(serialize, schema=FileSystemSchema())
deserialize_file_system= partial(deserialize, schema=FileSystemSchema())
serialize_file_systems = partial(serialize, schema=FileSystemSchema(many=True))
deserialize_file_systems = partial(deserialize, schema=FileSystemSchema(many=True))

import logging
logger = logging.getLogger(__name__)

class FileSystemResource:
    @classmethod
    def serialize(cls, *args):
        return serialize_file_system(*args)

    @classmethod
    def serializes(cls, *args):
        return serialize_file_systems(*args)

    @classmethod
    def deserialize(cls, *args):
        return deserialize_file_system(*args)

    @classmethod
    def deserializes(cls, *args):
        return deserialize_file_systems(*args)

    @classmethod
    def service(cls, *args) -> FileSystemService:
        return FileSystemService(*args)

    @classmethod
    def get_all_file_systems(cls) -> Response:
        try:
            dtos = cls.service().get_all()
        except ValueError as e:
            abort(400, str(e))
        response_data = cls.serializes(dtos)
        return Response(200, response_data)

    # @classmethod
    # def get_by_id(cls,  id: UUID) -> Response:
    #     try:
    #         dto = FileSystemService().(str(id))
    #     except ValueError as e:
    #         abort(400, str(e))
    #     except ObjectDoesNotExist as e:
    #         abort(400, str(e))
    #     response_data = cls.serialize(dto)
    #     return Response(200, response_data)

    @classmethod
    def delete_by_id(cls, id: UUID) -> Response:
        try:
            dto = FileSystemService().delete_file_system(str(id))
        except ValueError as e:
            abort(400, str(e))
        except ObjectDoesNotExist as e:
            abort(400, str(e))
        response_data = cls.serialize(dto)
        return Response(200, response_data)

    @classmethod
    def post_file_system(cls, obj: Dict) -> Response:
        print("POSTTT FILE SYSTEM")
        try:
            dto = cls.deserialize(obj)
            print("DTO", dto)
            dto = FileSystemService().post_file_system(dto)
        except ValueError as e:
            abort(400, str(e))
        except FailToCreateObject as e:
            abort(400, str(e))
            print("PostResource post 400 {}".format(e))
        except ObjectAlreadyExists as e:
            abort(400, str(e))
            print("PostResource post 400 {}".format(e))
        response_data = cls.serialize(dto)
        return Response(200, response_data)

