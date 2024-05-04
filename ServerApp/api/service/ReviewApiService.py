from sqlalchemy.orm import Session
from database.repository.ReviewRepository import ReviewRepository
from api.auth.Security import SecurityApp
from api.dto.ReviewDTO import AddReview, ReviewIsCreated
from database.models.ReviewTable import Review
from typing import List, Union


class ReviewService:
    @staticmethod
    async def create_new_review(
        session: Session,
        token: str,
        new_review: AddReview
    ) -> Union[bool]:
        #Decode token
        user_id: int = int(( SecurityApp().decode_jwt_token(token_type="access", token=token) ).get("user_id"))
        creating_review = Review(**new_review.model_dump())
        creating_review.id_user = user_id
        
        result: bool = ReviewRepository.create_review(session=session, new_review=creating_review)

        return ReviewIsCreated(review_created=result)