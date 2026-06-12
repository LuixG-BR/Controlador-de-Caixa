from fastapi import FastAPI

from database import engine, Base
import models

from routes import usuarios

Base.metadata.create_all(bind=engine)


app = FastAPI(title="Controlador de Caixa API")

app.include_router(usuarios.router)

@app.get("/")
def inicio():

    return {
        "status":"API funcionando"
    }

