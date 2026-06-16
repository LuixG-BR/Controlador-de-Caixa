from fastapi import FastAPI

from database import engine, Base
import models

from modules.usuario import router as usuarios
from modules.congregacao import router as congregacoes
from modules.lancamento import router as lancamentos
from routes import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Controlador de Caixa API")

app.include_router(usuarios.router)
app.include_router(congregacoes.router)
app.include_router(lancamentos.router)
app.include_router(auth.router)

@app.get("/")
def inicio():

    return {
        "status":"API funcionando"
    }

