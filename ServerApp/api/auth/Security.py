from fastapi.security import OAuth2PasswordBearer


class SecurityApp:

    def __init__(self) -> None:
        self.oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth")
    
    def create_new_user(self) -> None:
        pass