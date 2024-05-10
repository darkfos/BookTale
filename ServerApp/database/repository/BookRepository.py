from sqlalchemy.orm import Session, joinedload
from database.models.UserTable import User
from typing import Union, List
from sqlalchemy import select, delete, update, insert
from database.models.BookTable import Book


class BookRepository:

    @staticmethod
    def create_book(session: Session, new_book: Book) -> bool:
        try:
            session.add(new_book)
            session.commit()
            return True
        except Exception as ex:
            return False
        
    @staticmethod
    def get_all_books_usr(session: Session, user_id: int) -> Union[bool, List[Book]]:
        stmt = select(Book).options(joinedload(Book.user)).where(Book.id_user == user_id)
        all_books = ( session.execute(stmt) ).all()

        if all_books:
            return all_books
        else:
            return False
    
    @staticmethod
    def get_book_by_id(session: Session, id: int) -> Union[bool, Book]:
        stmt = select(Book).options(joinedload(Book.user)).where(Book.id == id)
        book = ( session.execute(stmt) ).one_or_none()

        if book:
            return book[0]
        else: return False
    
    @staticmethod
    def delete_book_by_id(session: Session, id: int) -> bool:
        try:
            stmt = select(Book).where(Book.id == id)
            res = (session.execute(stmt)).one_or_none()
            if res:
                stmt = delete(Book).where(Book.id == id)
                session.execute(stmt)
                session.commit()
                return True
            raise ex
        except Exception as ex:
            return False
        
    @staticmethod
    def get_all_books(session: Session) -> Union[bool, tuple]:
        stmt = select(Book).options(
            joinedload(Book.user)
        )
        res = (session.execute(stmt).all())

        if res:
            return res
        else: return False