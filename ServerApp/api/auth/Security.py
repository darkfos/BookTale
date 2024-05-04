from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from settings import APISettings
from typing import Union


class SecurityApp:

    def __init__(self) -> None:
        self.oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth")
        self.crypt: CryptContext = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    def hasshing_password(self, password: str) -> None:
        return self.crypt.hash(password)

    def verify_password(self, user_password, hashed_password):
        return self.crypt.verify(user_password, hashed_password)
    
    def authenticate_user(self, login: str, password: str) -> Union[bool, bool]:
        pass