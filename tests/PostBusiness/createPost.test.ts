import { PostBusiness } from "../../src/Business/PostBusiness"
import { CreatePostInputDTO, GetPostInputDTO, GetPostOutputDTO } from "../../src/Dto/usersPostsDTO";
import { BadRequestError } from "../../src/Errors/BadRequestError";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../Mocks/PostDataBaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"

describe("createPost", () => {
    const postBusiness = new PostBusiness(
        new PostDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock()
    );

    test("criar post com sucesso", async () => {
        const input: CreatePostInputDTO = {
            token: "token-mock-normal",
            context: "context-mock",
        };

        const inputToken: GetPostInputDTO = {
            token: "token-mock-normal",
        };


        await postBusiness.createPost(input);
        
        
        const posts = await postBusiness.getPost(inputToken);

        const output: GetPostOutputDTO = [
            {
                context: "context-mock",
                created_at: expect.any(String),
                creator:{
                    id: "creatorId-mock",
                    name: "name-mock",
                    
                },
                dislikes: 0,
                id: "id-mock",  
                likes: 0,
                subPosts:[],
                updated_at: expect.any(String),  
            }];

        expect(posts).toHaveLength(2);
        expect(posts[0]).toMatchObject(output[0]);
    });
    
    test("token ausente", async() => {
        const input: CreatePostInputDTO ={
            token: undefined,
            context: "context-mock",
        }
        await expect(postBusiness.createPost(input)).rejects.toThrow(
            new BadRequestError("token ausente")
        );
    })
    test("Context Invalido", async() => {
        const input: CreatePostInputDTO ={
            token: "token-mock-normal",
            context: 0
        }
        await expect(postBusiness.createPost(input)).rejects.toThrow(
            new BadRequestError("Context deve ser string")
        );
    })
    test("Token Invalido", async() =>{
        const input: CreatePostInputDTO = {
            token: "token-mock-anormal",
            context: "context-mock"
        }
        await expect(postBusiness.createPost(input)).rejects.toThrow(
            new BadRequestError("token invalido")
        );
    })
    
});