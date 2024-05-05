from typing import Annotated, Union
from fastapi import UploadFile
from pydantic import BaseModel, Field 


class BookBase(BaseModel):

    title: Annotated[str, Field()]
    description: Annotated[str, Field()]
    photo_book: Annotated[Union[UploadFile, UploadFile.read], Field()]
    file_data: Annotated[Union[UploadFile, UploadFile.read], Field()]


class AddBook(BookBase):
    pass


class DeleteBook(BaseModel):

    id_book: Annotated[int, Field()]


class GetBook(BookBase):
    pass


class BookIsCreated(BaseModel):
    book_created: Annotated[bool, Field()]