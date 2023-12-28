from dto_models.file_system import FileSystemDTO
from db_models.filesystem import FileSystemDBO
from converters.file_system import file_system_dbo_to_dto, file_system_dto_to_dbo
from utils.exceptions import ObjectAlreadyExists, FailToCreateObject
from pynamodb.exceptions import DoesNotExist, PutError
from typing import List
from utils.exceptions import ObjectDoesNotExist
import os
import pytz
from datetime import datetime
import logging
logger = logging.getLogger(__name__)


########################################################################################################
#  Entity        | (id)        | name          | content         | isFolder       | parentId         | #
# -----------------------------------------------------------------------------------------------------#
#                | UID1        |  src/App.tsx  |                 | false          | root             | #
########################################################################################################

class FileSystemService:

    @classmethod
    def dbo_to_dto(cls, *args) -> FileSystemDTO:
        return file_system_dbo_to_dto(*args)

    @classmethod
    def dto_to_dbo(cls, *args) -> FileSystemDBO:
        return file_system_dto_to_dbo(*args)

    @property
    def Model(self) -> FileSystemDBO: # property that does not allow duplicates
        return FileSystemDBO

    def post_file_system(self, dto: FileSystemDTO) -> FileSystemDTO:
        print("post_file_system")

        file_system_dbo = self.dto_to_dbo(dto)
        print("post_file_system file_system_dbo ", file_system_dbo)
        print("APP_TIMEZONE ", os.getenv('APP_TIMEZONE'))
        print("APP_TIMEZONE default ", os.getenv('APP_TIMEZONE', 'America/Los_Angeles'))
        file_system_dbo.createdTime = datetime.now(pytz.timezone(os.getenv('APP_TIMEZONE', 'America/Los_Angeles'))) # create before update
        file_system_dbo.updatedTime = datetime.now(pytz.timezone(os.getenv('APP_TIMEZONE', 'America/Los_Angeles')))

        print("post_file_system file_system_dbo ", file_system_dbo)
        table_name = os.environ['DYNAMODB_ENTITY_TABLE']
        host = os.getenv('DYNAMODB_ENDPOINT')

        print("host ", host, table_name)
        try:
            print("HERE1")
            file_system_dbo.save(FileSystemDBO.id.does_not_exist())
            print("HERE2")

            file_system_dbo = FileSystemDBO.get(hash_key=file_system_dbo.id)
            print("HERE3",file_system_dbo)
            file_system_dto = self.dbo_to_dto(file_system_dbo)
            print("HERE4", file_system_dto)
            # also create one more record to track post across categories
        except PutError as e:
            if e.cause_response_code == 'ConditionalCheckFailedException':
                raise ObjectAlreadyExists("object already exists, please use update API for '{}'".format(file_system_dbo.id))
        except DoesNotExist as e:
             raise FailToCreateObject("fail to create object {}".format(file_system_dbo))
        return file_system_dto


    def delete_file_system(self, id: str) -> FileSystemDTO:
        try:
            # TODO: pynamodb does not allow delete without first retrieving the item,
            # Raw dynamodb could do this
            dbo: FileSystemDBO = FileSystemDBO.get(hash_key=id)

            dto = self.dbo_to_dto(dbo)

            dbo.delete()
        except DoesNotExist as e:
            raise ObjectDoesNotExist("Object {} not found".format(id))
        return dto

    def get_all(self) -> List[FileSystemDTO]:
        dtos = []
        dbos = FileSystemDBO.scan()
        for dbo in dbos:
            dtos.append(self.dbo_to_dto(dbo))

        return dtos
