from fastapi import status, HTTPException


async def http_400_dont_create_user():
    
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Не удалось создать пользователя"
    )


async def http_404_user_not_found():

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Пользователь не был найден"
    )


async def http_400_dont_update_user_info():

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Не удалось обновить инф. о пользователе"
    )


async def http_400_dont_delete_user():

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Не удалось удалить пользователя"
    )


async def http_400_dont_right_token():

    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Недествительный токен!"
    )


async def http_400_user_not_authorizated():

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Вы не авторизированы в систеvе"
    )