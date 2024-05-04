from api.auth.Security import SecurityApp
from fastapi import APIRouter, status, Depends
from api.dto.UserDTO import AddNewUser, UserIsCreated
from typing import Annotated


user_router = APIRouter(
    prefix="/user",
    tags=["User"]
)

def fake_decode_token(token):
    return AddNewUser(
        username=token + "fakedecoded", email="john@example.com", full_name="John Doe"
    )


async def get_current_user(token: Annotated[str, Depends(SecurityApp().oauth2_scheme)]):
    user = fake_decode_token(token)
    return user


@user_router.post("/registration",
                  status_code=status.HTTP_201_CREATED,
                  response_model=UserIsCreated)
async def registration_user(new_user: Annotated[AddNewUser, Depends(get_current_user)]):
    return UserIsCreated(user_created=True)