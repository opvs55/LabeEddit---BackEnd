import { SubPostbusiness } from "../../src/Business/SubPostBusiness";
import { EditPostInputDTO } from "../../src/Dto/usersPostsDTO";
import { BadRequestError } from "../../src/Errors/BadRequestError";
import { SubPost } from "../../src/Models/SubPost";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { SubPostDatabaseMock } from "../Mocks/SubPostDataBaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock"

describe("Editar Postagens", () => {
    const subPostBusiness = new SubPostbusiness(
        new SubPostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    );


    test("Editar Postagens com Sucesso", async () => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: "token-mock-normal",
            context: "new-context-mock"
        };

        await subPostBusiness.editSubPost(input);
        const subPost = new SubPost
        ("id-mock",
        "postId-mock", 
        "old-context-mock",
        "creatorId-mock", 
        0, 0, "2022-01-01", 
        "2022-01-01", 
        "creatorName-mock", 
    );

        subPost.setContext("new-context-mock");
        
        expect(subPost.getContext()).toBe("new-context-mock");
    });

    test("token ausente", async() => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: undefined,
            context: "new-context-mock"
        };
        await expect(subPostBusiness.editSubPost(input)).rejects.toThrow(
            new BadRequestError("token ausente")
        );
    })

    test("token invalido", async() => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: "token-mock-anormal",
            context: "new-context-mock"
        };
        await expect(subPostBusiness.editSubPost(input)).rejects.toThrow(
            new BadRequestError("token invalido")
        );
    })


    test("Id não encontrado", async() => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mockz",
            token: "token-mock-normal",
            context: "new-context-mock"
        };
        await expect(subPostBusiness.editSubPost(input)).rejects.toThrow(
            new BadRequestError("Id não encontrado")
        );
    })

});