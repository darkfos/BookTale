from sqlalchemy.orm import Session
from database.repository.ReviewRepository import ReviewRepository
from api.exception.http_exception_review import *
from api.auth.Security import SecurityApp
from api.dto.ReviewDTO import AddReview, ReviewIsCreated, ReviewBase, ReviewData
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

    @staticmethod
    async def get_all_reviews_user(
        session: Session,
        token: str
    ) -> List[ReviewData]:
        #Decode token
        user_id: int = int( (SecurityApp().decode_jwt_token(token_type="access", token=token)).get("user_id") )
        result_review_req: Union[bool, tuple] = ReviewRepository.get_all_review_by_user_id(session=session, user_id=user_id)

        if result_review_req:
            return [
                ReviewData(
                    id=review[0].id,
                    message=review[0].message
                )
                    for review in result_review_req
            ]
        return http_404_review_not_found()