from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String, Text, LargeBinary
from database.dec_base import DeclBase
from datetime import datetime


class User(DeclBase):

    __tablename__ = "User"

    username: Mapped[str] = mapped_column(String(120))
    login: Mapped[str] = mapped_column(String(50))
    hasshed_password: Mapped[str] = mapped_column(Text)
    photo_user: Mapped[bytes] = mapped_column(LargeBinary)
    date_create: Mapped[datetime]
    date_update: Mapped[datetime]

    #relation
    reviews: Mapped["Review"] = relationship("Review", back_populates="user")
    books: Mapped["Book"] = relationship("Book", back_populates="user")


    def __str__(self):
        return str(
            {
                f"{k}": v
                    for k, v in self.__dict__.items()
            }
        )
    
    def __repr__(self):
        return self.__str__