import { SubPostbusiness } from "../../src/Business/SubPostBusiness"
import { GetsubPostInputDTO, GetSubPostOutputDTO } from "../../src/Dto/usersPostsDTO"
import { BadRequestError } from "../../src/Errors/BadRequestError"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { SubPostDatabaseMock } from "../Mocks/SubPostDataBaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"





describe("getPost", () => {
    const subPostBusiness =
        new SubPostbusiness(
            new SubPostDatabaseMock(),
            new IdGeneratorMock(),
            new TokenManagerMock(),
        );

    test("getSubPost retorna os posts com sucesso", async () => {
        const input: GetsubPostInputDTO = {
            id: "postId-mock",
            token: "token-mock-normal"
        };

        const output: GetSubPostOutputDTO = [
            {
                id: "id-mock",
                post_id: "postId-mock",
                context: "context-mock",
                likes: 0,
                dislikes: 0,
                created_at: expect.any(String),
                updated_at: expect.any(String),
                user_id: "userId-mock",
                creator_name: "name-mock"
            }
        ];

        const response = await subPostBusiness.getSubPost(input);
        console.log(response)
        expect(response).toEqual(output);
    });

    test("token ausente", async () => {
        const input: GetsubPostInputDTO = {
            id: "postId-mock",
            token: undefined
        };

        await expect(subPostBusiness.getSubPost(input)).rejects.toThrow(
            new BadRequestError("token ausente")
        );
    });

    test("token invalido", async () => {
        const input: GetsubPostInputDTO = {
            id: "postId-mock",
            token: "token-amock-normal"
        };

        await expect(subPostBusiness.getSubPost(input)).rejects.toThrow(
            new BadRequestError("token invalido")
        );
    });
});


describe("getSubPost", () => {
    const subPostDatabaseMock = new SubPostDatabaseMock();

    test("Deve retornar um array com os subposts", async () => {
        const subPosts = await subPostDatabaseMock.getSubPost();

        expect(subPosts).toHaveLength(2);
        expect(subPosts[0]).toEqual({
            id: "id-mock",
            post_id: "postId-mock",
            context: "context-mock",
            user_id: "userId-mock",
            likes: 0,
            dislikes: 0,
            created_at: expect.any(String),
            updated_at: expect.any(String),
            creator_name: "name-mock"
        });
        expect(subPosts[1]).toEqual({
            id: "id2-mock",
            post_id: "postId2-mock",
            context: "context2-mock",
            user_id: "userId2-mock",
            likes: 0,
            dislikes: 0,
            created_at: expect.any(String),
            updated_at: expect.any(String),
            creator_name: "name2-mock"
        });
    });
});

