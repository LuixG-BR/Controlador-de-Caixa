from sqlalchemy import (Column, Integer, String, Numeric, Date, ForeignKey)
from sqlalchemy.orm import relationship
from database import Base

class Lancamento(Base):

    __tablename__ = "lancamento"


    id_lancamento = Column(
        Integer,
        primary_key=True,
        index=True
    )

    tipo = Column(
        String(20),
        nullable=False
    )
    # entrada / saida

    categoria = Column(
        String(100),
        nullable=False
    )
    # oferta / dizimo / concessionaria / tarifa bancaria

    descricao = Column(
        String(255),
        nullable=True
    )

    valor = Column(
        Numeric(10,2),
        nullable=False
    )

    data = Column(
        Date,
        nullable=False
    )

    id_usuario = Column(
        Integer,
        ForeignKey("usuario.id_usuario"),
        nullable=False
    )

    id_congregacao = Column(
        Integer,
        ForeignKey("congregacao.id_congregacao"),
        nullable=False
    )

    usuario = relationship(
        "Usuario",
        back_populates="lancamentos"
    )

    congregacao = relationship(
        "Congregacao",
        back_populates="lancamentos"
    )