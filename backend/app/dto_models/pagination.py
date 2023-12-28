from attr import attrib, attrs, validators, Factory
from datetime import datetime
from typing import List, Optional
from ._base import AsDict
from uuid import UUID, uuid4

@attrs
class Pagination(AsDict):

    items = attrib(
        init=True,
        type=List,
        validator=validators.instance_of(list),
    )

    count = attrib(
        init=True,
        type=int,
        validator=validators.instance_of(int),
    )


    last_evaluated_key = attrib(
        init=True,
        type=Optional[str],
        validator=validators.optional(validators.instance_of(str)),
    )