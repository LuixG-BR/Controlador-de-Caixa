from datetime import date
from typing import Optional

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
from dependencies import usuario_logado

from modules.relatorio.schema import RelatorioResponse
from modules.relatorio.service import RelatorioService

router = APIRouter(
    prefix="/relatorios",
    tags=["Relatórios"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=RelatorioResponse)
def gerar_relatorio(

    tipo: Optional[str] = None,
    categoria: Optional[str] = None,
    descricao: Optional[str] = None,
    data_inicio: Optional[date] = None,
    data_fim: Optional[date] = None,
    id_congregacao: Optional[int] = None,

    db: Session = Depends(get_db),
    usuario=Depends(usuario_logado)
):
    return RelatorioService.gerar_relatorio(

        db=db,
        usuario=usuario,
        tipo=tipo,
        categoria=categoria,
        descricao=descricao,
        data_inicio=data_inicio,
        data_fim=data_fim,
        id_congregacao=id_congregacao
    )