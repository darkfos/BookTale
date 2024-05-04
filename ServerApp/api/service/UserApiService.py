from fastapi import HTTPException, status
from api.dto.UserDTO import AddNewUser
from database.models.UserTable import User

class UserService:

    @staticmethod 
    def get_user(self, new_user: AddNewUser)