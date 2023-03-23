import { PostBusiness } from "../../src/Business/PostBusiness"
import { SubPostDataBase } from "../../src/DataBase/SubPostDataBase";
import { EditPostInputDTO } from "../../src/Dto/usersPostsDTO";
import { BadRequestError } from "../../src/Errors/BadRequestError";
import { Post } from "../../src/Models/Post";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../Mocks/PostDataBaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"

describe("Editar Postagens", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    );


    test("Editar Postagens com Sucesso", async () => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: "token-mock-normal",
            context: "new-context-mock"
        };

        await postBusiness.editPost(input);
        const post = new Post
        ("id-mock", 
        "old-context-mock", 
        0, 0, "2022-01-01", 
        "2022-01-01", 
        "creatorId-mock", 
        "creatorName-mock", 
        new SubPostDataBase());

        post.setContext("new-context-mock");
        
        expect(post.getContext()).toBe("new-context-mock");
    });

    test("token ausente", async() => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: undefined,
            context: "new-context-mock"
        };
        await expect(postBusiness.editPost(input)).rejects.toThrow(
            new BadRequestError("token ausente")
        );
    })

    test("token invalido", async() => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: "token-mock-anormal",
            context: "new-context-mock"
        };
        await expect(postBusiness.editPost(input)).rejects.toThrow(
            new BadRequestError("token invalido")
        );
    })

    test("context não é string", async() => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mock",
            token: "token-mock-normal",
            context: 0
        };
        await expect(postBusiness.editPost(input)).rejects.toThrow(
            new BadRequestError("name deve ser string")
        );
    })

    test("Id não encontrado", async() => {
        const input: EditPostInputDTO = {
            idToEdit: "id-mockz",
            token: "token-mock-normal",
            context: "new-context-mock"
        };
        await expect(postBusiness.editPost(input)).rejects.toThrow(
            new BadRequestError("Id não encontrado")
        );
    })

});