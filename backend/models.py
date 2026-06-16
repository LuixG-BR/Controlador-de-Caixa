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