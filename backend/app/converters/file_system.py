from dto_models.file_system import FileSystemDTO
from db_models.filesystem import FileSystemDBO
from uuid import UUID


def file_system_dbo_to_dto(dbo: FileSystemDBO) -> FileSystemDTO:

    dto = FileSystemDTO(
        name=dbo.name,
        content=dbo.content,
        isFolder=dbo.isFolder,
    )
    dto.id = UUID(dbo.id)
    dto.createdTime = dbo.createdTime
    dto.updatedTime = dbo.updatedTime
    return dto

def file_system_dto_to_dbo(dto: FileSystemDTO) -> FileSystemDBO:
    dbo = FileSystemDBO(
        name=dto.name,
        isFolder=dto.isFolder,
        content=dto.content,
        id=str(dto.id),
    )
    return dbo


if __name__ == '__main__':
    pass
