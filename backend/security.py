from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta


SECRET_KEY = "controlador-caixa-chave-secreta"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def criar_hash_senha(senha):

    return pwd_context.hash(senha)

def verificar_senha(
    senha_digitada,
    senha_hash
):

    return pwd_context.verify(
        senha_digitada,
        senha_hash
    )

def criar_token(dados):

    dados_token = dados.copy()

    expiracao = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    dados_token.update(
        {
            "exp": expiracao
        }
    )

    token = jwt.encode(
        dados_token,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token

def verificar_token(token: str):

    credenciais_invalidas = HTTPException(
        status_code=401,
        detail="Token inválido ou expirado."
    )
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        id_usuario = payload.get("id_usuario")
        id_perfil = payload.get("id_perfil")

        if id_usuario is None:
            raise credenciais_invalidas

        return {
            "id_usuario": id_usuario,
            "id_perfil": id_perfil
        }

    except JWTError:
        raise credenciais_invalidas