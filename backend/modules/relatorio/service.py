from decimal import Decimal
from datetime import date
from typing import Optional

from sqlalchemy.orm import Session

from modules.lancamento import model

from modules.relatorio.schema import (
    RelatorioResponse,
    RelatorioLancamentoResponse,
    ResumoRelatorioResponse
)


class RelatorioService:

    @staticmethod
    def gerar_relatorio(
        db: Session,
        usuario,
        tipo: Optional[str] = None,
        categoria: Optional[str] = None,
        descricao: Optional[str] = None,
        data_inicio: Optional[date] = None,
        data_fim: Optional[date] = None,
        id_congregacao: Optional[int] = None
    ) -> RelatorioResponse:
    
        query = db.query(model.Lancamento)

        if usuario["id_perfil"] == 1:

            if id_congregacao is not None:
                query = query.filter(
                    model.Lancamento.id_congregacao ==
                    id_congregacao
                )

        else:
            query = query.filter(
                model.Lancamento.id_congregacao ==
                usuario["id_congregacao"]
            )

        if tipo:
            query = query.filter(
                model.Lancamento.tipo == tipo
            )

        if categoria:
            query = query.filter(
                model.Lancamento.categoria == categoria
            )

        if descricao:
            query = query.filter(
                model.Lancamento.descricao.ilike(
                    f"%{descricao}%"
                )
            )

        if data_inicio:
            query = query.filter(
                model.Lancamento.data >= data_inicio
            )

        if data_fim:
            query = query.filter(
                model.Lancamento.data <= data_fim
            )

        query = query.order_by(
            model.Lancamento.data.desc()
        )

        lancamentos_db = query.all()

        creditos = Decimal("0")
        debitos = Decimal("0")

        lista = []

        for item in lancamentos_db:

            if item.tipo == "credito":
                creditos += item.valor
            else:
                debitos += item.valor

            lista.append(
                RelatorioLancamentoResponse(
                    data=item.data,
                    tipo=item.tipo,
                    categoria=item.categoria,
                    descricao=item.descricao,
                    valor=item.valor
                )
            )

        resumo = ResumoRelatorioResponse(
            creditos=creditos,
            debitos=debitos,
            saldo=creditos - debitos,
            quantidade=len(lista)
        )

        return RelatorioResponse(
            resumo=resumo,
            lancamentos=lista
        )