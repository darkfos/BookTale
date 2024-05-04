from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String, Text, BLOB, ForeignKey
from database.dec_base import DeclBase
from datetime import datetime


class Review(DeclBase):

    __tablename__ = "review"

    message: Mapped[str] = mapped_column(String(350))
    id_user: Mapped[int] = mapped_column(ForeignKey("user.id"))
    
    #relation to user
    user: Mapped["User"] = relationship(back_populates="reviews")


    def __str__(self):
        return str(
            {
                f"{k}": v
                    for k, v in self.__dict__.items()
            }
        )
    
    def __repr__(self):
        return self.__str__()
