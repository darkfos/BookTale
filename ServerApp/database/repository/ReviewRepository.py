from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select, delete
from database.models.ReviewTable import Review
from typing import Union
from api.dto.ReviewDTO import ReviewIsDeleted
from random import choice


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

    @staticmethod
    def delete_review_by_id(session: Session, review_id: int) -> bool:
        try:
            stmt = delete(Review).where(Review.id == review_id)
            session.execute(stmt)
            session.commit()
            return True
        except Exception as ex:
            return False
        
    @staticmethod
    def get_review_by_id(
        session: Session, review_id: int
    ) -> Union[bool, Review]:
        try:
            stmt = select(Review).where(Review.id == review_id)
            result = (session.execute(stmt)).one_or_none()

            if result:
                return result
            raise ex
        except Exception as ex:
            return False
        
    @staticmethod
    def get_random_review(
        session: Session
    ) -> tuple:
        
        stmt = select(Review).options(
            joinedload(Review.user)
        )
        result = ( session.execute(stmt) ).all()

        random_review =  choice(result)

        return random_review[0]
        