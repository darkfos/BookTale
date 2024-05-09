from api.routers.user_router import user_router
from api.routers.auth_router import auth_router
from api.routers.review_router import review_router
from api.routers.book_router import book_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn


application: FastAPI = FastAPI()

#Кто может отправить запросы к АПИ
api_users = [
    "*"
]
application.add_middleware(
    CORSMiddleware,
    allow_origins=api_users,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Include router
application.include_router(auth_router)
application.include_router(user_router)
application.include_router(review_router)
application.include_router(book_router)

if __name__ == "__main__":
    uvicorn.run(app=application, host="127.0.0.1", port="8883", workers=True)