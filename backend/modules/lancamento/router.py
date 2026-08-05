from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from datetime import date
from typing import Optional
from fastapi import Query

from database import SessionLocal
from modules.lancamento import model
from modules.lancamento.schema import (LancamentoCreate, LancamentoResponse)
from dependencies import (usuario_logado,verificar_permissao)

from typing import Optional

router = APIRouter(
    prefix="/lancamentos",
    tags=["Lançamentos"]
)

def get_db():

    db = SessionLocal()

    try:

        yield db

    finally:

        db.close()

# LISTAR
@router.get("/", response_model=list[LancamentoResponse])
def listar_lancamentos(

    tipo: Optional[str] = None,
    categoria: Optional[str] = None,
    descricao: Optional[str] = None,
    data_inicio: Optional[date] = None,
    data_fim: Optional[date] = None,
    ordenar: Optional[str] = None,
    id_congregacao: Optional[int] = None,

    db: Session = Depends(get_db),
    usuario = Depends(usuario_logado)
):
    query = db.query(model.Lancamento)

    if usuario["id_perfil"] == 1:
        
        if id_congregacao is not None:
            query = query.filter(
            model.Lancamento.id_congregacao == id_congregacao
        )

    else:
        query = query.filter(
        model.Lancamento.id_congregacao == usuario["id_congregacao"]
    )

    if tipo:
        query = query.filter(model.Lancamento.tipo == tipo)
        
    if categoria:
        query = query.filter(model.Lancamento.categoria == categoria)

    if descricao:
        query = query.filter(model.Lancamento.descricao.ilike(f"%{descricao}%"))
    
    if data_inicio:
        query = query.filter(model.Lancamento.data >= data_inicio)

    if data_fim:
        query = query.filter(model.Lancamento.data <= data_fim)
        
    if ordenar == "data_desc":
        query = query.order_by(model.Lancamento.data.desc())

    elif ordenar == "data_asc":
        query = query.order_by(model.Lancamento.data.asc())

    elif ordenar == "valor_desc":
        query = query.order_by(model.Lancamento.valor.desc())

    elif ordenar == "valor_asc":
        query = query.order_by(model.Lancamento.valor.asc())

    elif ordenar == "categoria_asc":
        query = query.order_by(model.Lancamento.categoria.asc())

    elif ordenar == "categoria_desc":
        query = query.order_by(model.Lancamento.categoria.desc())
    
    return query.all()


# CRIAR
@router.post("/", response_model=LancamentoResponse)
def criar_lancamento(
    dados: LancamentoCreate,
    db: Session = Depends(get_db),
    usuario = Depends(verificar_permissao([1,2]))):

    novo = model.Lancamento(

        tipo=dados.tipo,
        categoria=dados.categoria,
        descricao=dados.descricao,
        valor=dados.valor,
        data=dados.data,
        id_congregacao=usuario["id_congregacao"],
        id_usuario=usuario["id_usuario"]
)
    
    db.add(novo)
    db.commit()
    db.refresh(novo)
    
    return novo

# EDITAR
@router.put("/{id_lancamento}",response_model=LancamentoResponse)
def editar_lancamento(

    id_lancamento:int,
    dados:LancamentoCreate,
    db:Session = Depends(get_db),
    usuario = Depends(usuario_logado)):
    
    if usuario["id_perfil"] != 1:
        lancamento = db.query(
        model.Lancamento
        ).filter(
        model.Lancamento.id_lancamento == id_lancamento,
        model.Lancamento.id_congregacao == usuario["id_congregacao"]
        ).first()
        
    else:
        lancamento = db.query(
        model.Lancamento
        ).filter(
        model.Lancamento.id_lancamento == id_lancamento
        ).first()

    if not lancamento:

        raise HTTPException(
            404,
            "Lançamento não encontrado"
        )

    lancamento.tipo = dados.tipo
    lancamento.categoria = dados.categoria
    lancamento.descricao = dados.descricao
    lancamento.valor = dados.valor
    lancamento.data = dados.data

    db.commit()
    db.refresh(lancamento)

    return lancamento

# EXCLUIR (vamos manter protegido)
# somente administrador

@router.delete("/{id_lancamento}")
def deletar_lancamento(
    id_lancamento:int,
    db:Session = Depends(get_db),

    usuario = Depends(usuario_logado)):
    
    if usuario["id_perfil"] != 1:
        lancamento = db.query(
        model.Lancamento
        ).filter(
        model.Lancamento.id_lancamento == id_lancamento,
        model.Lancamento.id_congregacao == usuario["id_congregacao"]
        ).first()
        
    else:
        lancamento = db.query(
        model.Lancamento
        ).filter(
        model.Lancamento.id_lancamento == id_lancamento
        ).first()

    if not lancamento:

        raise HTTPException(
            404,
            "Lançamento não encontrado"
        )

    db.delete(lancamento)
    db.commit()

    return {
        "mensagem":
        "Lançamento removido"
    }