from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from database import SessionLocal

from modules.congregacao import model
from modules.congregacao.schema import (CongregacaoCreate, CongregacaoResponse)
from dependencies import verificar_permissao

router = APIRouter(

    prefix="/congregacoes",
    tags=["Congregações"]
)


def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()

# LISTAR
@router.get("/",response_model=list[CongregacaoResponse])
def listar_congregacoes(

    db: Session = Depends(get_db)

):

    congregacoes = db.query(
        model.Congregacao
    ).all()


    return congregacoes


# CRIAR
@router.post(
    "/",
    response_model=CongregacaoResponse
)
def criar_congregacao(

    dados: CongregacaoCreate,

    db: Session = Depends(get_db),

    usuario = Depends(
        verificar_permissao([1])
    )

):
    nova_congregacao = model.Congregacao(
        nome = dados.nome,
        cidade = dados.cidade
    )

    db.add(nova_congregacao)
    db.commit()
    db.refresh(nova_congregacao)

    return nova_congregacao


# EDITAR
@router.put(
    "/{id_congregacao}",
    response_model=CongregacaoResponse
)
def editar_congregacao(

    id_congregacao: int,
    dados: CongregacaoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(
        verificar_permissao([1])
    )

):
    congregacao = db.query(
        model.Congregacao
    ).filter(
        model.Congregacao.id_congregacao == id_congregacao
    ).first()

    if not congregacao:

        raise HTTPException(
            status_code=404,
            detail="Congregação não encontrada"
        )


    congregacao.nome = dados.nome
    congregacao.cidade = dados.cidade

    db.commit()
    db.refresh(congregacao)

    return congregacao

# DELETE
@router.delete("/{id_congregacao}")
def deletar_congregacao(

    id_congregacao: int,
    db: Session = Depends(get_db),
    usuario = Depends(
        verificar_permissao([1])
    )

):
    congregacao = db.query(
        model.Congregacao
    ).filter(
        model.Congregacao.id_congregacao == id_congregacao
    ).first()

    if not congregacao:

        raise HTTPException(
            status_code=404,
            detail="Congregação não encontrada"
        )

    db.delete(congregacao)

    db.commit()

    return {
        "mensagem":
        "Congregação removida"
    }