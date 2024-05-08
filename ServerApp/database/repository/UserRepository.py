from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select, insert, delete, update
from database.models.UserTable import User
from typing import Union


class UserRepository:

    @staticmethod
    def get_user(session: Session, login: str, hashed_password: str):
        user_found = select(User).where(User.login == login, User.hasshed_password == hashed_password)
        user = (session.execute(user_found)).one_or_none()

        if user:
            return user
        return False
    
    @staticmethod
    def create_user(session: Session, new_user_data: User) -> bool:
        try:
            session.add(new_user_data)
            session.commit()
            return True
        except Exception as ex:
            print(ex)
            return False
    
    @staticmethod
    def delete_user(session: Session, user_id: int) -> bool:
        try:
            user = delete(User).where(User.id == user_id)
            session.execute(user)
            session.commit()
            return True
        except Exception as ex:
            return False
        
    @staticmethod
    def get_user_info(session: Session, user_id: int) -> Union[bool, User]:
        stmt = select(User).where(User.id == user_id)
        usr_data = ( session.execute(stmt) ).one_or_none()

        if usr_data:
            return usr_data[0]
        return False
    
    @staticmethod
    def update_photo(session: Session, user_id: int, new_photo: bytes) -> bool:
        try:
            stmt = update(User).where(User.id == user_id).values(
                photo_user = new_photo
            )

            session.execute(stmt)
            session.commit()

            return True
        except Exception as ex:
            return False
    
    @staticmethod
    def update_name(session: Session, user_id: int, new_name: str) -> bool:
        try:
            stmt = update(User).where(User.id == user_id).values(
                username = new_name
            )
            session.execute(stmt)
            session.commit()
            return True
        except Exception as ex:
            return False
    
    @staticmethod
    def get_all_information(session: Session, user_id: int) -> Union[tuple, bool]:
        stmt = select(User).options(joinedload(User.books), joinedload(User.reviews)).where(User.id == user_id)
        result = ( session.execute(stmt) ).unique()
        if result:
            return result.one()[0]
        return False
    
    @staticmethod
    def find_user_by_login(session: Session, login: str) -> bool:

        stmt = select(User).where(User.login == login)
        result = ( session.execute(stmt) ).one_or_none()

        if result: return True
        return False