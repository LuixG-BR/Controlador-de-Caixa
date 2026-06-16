from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import SessionLocal
from modules.congregacao import model
from modules.congregacao.schema import (CongregacaoCreate, CongregacaoResponse, CongregacaoStatus)
from dependencies import verificar_permissao

router = APIRouter(prefix="/congregacao", tags=["Congregação"])

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# LISTAR
@router.get("/", response_model=list[CongregacaoResponse])
def listar(db: Session = Depends(get_db)):
    
    return db.query(
        model.Congregacao
    ).all()

# CRIAR
@router.post("/", response_model=CongregacaoResponse)
def criar(
    dados: CongregacaoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(verificar_permissao([1]))):

    nova = model.Congregacao(
        nome=dados.nome,
        cidade=dados.cidade
    )

    db.add(nova)
    db.commit()
    db.refresh(nova)

    return nova

# EDITAR DADOS
@router.put("/{id_congregacao}", response_model=CongregacaoResponse)
def editar(
    id_congregacao:int,
    dados: CongregacaoCreate,
    db: Session = Depends(get_db),

    usuario = Depends(verificar_permissao([1]))):

    congregacao = db.query(
        model.Congregacao
    ).filter(
        model.Congregacao.id_congregacao == id_congregacao
    ).first()

    if not congregacao:

        raise HTTPException(
            404,
            "Congregação não encontrada"
        )

    congregacao.nome = dados.nome

    congregacao.cidade = dados.cidade

    db.commit()
    db.refresh(congregacao)

    return congregacao


# ALTERAR STATUS
@router.patch("/{id_congregacao}/status", response_model=CongregacaoResponse)
def alterar_status(

    id_congregacao:int,
    dados: CongregacaoStatus,
    db: Session = Depends(get_db),

    usuario = Depends(verificar_permissao([1]))):

    congregacao = db.query(
        model.Congregacao
    ).filter(
        model.Congregacao.id_congregacao == id_congregacao
    ).first()

    if not congregacao:

        raise HTTPException(
            404,
            "Congregação não encontrada"
        )

    congregacao.status = dados.status

    db.commit()
    db.refresh(congregacao)

    return congregacao