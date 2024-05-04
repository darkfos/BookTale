from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String, Text, LargeBinary, Integer, ForeignKey
from database.dec_base import DeclBase
from datetime import datetime


class Book(DeclBase):

    __tablename__ = "book"

    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    photo_book: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)
    file_data: Mapped[bytes] = mapped_column(LargeBinary, nullable=False)

    id_user: Mapped[int] = mapped_column(ForeignKey("user.id"))

    #relation
    user: Mapped["User"] = relationship(back_populates="books")


    def __str__(self):
        return str(
            {
                k: v 
                    for k, v in self.__dict__.items()
            }
        )
    
    def __repr__(self):
        return self.__str__()