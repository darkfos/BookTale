from api.auth.Security import SecurityApp
from fastapi import APIRouter, status, Depends
from api.dto.UserDTO import AddNewUser, UserIsCreated, UserIsDeleted, UserDo
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