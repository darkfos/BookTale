from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from settings import db_settings
from database.dec_base import DeclBase


class Database:

    def __init__(self) -> None:
        self.engine = create_engine(url=db_settings.db_url, echo=db_settings.echo)
        self.session = sessionmaker(bind=self.engine)

    def get_session(self):
        with self.session.begin() as ses:
            return ses
    
    def create_all_tables(self):
        DeclBase.metadata.create_all(bind=self.engine)