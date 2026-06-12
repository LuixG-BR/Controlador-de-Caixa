from pydantic import BaseModel

class UsuarioCreate(BaseModel):

    nome: str
    login: str
    senha: str
    id_perfil: int
    id_congregacao: int

class UsuarioResponse(BaseModel):

    id_usuario: int
    nome: str
    login: str
    status: bool
    id_perfil: int
    id_congregacao: int


    class Config:
        from_attributes = True
        

class Login(BaseModel):

    login: str
    senha: str

class Token(BaseModel):

    access_token: str
    token_type: str