from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from modules.usuario import model
from modules.usuario.schema import UsuarioCreate, UsuarioResponse, UsuarioStatus, UsuarioMeResponse, UsuarioListResponse
from modules.usuario.service import UsuarioService

from dependencies import usuario_logado, verificar_permissao
from security import criar_hash_senha

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
        

@router.get("/", response_model=list[UsuarioListResponse])
def listar_usuarios(
    db: Session = Depends(get_db),
    usuario_atual = Depends(verificar_permissao([1]))
):
    usuarios = db.query(model.Usuario).all()

    return usuarios

@router.get("/me", response_model=UsuarioMeResponse)
def usuario_me(
    db: Session = Depends(get_db),
    usuario=Depends(usuario_logado)
):
    return UsuarioService.obter_usuario_logado(
        db,
        usuario
    )

@router.post("/", response_model=UsuarioResponse)
def criar_usuario(
    usuario: UsuarioCreate,
    db: Session = Depends(get_db),
    usuario_atual = Depends(verificar_permissao([1]))):

    novo_usuario = model.Usuario(

        nome = usuario.nome,
        login = usuario.login,
        senha = criar_hash_senha(usuario.senha),
        id_perfil = usuario.id_perfil,
        id_congregacao = usuario.id_congregacao
    )

    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)

    return novo_usuario

# EDITAR DADOS
@router.put("/{id_usuario}", response_model=UsuarioResponse)
def editar(
    id_usuario:int,
    dados: UsuarioCreate,
    db: Session = Depends(get_db),

    usuario_atual = Depends(verificar_permissao([1]))):

    usuario = db.query(
        model.Usuario
    ).filter(
        model.Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:

        raise HTTPException(
            404,
            "Usuario não encontrado"
        )

    usuario.nome = dados.nome
    usuario.login = dados.login
    usuario.senha = criar_hash_senha(dados.senha)
    usuario.id_perfil = dados.id_perfil
    usuario.id_congregacao = dados.id_congregacao
    
    db.commit()
    db.refresh(usuario)

    return usuario

# ALTERAR STATUS
@router.patch("/{id_usuario}/status", response_model=UsuarioResponse)
def alterar_status(

    id_usuario:int,
    dados: UsuarioStatus,
    db: Session = Depends(get_db),

    usuario_atual = Depends(verificar_permissao([1]))):

    usuario = db.query(
        model.Usuario
    ).filter(
        model.Usuario.id_usuario == id_usuario
    ).first()

    if not usuario:

        raise HTTPException(
            404,
            "Usuario não encontrado"
        )

    usuario.status = dados.status

    db.commit()
    db.refresh(usuario)

    return usuario