from fastapi import APIRouter, Depends, status, HTTPException, UploadFile
from fastapi.responses import FileResponse
from api.auth.Security import SecurityApp
from api.dto.BookDTO import *
from database.db import db_worker
from sqlalchemy.orm import Session
from api.exception.http_exception_book import *
from api.service.BookApiService import BookService
from database.repository.BookRepository import BookRepository
from typing import Union, List, Annotated
from other.convert_file import get_docx_file
from database.models.BookTable import Book


book_router: APIRouter = APIRouter(
    prefix="/book",
    tags=["Book"]
)


@book_router.post(
    path="/create_book",
    status_code=status.HTTP_201_CREATED,
)
async def create_new_book(
    session: Annotated[Session, Depends(db_worker.get_session)],
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)],
    photo_book: UploadFile,
    file_data: UploadFile,
    title: str,
    description: str
):
    if "image" in str(photo_book.content_type) and str(file_data.content_type).endswith("document") or \
    str(file_data.content_type).endswith("pdf"):
        return await BookService.create_a_new_book(
            session=session,
            token=usr_data,
            new_book=AddBook(
                title=title,
                description=description,
                photo_book=await photo_book.read(),
                file_data=await file_data.read()
            )
        )
    return await http_400_dont_create_book()


@book_router.get(
    path="/get-all-user-books",
    status_code=status.HTTP_200_OK,
    response_model=List[GetBook]
)
async def get_all_books_for_user(
    session: Annotated[Session, Depends(db_worker.get_session)],
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)],
) -> List[GetBook]:
    
    result = await BookService.get_all_books_for_user(
        session=session,
        token=str(usr_data)
    )

    return result


@book_router.get(
    path="/download-unique-book",
    status_code=status.HTTP_200_OK,
)
async def download_unique_user_book(
    session: Annotated[Session, Depends(db_worker.get_session)],
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)],
    book_id: int
):
    file: Book = await BookService.get_book_by_id_for_download(session=session, token=str(usr_data), book_id=book_id)
    file_io: str = await get_docx_file(file=file.file_data, file_name=file.title, file_id=file.id)
    return FileResponse(
        file_io, filename=file.title, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )

@book_router.get(
    path="/get-information-about-book",
    status_code=status.HTTP_200_OK,
    response_model=BookSmallInformation
)
async def information_about_book(
    session: Annotated[Session, Depends(db_worker.get_session)],
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)],
    book_id: int
) -> BookSmallInformation:
    
    book_data: GetBook = await BookService.get_book_by_id_for_download(session=session, token=usr_data, book_id=book_id)
    return BookSmallInformation(
        title=book_data.title,
        description=book_data.description,
        creator=book_data.creator
    )

@book_router.delete(
    path="/delete-book",
    status_code=status.HTTP_200_OK,
    response_model=BookIsDeleted
)
async def delete_book(
    session: Annotated[Session, Depends(db_worker.get_session)],
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)],
    book_id: int
) -> BookIsDeleted:
    
    return await BookService.delete_book(session=session, book_id=book_id)


@book_router.get(
    path="/get-desc-book",
    status_code=status.HTTP_200_OK,
    response_model=List[BookSmallInformation]
)
async def get_small_info_about_book(
    session: Annotated[Session, Depends(db_worker.get_session)],
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)]
) -> List[BookSmallInformation]:
    return await BookService.find_books(session=session, token=usr_data)