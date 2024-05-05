from fastapi import APIRouter, Depends, status, HTTPException
from api.auth.Security import SecurityApp
from api.dto.BookDTO import *
from database.db import db_worker
from sqlalchemy.orm import Session
from api.exception.htpp_exception_book import *
from typing import Union, List, Annotated


book_router: APIRouter = APIRouter(
    prefix="/book",
    tags=["Book"]
)


@book_router.post(
    path="/create_book"
)