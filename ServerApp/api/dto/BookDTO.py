from typing import Annotated
from pydantic import BaseModel, Field 


class BookBase(BaseModel):

    title: Annotated[str, Field()]
    description: Annotated[str, Field()]
    photo_book: Annotated[bytes, Field()]
    file_data: Annotated[bytes, Field()]


class AddBook(BookBase):
    pass


class DeleteBook(BaseModel):

    id_book: Annotated[int, Field()]


class GetBook(BookBase):
    pass