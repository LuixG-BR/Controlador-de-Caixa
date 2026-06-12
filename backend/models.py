from sqlalchemy import Column, Integer, String, Boolean, Text, Date, Numeric, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


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



class Congregacao(Base):

    __tablename__ = "congregacao"


    id_congregacao = Column(
        Integer,
        primary_key=True,
        index=True
    )


    nome = Column(
        String(100),
        nullable=False
    )


    cidade = Column(
        String(100)
    )


    status = Column(
        Boolean,
        default=True
    )


    usuarios = relationship(
        "Usuario",
        back_populates="congregacao"
    )



class Usuario(Base):

    __tablename__ = "usuario"


    id_usuario = Column(
        Integer,
        primary_key=True,
        index=True
    )


    nome = Column(
        String(100),
        nullable=False
    )


    login = Column(
        String(100),
        unique=True,
        nullable=False
    )


    senha = Column(
        Text,
        nullable=False
    )


    status = Column(
        Boolean,
        default=True
    )


    id_perfil = Column(
        Integer,
        ForeignKey("perfil_acesso.id_perfil"),
        nullable=False
    )


    id_congregacao = Column(
        Integer,
        ForeignKey("congregacao.id_congregacao"),
        nullable=False
    )


    perfil = relationship(
        "PerfilAcesso",
        back_populates="usuarios"
    )


    congregacao = relationship(
        "Congregacao",
        back_populates="usuarios"
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