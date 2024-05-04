from api.auth.Security import SecurityApp
from fastapi import APIRouter, status, Depends, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from api.dto.UserDTO import AddNewUser, UserIsCreated, UserIsDeleted, UserDo, ResponseToken, UserIsUpdated, GetUserInfo
from api.service.UserApiService import UserService
from sqlalchemy.orm import Session
from database.db import db_worker
from typing import Annotated


user_router = APIRouter(
    prefix="/user",
    tags=["User"]
)


@user_router.post("/registration",
                  status_code=status.HTTP_201_CREATED,
                  response_model=UserIsCreated)
async def registration_user(session: Annotated[Session, Depends(db_worker.get_session)], new_user: AddNewUser):
    return await UserService.create_user(session=session, new_user=new_user)


@user_router.delete("/delete_user",
                    status_code=status.HTTP_200_OK,
                    response_model=UserIsDeleted)
async def delete_user(session: Annotated[Session, Depends(db_worker.get_session)], usr_data: Annotated[UserDo, Depends(SecurityApp().oauth2_scheme)]):
    return await UserService.delete_user(session=session, del_user=usr_data)


@user_router.get("/get-info", status_code=status.HTTP_201_CREATED, response_model=GetUserInfo)
async def get_information_about_user(
    usr_data: Annotated[UserDo, Depends(SecurityApp().oauth2_scheme)],
    session: Annotated[Session, Depends(db_worker.get_session)]
) -> GetUserInfo:
    data = await UserService.get_user(session=session, token=usr_data)
    data.photo_user = str(data.photo_user)
    return data


@user_router.patch("/update-user-photo", status_code=status.HTTP_200_OK, response_model=UserIsUpdated)
async def update_user_photo(
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)],
    session: Annotated[Session, Depends(db_worker.get_session)],
    new_photo: UploadFile
) -> UserIsUpdated: 
    if "image" in str(new_photo.content_type):
        file = await new_photo.read()
        update_file: UserIsUpdated = await UserService().update_user_photo(session=session, new_photo=file, usr_token=usr_data)
        return update_file
            
    raise HTTPException(
        status_code=status.HTTP_406_NOT_ACCEPTABLE,
        detail="Ожидается фото!"
    )


@user_router.patch("/update-user-name", status_code=status.HTTP_200_OK, response_model=UserIsUpdated)
async def update_user_name(
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)],
    session: Annotated[Session, Depends(db_worker.get_session)],
    new_name: str
) -> UserIsUpdated:
    return await UserService().update_user_name(session=session, token=usr_data, new_name=new_name)