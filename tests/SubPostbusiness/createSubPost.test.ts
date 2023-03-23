import { SubPostbusiness } from "../../src/Business/SubPostBusiness"
import { CreateSubPostInputDTO, GetsubPostInputDTO, GetSubPostOutputDTO } from "../../src/Dto/usersPostsDTO";
import { BadRequestError } from "../../src/Errors/BadRequestError";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { SubPostDatabaseMock } from "../Mocks/SubPostDataBaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock"

describe("createSubPost", () => {
    const subPostBusiness = new SubPostbusiness(
        new SubPostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    );

    test("criar Subpost com sucesso", async () => {
        const input: CreateSubPostInputDTO = {
            token: "token-mock-normal",
            context: "context-mock",
            postId: "postId-mock"
        };

        const inputToken: GetsubPostInputDTO = {
            id: "postId-mock",
            token: "token-mock-normal"
        };


        await subPostBusiness.createSubPost(input);
        
        
        const posts = await subPostBusiness.getSubPost(inputToken);

        const output: GetSubPostOutputDTO= [
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
            }];

        expect(posts).toHaveLength(1);
        expect(posts[0]).toMatchObject(output[0]);
    });
    
    test("token ausente", async() => {
        const input: CreateSubPostInputDTO = {
            token: undefined,
            context: "context-mock",
            postId: "postId-mock"
        }
        await expect(subPostBusiness.createSubPost(input)).rejects.toThrow(
            new BadRequestError("token ausente")
        );
    })
    test("Context Invalido", async() => {
        const input: CreateSubPostInputDTO = {
            token: "token-mock-normal",
            context: null,
            postId: "postId-mock"
        }
        await expect(subPostBusiness.createSubPost(input)).rejects.toThrow(
            new BadRequestError("Context deve ser string")
        );
    })
    test("Token Invalido", async() =>{
        const input: CreateSubPostInputDTO = {
            token: "token-mock-anormal",
            context: "context-mock",
            postId: "postId-mock"
        }
        await expect(subPostBusiness.createSubPost(input)).rejects.toThrow(
            new BadRequestError("token invalido")
        );
    })
    
});