from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
import models
from schemas import UsuarioCreate, UsuarioResponse

router = APIRouter(
    prefix="/usuarios",
    tags=["Usuários"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()
        

@router.get("/", response_model=list[UsuarioResponse])
def listar_usuarios(
    db: Session = Depends(get_db)
):

    usuarios = db.query(models.Usuario).all()

    return usuarios


@router.post("/", response_model=UsuarioResponse)
def criar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db)
):

    novo_usuario = models.Usuario(

        nome = usuario.nome,
        login = usuario.login,
        senha = usuario.senha,
        id_perfil = usuario.id_perfil,
        id_congregacao = usuario.id_congregacao
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario