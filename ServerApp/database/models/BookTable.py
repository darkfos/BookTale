from sqlalchemy.orm import mapped_column, Mapped, relationship
from sqlalchemy import String, Text, BLOB
from database.dec_base import DeclarativeBase
from datetime import datetime


class Book(DeclarativeBase):

    __tablename__ = "Book"

    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    photo_book: Mapped[bytes] = mapped_column(BLOB, nullable=False)
    file_data: Mapped[bytes] = mapped_column(BLOB, nullable=False)

    id_user: Mapped[int] = mapped_column(Integer, primary_key=True)

    #relation
    user: Mapped["User"] = relationship("User", back_populates="books")


    def __str__(self):
        return str(
            {
                f"{k}": v 
                    for k, v in self.__dict__.items()
            }
        )
    
    def __repr__(self):
        return self.__str__