from sqlalchemy.orm import Session
from sqlalchemy import select
from database.models.ReviewTable import Review
from typing import Union


class ReviewRepository:

    @staticmethod
    def create_review(session: Session, new_review: Review) -> bool:
        try:
            session.add(new_review)
            session.commit()
            return True
        except Exception as ex:
            return False
    
    @staticmethod
    def get_all_review_by_user_id(session: Session, user_id: int) -> Union[bool, tuple]:
        stmt = select(Review).where(Review.id_user == user_id)
        result = ( session.execute(stmt) ).fetchall()

        if result:
            return result
        return False