from fastapi import status, HTTPException


async def http_400_dont_create_book():
    
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Не удалось создать книгу"
    )


async def http_404_book_not_found():

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Книга не была найден"
    )


async def http_400_dont_update_book_info():

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Не удалось обновить инф. о книге"
    )


async def http_400_dont_delete_book():

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Не удалось удалить книгу"
    )