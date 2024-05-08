from pydantic import BaseModel, Field
from typing import Annotated, List, Union


class ReviewBase(BaseModel):

    message: Annotated[str, Field(max_length=350)]


class AddReview(ReviewBase):
    pass


class DeleteReview(BaseModel):
    
    id_review: Annotated[int, Field()]


class ReviewIsCreated(BaseModel):

    review_created: Annotated[bool, Field()]


class ReviewIsDeleted(BaseModel):

    review_deleted: Annotated[bool, Field()]

class ReviewData(ReviewBase):

    id: Annotated[int, Field()]

class RandomReview(ReviewBase):

    user_photo: Annotated[Union[bytes, str], Field()]
    username: Annotated[str, Field()]