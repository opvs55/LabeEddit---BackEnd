import { PostBusiness } from "../../src/Business/PostBusiness"
import { GetPostInputDTO, GetPostOutputDTO } from "../../src/Dto/usersPostsDTO"
import { BadRequestError } from "../../src/Errors/BadRequestError"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { PostDatabaseMock } from "../Mocks/PostDataBaseMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"





describe("getPost", () => {
    const postBusiness = 
        new PostBusiness(
            new PostDatabaseMock(),
            new IdGeneratorMock(),
            new TokenManagerMock(),
    );

    test("getPost retorna os posts com sucesso", async () => {
        const input: GetPostInputDTO = {
            token: "token-mock-normal",
        };

        const output: GetPostOutputDTO = [
            {
                id: "id-mock",
                context: "context-mock",
                likes: 0,
                dislikes: 0,
                subPosts:[],
                created_at: expect.any(String),
                updated_at: expect.any(String),
                creator:{
                    id: "creatorId-mock",
                    name: "name-mock",
                    
                }  
            },{
                id: "id2-mock",
                context: "context2-mock",
                likes: 0,
                dislikes: 0,
                subPosts:[],
                created_at: expect.any(String),
                updated_at: expect.any(String),
                creator:{
                    id: "creatorId2-mock",
                    name: "name2-mock",
                }  
            }
        ];

        const response = await postBusiness.getPost(input);

        expect(response).toEqual(output);
    });

    test("token ausente", async () => {
        const input: GetPostInputDTO = {
            token: "",
        };

        await expect(postBusiness.getPost(input)).rejects.toThrow(
            new BadRequestError("token ausente")
        );
    });

    test("token invalido", async () => {
        const input: GetPostInputDTO = {
            token: "token invalido",
        };

        await expect(postBusiness.getPost(input)).rejects.toThrow(
            new BadRequestError("token invalido")
        );
    });
});
