from typing import Final
from dotenv import load_dotenv
import os

load_dotenv()


class DatabaseSettings:

    def __init__(self) -> None:
        self.__DB_URL: Final[str] = os.getenv("DATABASE_URL")
        self.__echo: bool = True
    
    @property
    def db_url(self): return self.__DB_URL

    @property
    def echo(self): return self.__echo

    @echo.setter
    def echo(self, echo_type: bool): self.__echo = echo_type


class APISettings:

    def __init__(self) -> None:
        self.__api_key: Final[str] = os.getenv("API_KEY_TOKEN")
        self.__api_refresh_key: Final[str] = os.getenv("API_KEY_REFRESH_TOKEN")
        self.__api_time: Final[int] = int(os.getenv("API_KEY_TIME_TO_WORK"))
        self.__api_refresh_time: Final[int] = int(os.getenv("API_REFRESH_KEY_TIME_TO_WORK"))
        self.__algorithm: Final[str] = os.getenv("API_ALGORITHM")

    @property
    def api_key(self) -> str: return self.__api_key

    @property
    def api_refresh_key(self) -> str: return self.__api_refresh_key

    @property
    def api_time(self) -> int: return self.__api_time

    @property
    def api_refresh_time(self) -> int: return self.__api_refresh_time

    @property
    def algorithm(self) -> str: return self.__algorithm
    
db_settings: DatabaseSettings = DatabaseSettings()
api_settings: APISettings = APISettings()