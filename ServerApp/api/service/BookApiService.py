from sqlalchemy.orm import Session
from typing import Any, List, Union, Annotated
from api.exception.htpp_exception_book import *
from api.auth.Security import SecurityApp
from api.dto.BookDTO import *
from database.db import db_worker
from database.models.BookTable import Book
from database.repository.BookRepository import BookRepository


class BookService:

    @staticmethod
    async def create_a_new_book(
        session: Session,
        new_book: AddBook,
        token: str
    ) -> BookIsCreated:
        #Get user_id
        user_id: int = ( SecurityApp().decode_jwt_token(token_type="access", token=token) ).get("user_id")
        creat_book = Book(**new_book.model_dump())
        creat_book.id_user = user_id
        result_create_book: bool = BookRepository.create_book(
            session=session,
            new_book=creat_book
        )

        return BookIsCreated(book_created=result_create_book)