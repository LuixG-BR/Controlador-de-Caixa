from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

import models

from database import SessionLocal

from security import (
    verificar_senha,
    criar_token
)


router = APIRouter(
    prefix="/auth",
    tags=["Login"]
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/login")
def login(
    dados: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)

):

    usuario = (
        db.query(models.Usuario)
        .filter(
            models.Usuario.login == dados.username
        )
        .first()
    )


    if not usuario:

        raise HTTPException(
            status_code=401,
            detail="Usuário inválido"
        )


    if not verificar_senha(
        dados.password,
        usuario.senha
    ):

        raise HTTPException(
            status_code=401,
            detail="Senha inválida"
        )


    token = criar_token(
        {
            "sub": usuario.login,
            "id_usuario": usuario.id_usuario,
            "id_perfil": usuario.id_perfil,
            "id_congregacao": usuario.id_congregacao
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }