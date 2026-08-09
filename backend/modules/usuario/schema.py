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
        
class UsuarioListResponse(BaseModel):

    id_usuario: int
    nome: str
    login: str
    status: bool

    id_perfil: int
    perfil: str

    id_congregacao: int
    congregacao: str

    class Config:
        from_attributes = True
        
class UsuarioStatus(BaseModel):

    status: bool
    
class UsuarioMeResponse(BaseModel):

    id_usuario: int
    nome: str
    login: str
    status: bool

    id_perfil: int
    perfil: str

    id_congregacao: int
    congregacao: str

    class Config:
        from_attributes = True