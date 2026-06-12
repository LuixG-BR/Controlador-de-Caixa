from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError

from security import SECRET_KEY, ALGORITHM


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login"
)



def usuario_logado(
    token: str = Depends(oauth2_scheme)
):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )


        usuario = payload.get("sub")


        if usuario is None:

            raise HTTPException(
                status_code=401,
                detail="Token inválido"
            )


        return payload


    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )
        
def verificar_permissao(perfis_permitidos: list[int]):

    def permissao(
        usuario = Depends(usuario_logado)
    ):

        id_perfil = usuario.get("id_perfil")


        if id_perfil not in perfis_permitidos:

            raise HTTPException(
                status_code=403,
                detail="Sem permissão para acessar este recurso"
            )

        return usuario

    return permissao