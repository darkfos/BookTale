from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends
from passlib.context import CryptContext
from database.models.UserTable import User
from sqlalchemy import select
from sqlalchemy.orm import Session
from settings import APISettings, api_settings
from api.exception.http_exception_user import (http_404_user_not_found, http_400_dont_right_password, http_409_close_create_token, http_400_dont_right_token)
from typing import Union, Literal
from api.dto.UserDTO import AddNewUser, ResponseToken
from jose import jwt, JWTError
from datetime import datetime, timedelta


class SecurityApp:

    oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/oauth2")

    def __init__(self) -> None:
        self.crypt: CryptContext = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
    def hasshing_password(self, password: str) -> None:
        return self.crypt.hash(password)

    def verify_password(self, user_password, hashed_password):
        return self.crypt.verify(user_password, hashed_password)
    
    def authenticate_user(self, session: Session, login: str, password: str) -> Union[bool, int]:
        #Find user
        stmt = select(User).where(User.login == login)
        result_find_user: Union[bool, User] = (session.execute(stmt)).one_or_none()
        if result_find_user:
            if not self.verify_password(user_password=password, hashed_password=result_find_user[0].hasshed_password):
                return http_400_dont_right_password
            return result_find_user[0].id
        else:
            return http_404_user_not_found()
    
    def create_access_token(self, login: str, password: str, id_user: int) -> ResponseToken:
        try:
            hashed_password = self.hasshing_password(password=password)

            #Creating access token
            jwt_access_token = dict(user_login=login, user_password=hashed_password, user_id=id_user)
            expire = datetime.utcnow() + timedelta(minutes=api_settings.api_time)
            jwt_access_token.update({"exp": expire})

            #Creating refresh token
            jwt_refresh_token = dict(user_login=login, user_password=hashed_password, user_id=id_user)
            expire = datetime.utcnow() + timedelta(days=api_settings.api_refresh_time)
            jwt_refresh_token.update({"exp": expire})

            #Result tokens
            jwt_access_token = jwt.encode(jwt_access_token, api_settings.api_key, algorithm=api_settings.algorithm)
            jwt_refresh_token = jwt.encode(jwt_refresh_token, api_settings.api_refresh_key, algorithm=api_settings.algorithm)
            
            return ResponseToken(
                access_token=jwt_access_token,
                refresh_token=jwt_refresh_token,
                token_type="Bearer"
            )
        
        except JWTError as jw:
            return http_409_close_create_token()
    
    def decode_jwt_token(self, token_type: Literal["access", "refresh"], token: str) -> Union[ResponseToken, dict]:

        match token_type:
            case "access":
                #Decode token
                try:
                    data: dict = jwt.decode(token=token, key=api_settings.api_key, algorithms=api_settings.algorithm)
                    return data
                except JWTError as j:
                    return http_409_close_create_token()
            case "refresh":
                #Decode
                try:
                    data: dict = jwt.decode(token=token, key=api_settings.api_refresh_key, algorithms=api_settings.algorithm)
                    #Create a new token
                    #Creating access token
                    jwt_access_token = dict(user_login=data.get('user_login'), user_password=data.get('user_password'), user_id=data.get('id_user'))
                    jwt_access_token.update({"exp": ( datetime.utcnow() + timedelta(minutes=api_settings.api_time) ) })

                    #Creating refresh token
                    jwt_refresh_token = dict(user_login=data.get('user_login'), user_password=data.get('user_password'), user_id=data.get('id_user'))
                    jwt_refresh_token.update({"exp": ( datetime.utcnow() + timedelta(days=api_settings.api_refresh_time) ) })

                    #Result tokens
                    jwt_access_token = jwt.encode(jwt_access_token, api_settings.api_key, algorithm=api_settings.algorithm)
                    jwt_refresh_token = jwt.encode(jwt_refresh_token, api_settings.api_refresh_key, algorithm=api_settings.algorithm)
                    
                    return ResponseToken(
                        access_token=jwt_access_token,
                        refresh_token=jwt_refresh_token,
                        token_type="bearer"
                    )
                except JWTError as j:
                    return http_409_close_create_token()
                
            case _:
                return http_400_dont_right_token