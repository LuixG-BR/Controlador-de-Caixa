from pydantic import BaseModel


class CongregacaoCreate(BaseModel):

    nome: str

    cidade: str | None = None



class CongregacaoResponse(BaseModel):

    id_congregacao: int

    nome: str

    cidade: str | None

    status: bool


    class Config:

        from_attributes = True



class CongregacaoStatus(BaseModel):

    status: bool