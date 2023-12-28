from schemas import BaseSchema
from marshmallow import fields, post_load

from dto_models.file_system import FileSystemDTO

class FileSystemSchema(BaseSchema):

    id = fields.UUID(dump_only=True)
    # parentId = fields.String(dump_only=False, required=True, type=str)
    name = fields.String(required=True, type=str)
    isFolder = fields.Bool(required=True, type=bool)
    content = fields.String(dump_only=False, required=True, type=str)

    createdTime = fields.DateTime(dump_only=True, format='iso8601')
    updatedTime = fields.DateTime(dump_only=True, format='iso8601')

    @post_load
    def make_object(self, data, **kwargs):
        return FileSystemDTO(**data)
