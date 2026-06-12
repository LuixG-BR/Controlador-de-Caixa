from fastapi import FastAPI

from database import engine, Base
import models

from routes import usuarios
from routes import auth

Base.metadata.create_all(bind=engine)


app = FastAPI(title="Controlador de Caixa API")

app.include_router(usuarios.router)
app.include_router(auth.router)

@app.get("/")
def inicio():

    return {
        "status":"API funcionando"
    }

