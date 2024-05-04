from pydantic import BaseModel, Field
from typing import Annotated, List


class ReviewBase(BaseModel):

    message: Annotated[str, Field()]


class AddReview(ReviewBase):
    pass


class DeleteReview(BaseModel):
    
    id_review: Annotated[int, Field()]


class ReviewIsCreated(BaseModel):

    review_created: Annotated[bool, Field()]


class ReviewIsDeleted(BaseModel):

    review_deleted: Annotated[bool, Field()]