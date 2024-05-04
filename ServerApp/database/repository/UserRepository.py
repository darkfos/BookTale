from sqlalchemy.orm import Session
from sqlalchemy import select, insert
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
    def create_user(session: Session, new_user_data: User):
        try:
            new_user = insert(new_user_data)
            session.add(new_user)
            session.commit()
            return True
        except Exception as ex:
            return False