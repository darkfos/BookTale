from sqlalchemy.orm import Session
from typing import Any, List, Union, Annotated
from api.exception.http_exception_book import *
from api.auth.Security import SecurityApp
from api.dto.BookDTO import *
from database.db import db_worker
from database.models.BookTable import Book
from database.repository.BookRepository import BookRepository
import base64


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
    
    @staticmethod
    async def get_all_books_for_user(
        session: Session,
        token: str
    ) -> List[GetBook]:
        
        #Get user_id
        user_id: int = ( SecurityApp().decode_jwt_token(token_type="access", token=token) ).get("user_id")
        all_books = BookRepository.get_all_books_usr(session=session, user_id=user_id)
        print(all_books)
        if all_books:
            return [
                GetBook(
                    id=book[0].id,
                    title=book[0].title,
                    description=book[0].description,
                    photo_book=str(book[0].photo_book),
                    file_data=str(book[0].file_data),
                    creator=book[0].user.username
                )
                    for book in all_books
            ]
        return await http_404_book_not_found()

    @staticmethod
    async def get_book_by_id_for_download(session: Session, token: str, book_id: int) -> GetBook:
        #Get user_id
        user_id: int = ( SecurityApp().decode_jwt_token(token_type="access", token=token) ).get("user_id")
        book: Book = BookRepository.get_book_by_id(session=session, id=book_id)

        if book:
            return GetBook(
                title=book.title,
                description=book.description,
                photo_book=book.photo_book,
                file_data=book.file_data,
                id=book.id,
                creator=book.user.username
            )
        return await http_404_book_not_found()

    @staticmethod
    async def delete_book(session: Session, book_id: int) -> BookIsDeleted:

        is_deleted: bool = BookRepository.delete_book_by_id(session=session, id=book_id)
        return BookIsDeleted(
            book_deleted=is_deleted
        )
    
    @staticmethod
    async def find_books(session: Session, token: str) -> List[BookAboutInformation]:

        #Get user_id
        user_id: int = (SecurityApp().decode_jwt_token(token_type="access" ,token=token)).get("user_id")
        
        all_books: tuple = BookRepository.get_all_books_usr(session=session, user_id=user_id)

        if all_books:
            return [
                BookAboutInformation(
                    title=book[0].title,
                    description=book[0].description,
                    creator=book[0].user.username,
                    photo=str(book[0].photo_book)
                )
                    for book in all_books
            ]
        else:
            return await http_404_book_not_found()