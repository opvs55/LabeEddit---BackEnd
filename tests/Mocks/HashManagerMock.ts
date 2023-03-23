export class HashManagerMock{
    public hash = async (plaintext: string): Promise<string> => {
        if(plaintext = "senhaMock"){
            return "hash-senhaMock"
        }

        return "hash-mock"
    }

    public compare = async(plaintext: string, hash: string): Promise<boolean> =>{
        if(plaintext === "senhaMock" && hash === "hash-senhaMock"){
            return true
        }
        return false
    }
}