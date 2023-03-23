import { SubPostbusiness } from "../../src/Business/SubPostBusiness";
import { LikeOrDeslikePostInputDPO } from "../../src/Dto/usersPostsDTO";
import { BadRequestError } from "../../src/Errors/BadRequestError";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { SubPostDatabaseMock } from "../Mocks/SubPostDataBaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock"

describe("Testando LikeOrDislikesSubPost", () => {
    const subPostBusiness = new SubPostbusiness(
        new SubPostDatabaseMock(),
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

        await subPostBusiness.likeOrDislikesSubPost(input)

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
        await subPostBusiness.likeOrDislikesSubPost(input)

        expect(updatePostMock.dislikes).toEqual(1);
    })

    test("token ausente", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mock",
            token: undefined,
            like: true
        };
        await expect(subPostBusiness.likeOrDislikesSubPost(input)).rejects.toThrow(
            new BadRequestError("token ausente")
        );
    })

    test("token invalido", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mock",
            token: "token-mock-anormal",
            like: true
        };
        await expect(subPostBusiness.likeOrDislikesSubPost(input)).rejects.toThrow(
            new BadRequestError("token invalido")
        );
    })
    test("Id não encontrado", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mockz",
            token: "token-mock-normal",
            like: true
        };
        await expect(subPostBusiness.likeOrDislikesSubPost(input)).rejects.toThrow(
            new BadRequestError("Id não encontrado"));
    })
    test("like deve ser um boolean", async () => {
        const input: LikeOrDeslikePostInputDPO = {
            idToLikeOrDeslike: "id-mock",
            token: "token-mock-normal",
            like: 0
        };
        await expect(subPostBusiness.likeOrDislikesSubPost(input)).rejects.toThrow(
            new BadRequestError("Like deve ser um boolean")
        );
    })
})