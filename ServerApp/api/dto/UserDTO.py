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

    books: Annotated[List[Book], Field()]


class GetUserReview(UserBase):

    review: Annotated[List[Review], Field()]