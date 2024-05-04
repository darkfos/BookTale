from api.routers.user_router import user_router
from api.routers.auth_router import auth_router
from fastapi import FastAPI
import uvicorn


application: FastAPI = FastAPI()

#Include router
application.include_router(auth_router)
application.include_router(user_router)

if __name__ == "__main__":
    uvicorn.run(app=application, host="127.0.0.1", port="8852", workers=True)