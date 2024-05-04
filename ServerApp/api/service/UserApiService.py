from fastapi import HTTPException, status
from api.exception.http_exception_user import http_404_user_not_found
from sqlalchemy.orm import Session
from api.dto.UserDTO import AddNewUser, UserIsCreated, UserDo, UserIsDeleted, GetUserInfo
from database.models.UserTable import User
from database.repository.UserRepository import UserRepository
from api.auth.Security import SecurityApp

class UserService:

    @staticmethod 
    async def get_user(session: Session, token: str) -> GetUserInfo:
        user_data_id: int = (SecurityApp().decode_jwt_token(token_type="access", token=token)).get("user_id")
        user_data: User = UserRepository.get_user_info(session=session, user_id=user_data_id)

        if user_data:
            return GetUserInfo(
                username=user_data.username,
                photo_user=user_data.photo_user,
                date_create=user_data.date_create,
                date_update=user_data.date_update
            )
        return http_404_user_not_found()


    @staticmethod
    async def create_user(session: Session, new_user: AddNewUser) -> UserIsCreated:
        new_user.hasshed_password = SecurityApp().hasshing_password(password=new_user.hasshed_password)
        result = UserRepository.create_user(
            session=session,
            new_user_data=User(**new_user.model_dump())
        )

        result = True if result else False

        return UserIsCreated(
            user_created=result
        )
    
    @staticmethod
    async def delete_user(session: Session, del_user: UserDo):
        result = UserRepository.delete_user(session=session, user_id=int(del_user.token))

        result = True if result else False
        
        return UserIsDeleted(
            user_deleted=result
        )
