from pydantic import BaseModel      

class Login(BaseModel):

    login: str
    senha: str

class Token(BaseModel):

    access_token: str
    token_type: str