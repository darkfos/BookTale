from typing import Final
from dotenv import load_dotenv
import os

load_dotenv()


class DatabaseSettings:

    def __init__(self) -> None:
        self.__DB_URL: Final[str] = os.getenv("DATABASE_URL")
        self.__echo: bool = True
    
    @property
    async def db_url(self): return self.__DB_URL

    @property
    async def echo(self): return self.echo

    @echo.setter
    async def echo(self, echo_type: bool): self.__echo = echo_type
    
db_settings: DatabaseSettings = DatabaseSettings()