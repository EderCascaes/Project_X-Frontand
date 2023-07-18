export interface Person {
    id?  :number
    nome    : string
    email : string
    telefone : string
    dataNascimento   : string
    cpf : string
    funcao  : string
}


export interface Fisioterapeuta {
    CREFITO : string    
}




export interface Endereco {
    Cidade : string
    Estado : string
    Logradouro : string
    Numero : number
    Complemento : string
    Cep : string
}