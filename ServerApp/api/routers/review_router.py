from fastapi import APIRouter, status, HTTPException, Depends
from typing import Annotated, Union, List
from api.exception.http_exception_review import *
from api.service.ReviewApiService import ReviewService
from api.dto.ReviewDTO import *
from api.auth.Security import SecurityApp
from database.db import db_worker
from sqlalchemy.orm import Session


review_router: APIRouter = APIRouter(
    prefix="/review",
    tags=["Review"]
)


@review_router.post("/create-review", status_code=status.HTTP_201_CREATED, response_model=ReviewIsCreated)
async def create_review(
    session: Annotated[Session, Depends(db_worker.get_session)],
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)],
    new_review: AddReview
) -> ReviewIsCreated:
    return await ReviewService.create_new_review(session=session, token=usr_data, new_review=new_review)


@review_router.get("/get-all-reviews", status_code=status.HTTP_200_OK, response_model=List[ReviewData])
async def get_all_review(
    session: Annotated[Session, Depends(db_worker.get_session)],
    usr_data: Annotated[str, Depends(SecurityApp().oauth2_scheme)]
) -> List[ReviewData]:
    return await ReviewService.get_all_reviews_user(session=session, token=usr_data)