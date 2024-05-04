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

def fake_decode_token(token):
    return AddNewUser(
        username=token + "fakedecoded", email="john@example.com", full_name="John Doe"
    )


async def get_current_user(token: Annotated[str, Depends(SecurityApp().oauth2_scheme)]):
    user = fake_decode_token(token)
    return user


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


#Authenticate user
@user_router.post("/auth", status_code=status.HTTP_201_CREATED, response_model=ResponseToken)
async def auth_user(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Annotated[Session, Depends(db_worker.get_session)]
):
    auth_user: int = SecurityApp().authenticate_user(session=session, login=form_data.username, password=form_data.password)
    token_data: ResponseToken = SecurityApp().create_access_token(
        login=form_data.username,
        password=form_data.password,
        id_user=auth_user
    )

    result = JSONResponse(
        content=token_data.model_dump(),
        status_code=status.HTTP_201_CREATED,
    )

    result.set_cookie(key="Refresh-token", value=token_data.refresh_token)

    return result


@user_router.get("/get-info", status_code=status.HTTP_201_CREATED)
async def get_information_about_user(
    usr_data: Annotated[UserDo, Depends(SecurityApp().oauth2_scheme)],
):
    return {"message": "success"}