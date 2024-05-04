from pydantic import BaseModel, Field
from typing import Annotated, List
from datetime import datetime
from database.models.BookTable import Book
from database.models.ReviewTable import Review



class UserBase(BaseModel):

    username: Annotated[str, Field(min_length=4, max_length=120)]
    photo_user: Annotated[bytes, Field()]


class AddNewUser(UserBase):

    login: Annotated[str, Field(max_length=50)]
    hasshed_password: Annotated[str, Field()]
    date_create: Annotated[datetime, Field(default=datetime.now())]
    date_update: Annotated[datetime, Field(default=datetime.now())]


class GetUserInfo(UserBase):

    date_create: Annotated[datetime, Field()]
    date_update: Annotated[datetime, Field()]


class ResponseToken(BaseModel):

    token: Annotated[str, Field()]
    refresh_token: Annotated[str, Field()]


class UserDo(BaseModel):

    token: Annotated[str, Field()]


class GetUserBookInformation(UserBase):

    title: Annotated[str, Field(max_length=120)]
    description: Annotated[str, Field()]
    photo_book: Annotated[bytes, Field()]
    file_data: Annotated[bytes, Field()]
    id: Annotated[int, Field()]


class GetUserReview(UserBase):

    message: Annotated[str, Field()]
    id: Annotated[int, Field()]
    id_user: Annotated[int, Field()]


class UserIsCreated(BaseModel):

    user_created: Annotated[bool, Field()]