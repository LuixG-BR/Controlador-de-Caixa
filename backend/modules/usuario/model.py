from sqlalchemy import Column, Integer, String, Boolean, Text, ForeignKey
from sqlalchemy.orm import relationship

from database import Base

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
    
    lancamentos = relationship(
    "Lancamento",
    back_populates="usuario"
)