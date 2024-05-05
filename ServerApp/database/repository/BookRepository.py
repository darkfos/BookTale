from sqlalchemy.orm import Session
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