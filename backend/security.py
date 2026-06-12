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