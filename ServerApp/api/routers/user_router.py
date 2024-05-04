from api.auth.Security import SecurityApp
from fastapi import APIRouter, status, Depends
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from api.dto.UserDTO import AddNewUser, UserIsCreated, UserIsDeleted, UserDo, ResponseToken
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
async def delete_user(session: Annotated[Session, Depends(db_worker.get_session)], data: UserDo):
    return await UserService.delete_user(session=session, del_user=data)


@user_router.get("/get-info", status_code=status.HTTP_201_CREATED)
async def get_information_about_user(
    usr_data: Annotated[UserDo, Depends(SecurityApp().oauth2_scheme)],
):
    return {"message": "success"}