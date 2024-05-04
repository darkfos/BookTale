from sqlalchemy.orm import Session
from sqlalchemy import select, insert, delete
from database.models.UserTable import User


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