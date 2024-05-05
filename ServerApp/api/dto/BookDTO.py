from typing import Annotated, Union
from pydantic import BaseModel, Field 


class BookBase(BaseModel):

    title: Annotated[str, Field()]
    description: Annotated[str, Field()]
    photo_book: Annotated[Union[bytes, str], Field()]
    file_data: Annotated[Union[bytes, str], Field()]
    creator: Annotated[str, Field()]


class AddBook(BookBase):
    pass


class DeleteBook(BaseModel):

    id_book: Annotated[int, Field()]


class GetBook(BookBase):
    id: Annotated[int, Field()]


class BookIsCreated(BaseModel):
    book_created: Annotated[bool, Field()]


class BookSmallInformation(BaseModel):

    title: Annotated[str, Field()]
    description: Annotated[str, Field()]
    creator: Annotated[str, Field()]