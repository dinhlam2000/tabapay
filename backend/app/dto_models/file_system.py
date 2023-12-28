from attr import attrib, attrs, validators, Factory
from datetime import datetime
from uuid import UUID, uuid4
@attrs
class FileSystemDTO:

    id = attrib(
        init=False,
        type=UUID,
        default=Factory(uuid4),
        validator=validators.instance_of(UUID),
    )

    name = attrib(
        init=True,
        type=str,
        validator=validators.instance_of(str),
    )

    content = attrib(
        init=True,
        type=str,
        validator=validators.instance_of(str),
    )

    isFolder = attrib(
        init=True,
        type=bool,
        validator=validators.instance_of(bool),
    )

    createdTime = attrib(
        init=False,
        type=datetime,
        validator=validators.instance_of(datetime),
    )

    updatedTime = attrib(
        init=False,
        type=datetime,
        validator=validators.instance_of(datetime),
    )
