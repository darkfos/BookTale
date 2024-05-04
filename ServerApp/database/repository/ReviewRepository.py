from sqlalchemy.orm import Session
from database.models.ReviewTable import Review


class ReviewRepository:

    @staticmethod
    def create_review(session: Session, new_review: Review) -> bool:
        try:
            session.add(new_review)
            session.commit()
            return True
        except Exception as ex:
            return False