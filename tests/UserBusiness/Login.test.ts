import { HashManagerMock } from "../Mocks/HashManagerMock"
import { IdGeneratorMock } from "../Mocks/IdGeneratorMock"
import { TokenManagerMock } from "../Mocks/TokenManagerMock" 
import { UserDatabaseMock } from "../Mocks/UserDataBaseMock"
import {UsersBusiness} from "../../src/Business/UserBusiness"
import { LoginInputDTO } from "../../src/Dto/usersPostsDTO"


describe("login", () => {
    const userBusiness = new UsersBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    test("login bem sucedido em conta normal", async () =>{
        const input:LoginInputDTO = {
            email:"normal@email.com",
            password: "senhaMock"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-normal")
    })

    test("login bem-sucedido em conta admin retorna token", async () =>{
        const input: LoginInputDTO = {
            email: "admin@email.com",
            password: "senhaMock"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-admin")
    })
})