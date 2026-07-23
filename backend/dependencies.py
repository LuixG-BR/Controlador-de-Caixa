from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from database import SessionLocal
from modules.usuario import model
from sqlalchemy.orm import Session
from security import verificar_token

from security import SECRET_KEY, ALGORITHM


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

def usuario_logado(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    payload = verificar_token(token)

    usuario_db = (
        db.query(model.Usuario).filter(
            model.Usuario.id_usuario == payload["id_usuario"]
        ).first()
    )

    if not usuario_db:
        raise HTTPException(
            status_code=401,
            detail="Usuário inválido."
        )

    if not usuario_db.status:
        raise HTTPException(
            status_code=403,
            detail="Usuário desativado."
        )
    return payload
        
def verificar_permissao(perfis_permitidos: list[int]):

    def permissao(
        usuario = Depends(usuario_logado)
    ):

        id_perfil = usuario.get("id_perfil")


        if id_perfil not in perfis_permitidos:

            raise HTTPException(
                status_code=403,
                detail="Sem permissão para acessar este recurso"
            )

        return usuario

    return permissao