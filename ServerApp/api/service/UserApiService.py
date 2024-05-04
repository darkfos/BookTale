from fastapi import HTTPException, status
from api.exception.http_exception_user import http_404_user_not_found
from sqlalchemy.orm import Session
from api.dto.UserDTO import AddNewUser, UserIsCreated, UserDo, UserIsDeleted, GetUserInfo, UserIsUpdated
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
    async def delete_user(session: Session, usr_token: str):
        #Decode user
        user_id: int = (SecurityApp().decode_jwt_token(token_type="access", token=usr_token)).get("user_id")
        result = UserRepository.delete_user(session=session, user_id=int(user_id))

        result = True if result else False
        
        return UserIsDeleted(
            user_deleted=result
        )
    
    @staticmethod
    async def update_user_photo(session: Session, new_photo: bytes, usr_token) -> bool:
        #Decode user
        user_id: int = (SecurityApp().decode_jwt_token(token_type="access", token=usr_token)).get("user_id")
        result: bool = UserRepository.update_photo(session=session, user_id=int(user_id), new_photo=new_photo)

        return UserIsUpdated(user_updated=result)

