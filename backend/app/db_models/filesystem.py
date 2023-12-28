from pynamodb.models import Model
from pynamodb.attributes import UnicodeAttribute, UTCDateTimeAttribute, BooleanAttribute
from typing import List, Optional, Any
from pynamodb.expressions.update import Action
from pynamodb.expressions.condition import Condition
from pynamodb.settings import OperationSettings
import os
from pynamodb.models import Model

class FileSystemDBO(Model):
    class Meta:
        table_name = os.environ['DYNAMODB_ENTITY_TABLE']
        host = os.getenv('DYNAMODB_ENDPOINT')
        region = os.environ['AWS_REGION']

    id = UnicodeAttribute(hash_key=True)
    content = UnicodeAttribute()
    name = UnicodeAttribute()
    isFolder = BooleanAttribute()
    
    createdTime = UTCDateTimeAttribute()
    updatedTime = UTCDateTimeAttribute()
    def update_attributes(self, condition: Optional[Condition] = None,
               settings: OperationSettings = OperationSettings.default) -> Any:
        actions: List[Action] = []
        for key, value in self.attribute_values.items():
            if key == 'createdTime':
                actions.append(FileSystemDBO.createdTime.set(value))
            elif key == 'updatedTime':
                actions.append(FileSystemDBO.updatedTime.set(value))
            elif key == 'content':
                actions.append(FileSystemDBO.content.set(value))
            elif key == 'name':
                actions.append(FileSystemDBO.name.set(value))
            elif key == 'isFolder':
                actions.append(FileSystemDBO.isFolder.set(value))

                
        return self.update(actions=actions, condition=condition, settings=settings)
