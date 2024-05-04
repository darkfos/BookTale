from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from api.dto.UserDTO import AddNewUser, UserIsCreated, UserDo, UserIsDeleted
from database.models.UserTable import User
from database.repository.UserRepository import UserRepository
from api.auth.Security import SecurityApp

class UserService:

    @staticmethod 
    async def get_user(new_user: AddNewUser) -> User:
        pass

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
