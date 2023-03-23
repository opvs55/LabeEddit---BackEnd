import { PostBusiness } from "../../src/Business/PostBusiness"
import { LikeOrDeslikePostInputDPO } from "../../src/Dto/usersPostsDTO";
import { BadRequestError } from "../../src/Errors/BadRequestError";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../Mocks/PostDataBaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"

describe("Testando LikeOrDislikesPost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
    );

    test("like", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mock",
            token: "token-mock-normal",
            like: true
        }
        const postWithCreatorDBMock = {
            id: "id-mock",
            context: "context-mock",
            likes: 0,
            dislikes: 0,
            created_at: "2022-01-01",
            updated_at: "2022-01-01",
            creator_id: "creatorId-mock",
            creator_name: "creatorName-mock",
        };

        const updatePostMock = {
            ...postWithCreatorDBMock,
            likes: 1
        }

        await postBusiness.likeOrDislikesPost(input)

        expect(updatePostMock.likes).toEqual(1);
    })

    test("dislike", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mock",
            token: "token-mock-normal",
            like: false
        }


        const postWithCreatorDBMock = {
            id: "id-mock",
            context: "context-mock",
            likes: 0,
            dislikes: 0,
            created_at: "2022-01-01",
            updated_at: "2022-01-01",
            creator_id: "creatorId-mock",
            creator_name: "creatorName-mock",
        };

        const updatePostMock = {
            ...postWithCreatorDBMock,
            dislikes: 1
        }
        await postBusiness.likeOrDislikesPost(input)

        expect(updatePostMock.dislikes).toEqual(1);
    })

    test("token ausente", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mock",
            token: undefined,
            like: true
        };
        await expect(postBusiness.likeOrDislikesPost(input)).rejects.toThrow(
            new BadRequestError("token ausente")
        );
    })

    test("token invalido", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mock",
            token: "token-mock-anormal",
            like: true
        };
        await expect(postBusiness.likeOrDislikesPost(input)).rejects.toThrow(
            new BadRequestError("token invalido")
        );
    })
    test("Id não encontrado", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mockz",
            token: "token-mock-normal",
            like: true
        };
        await expect(postBusiness.likeOrDislikesPost(input)).rejects.toThrow(
            new BadRequestError("Id não encontrado"));
    })
    test("like deve ser um boolean", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mock",
            token: "token-mock-normal",
            like: 0
        };
        await expect(postBusiness.likeOrDislikesPost(input)).rejects.toThrow(
            new BadRequestError("Like deve ser um boolean")
        );
    })
})