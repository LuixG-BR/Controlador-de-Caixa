from pydantic import BaseModel
from datetime import date
from decimal import Decimal

class LancamentoCreate(BaseModel):

    tipo: str
    categoria: str
    descricao: str | None = None
    valor: Decimal
    data: date
    id_congregacao: int


class LancamentoResponse(BaseModel):

    id_lancamento: int
    tipo: str
    categoria: str
    descricao: str | None
    valor: Decimal
    data: date
    id_usuario: int
    id_congregacao: int

    class Config:

        from_attributes = True