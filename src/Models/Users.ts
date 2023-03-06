import { UserDB, UserModel, USER_ROLES } from "../interfaces/types"




/*2ª parte da implementação */
//Os seis parâmetros do construtor são definidos como variáveis ​​privadas, 
//o que significa que elas só podem ser acessadas de dentro da própria classe.
//Cada uma dessas variáveis ​​representa um atributo da classe "Users"

export class Users {    
    constructor(
        private id: string,
        private name:string,
        private email:string,
        private password:string,
        private role: USER_ROLES,
        private createdAt:string
    ) {}



    /*O método getId() é um getter que retorna o valor atual do atributo "id". Como o método é público, 
    qualquer outra classe pode chamar esse método para obter o valor do "id" */
    public getId(): string {
        return this.id
    }

    /*O método setId(value: string) é um setter que define um novo valor para o atributo "id". 
    Como o método é público, qualquer outra classe pode chamar esse método para atualizar o valor do 
    "id". O novo valor é passado como parâmetro para o método e atribuído ao atributo "id" usando a 
    palavra-chave "this". */
    
    public setId(value: string): void {
        this.id = value
    }

    public getName(): string {
        return this.name
    }

    public setName(value: string): void {
        this.name = value
    }

    public getEmail(): string {
        return this.email
    }
    
    public setEmail(value: string): void {
        this.email = value
    }

    public getPassword(): string {
        return this.password
    }
    
    public setPassword(value: string): void {
        this.password = value
    }

    public getRole(): USER_ROLES {
        return this.role
    }
    
    public setRole(value: USER_ROLES ): void {
        this.role = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }
    
    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

//metódos que convertem valores

    public toDBModel(): UserDB{
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    }


    public ToBusinessModel(): UserModel{
        return{
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt
        }
    }



}