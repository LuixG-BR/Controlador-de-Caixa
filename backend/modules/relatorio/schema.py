from datetime import date
from decimal import Decimal

from pydantic import BaseModel


class ResumoRelatorioResponse(BaseModel):
    creditos: Decimal
    debitos: Decimal
    saldo: Decimal
    quantidade: int

class RelatorioLancamentoResponse(BaseModel):

    data: date
    tipo: str
    categoria: str
    descricao: str | None = None
    valor: Decimal

class RelatorioResponse(BaseModel):

    resumo: ResumoRelatorioResponse
    lancamentos: list[RelatorioLancamentoResponse]