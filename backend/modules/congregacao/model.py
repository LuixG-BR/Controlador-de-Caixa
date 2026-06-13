from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship

from database import Base


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
        String(100),
        nullable=True
    )


    status = Column(
        Boolean,
        default=True
    )


    usuarios = relationship(
        "Usuario",
        back_populates="congregacao"
    )