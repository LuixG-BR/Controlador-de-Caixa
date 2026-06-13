from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from modules.usuario import model
from modules.usuario.schema import UsuarioCreate, UsuarioResponse
from dependencies import usuario_logado, verificar_permissao

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
    db: Session = Depends(get_db),
    usuario_atual = Depends(usuario_logado)
):

    usuarios = db.query(model.Usuario).all()

    return usuarios


@router.post("/", response_model=UsuarioResponse)
def criar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db),
    usuario_atual = Depends(verificar_permissao([1]))
):

    novo_usuario = model.Usuario(

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