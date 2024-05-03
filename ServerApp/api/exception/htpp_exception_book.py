from fastapi import status, HTTPException


async def http_400_dont_create_review():
    
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Не удалось создать пользователя"
    )


async def http_404_review_not_found():

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Пользователь не был найден"
    )


async def http_400_dont_update_review_info():

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Не удалось обновить инф. о пользователе"
    )


async def http_400_dont_review_user():

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Не удалось удалить пользователя"
    )


async def http_400_dont_review_token():

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Недествительный токен!"
    )


async def http_400_review_not_authorizated():

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Вы не авторизированы в систеvе"
    )