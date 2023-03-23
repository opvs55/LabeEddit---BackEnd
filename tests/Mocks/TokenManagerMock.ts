import { TokenPayLoad, USER_ROLES } from "../../src/Interfaces/Types"

export class TokenManagerMock {

    public createToken = (payload: TokenPayLoad): string => {
        if (payload.role == USER_ROLES.NORMAL) {
            return "token-mock-normal"
        } else {
            return "token-mock-admin"
        }
    }

    public getPayload = (token: string): TokenPayLoad | null => {
        if (token == "token-mock-normal") {
            return {
                id: "id-mock",
                name: "name-mock",
                role: USER_ROLES.NORMAL
            }
            
        } else if (token == "token-mock-admin") {
            return {
                id: "id-mock",
                name: "name-mock",
                role: USER_ROLES.ADMIN
            }

        } else {
            return null
        }
    }
}