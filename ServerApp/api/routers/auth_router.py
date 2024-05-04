from api.auth.Security import SecurityApp
from fastapi import APIRouter, status, Depends, Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordRequestForm
from api.dto.UserDTO import ResponseToken
from sqlalchemy.orm import Session
from database.db import db_worker
from typing import Annotated


auth_router: APIRouter = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

#Authenticate user
@auth_router.post("/oauth2", status_code=status.HTTP_201_CREATED, response_model=ResponseToken)
async def auth_user(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    session: Annotated[Session, Depends(db_worker.get_session)]
):
    auth_user: int = SecurityApp().authenticate_user(session=session, login=form_data.username, password=form_data.password)
    token_data: ResponseToken = SecurityApp().create_access_token(
        login=form_data.username,
        password=form_data.password,
        id_user=auth_user
    )

    result = JSONResponse(
        content=token_data.model_dump(),
        status_code=status.HTTP_201_CREATED,
    )

    result.set_cookie(key="Token", value=token_data.access_token)
    result.set_cookie(key="Refresh-token", value=token_data.refresh_token)

    return result

@auth_router.post("/refresh-token", status_code=status.HTTP_200_OK, response_model=ResponseToken)
async def update_token(data: Request):
    token_data: ResponseToken = SecurityApp().decode_jwt_token(token_type="refresh", token=data.cookies.get("Refresh-token"))
    response = JSONResponse(
        content=token_data.model_dump(),
        status_code=status.HTTP_200_OK)
    
    #Set cookie
    response.set_cookie(key="Refresh-token", value=token_data.refresh_token)
    response.set_cookie(key="Token", value=token_data.access_token)

    return response