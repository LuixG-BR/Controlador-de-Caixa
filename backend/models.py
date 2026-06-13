from sqlalchemy import Column, Integer, String, Boolean, Text, Date, Numeric, ForeignKey
from sqlalchemy.orm import relationship

from database import Base
from modules.usuario.model import Usuario
from modules.congregacao.model import Congregacao

class PerfilAcesso(Base):

    __tablename__ = "perfil_acesso"


    id_perfil = Column(
        Integer,
        primary_key=True,
        index=True
    )


    nome = Column(
        String(50),
        nullable=False
    )


    descricao = Column(
        Text
    )


    usuarios = relationship(
        "Usuario",
        back_populates="perfil"
    )

class Lancamento(Base):

    __tablename__ = "lancamento"


    id_lancamento = Column(
        Integer,
        primary_key=True,
        index=True
    )


    data = Column(
        Date
    )


    tipo = Column(
        String(10)
    )


    categoria = Column(
        String(100)
    )


    descricao = Column(
        Text
    )


    valor = Column(
        Numeric(10,2)
    )


    id_congregacao = Column(
        Integer,
        ForeignKey("congregacao.id_congregacao")
    )


    id_usuario = Column(
        Integer,
        ForeignKey("usuario.id_usuario")
    )