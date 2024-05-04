from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String, Text, LargeBinary
from database.dec_base import DeclBase
from datetime import datetime


class User(DeclBase):

    __tablename__ = "user"

    username: Mapped[str] = mapped_column(String(120))
    login: Mapped[str] = mapped_column(String(50))
    hasshed_password: Mapped[str] = mapped_column(Text)
    photo_user: Mapped[bytes] = mapped_column(LargeBinary)
    date_create: Mapped[datetime]
    date_update: Mapped[datetime]

    #relation
    reviews: Mapped["Review"] = relationship(back_populates="user", cascade="save-update, merge, delete", passive_deletes=True)
    books: Mapped["Book"] = relationship(back_populates="user", cascade="save-update, merge, delete", passive_deletes=True)


    def __str__(self):
        return str(
            {
                f"{k}": v
                    for k, v in self.__dict__.items()
            }
        )
    
    def __repr__(self):
        return self.__str__()