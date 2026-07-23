from fastapi import HTTPException
from sqlalchemy.orm import Session

from modules.usuario import model


class UsuarioService:

    @staticmethod
    def obter_usuario_logado(db: Session, usuario):

        usuario_db = (
            db.query(model.Usuario)
            .filter(
                model.Usuario.id_usuario == usuario["id_usuario"]
            )
            .first()
        )

        if not usuario_db:

            raise HTTPException(
                status_code=404,
                detail="Usuário não encontrado."
            )

        return {
            "id_usuario": usuario_db.id_usuario,
            "nome": usuario_db.nome,
            "login": usuario_db.login,
            "status": usuario_db.status,

            "id_perfil": usuario_db.id_perfil,
            "perfil": usuario_db.perfil.nome,

            "id_congregacao": usuario_db.id_congregacao,
            "congregacao": usuario_db.congregacao.nome
        }