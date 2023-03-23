import { BaseDatabase } from "../../src/database/BaseDatabase"
import { LikesDislikesDB, PostDB, PostWithCreatorNameDB, POST_LIKE} from "../../src/Interfaces/Types"

export class PostDatabaseMock extends BaseDatabase {
    public static TABLE_POST = "post"

    public getPostWithCreatorName = async (): Promise<PostWithCreatorNameDB[]>=> {
        return[
            {
                id: "id-mock",
                creator_id: "creatorId-mock",
                context: "context-mock",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "name-mock"
            },{
                id: "id2-mock",
                creator_id: "creatorId2-mock",
                context: "context2-mock",
                likes: 0,
                dislikes: 0,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                creator_name: "name2-mock"
            }
        ]
    }

    public insert = async (postDB: PostDB): Promise<void> => {
        
    }


    public findByID = async (id: string): Promise<PostDB | undefined>  => {
        switch (id) {
            case "id-mock":
                return {
                    id: "id-mock",
                    creator_id: "creatorId-mock",
                    context: "context-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            case "id2-mock":
                return {
                    id: "id2-mock",
                    creator_id: "creatorId2-mock",
                    context: "context2-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                }
            default:
                return undefined
        }
    }

    public update = async (id: string, postDB: PostDB): Promise<void> => {
    } 

    public delete = async (id: string): Promise<void> => {
    }

    public findPostById = async (postId: string): Promise<PostWithCreatorNameDB | undefined> => {
        switch (postId) {
            case "id-mock":
                return {
                    id: "id-mock",
                    creator_id: "creatorId-mock",
                    context: "context-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_name: "name-mock"
                }
            case "id2-mock":
                return {
                    id: "id2-mock",
                    creator_id: "creatorId2-mock",
                    context: "context2-mock",
                    likes: 0,
                    dislikes: 0,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    creator_name: "name2-mock"
                }
            default:
                return undefined
        }
    }

    public likeOrDislikePost = async (likeDislike: LikesDislikesDB): Promise<void> => {
    }

    public findlikeDislikePost = async (likeDislikeDBToFind: LikesDislikesDB): Promise<POST_LIKE | null> => {
        return (POST_LIKE.ALREADY_LIKED)
    }

    public updateLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
    }

    public removeLikeDislike = async (
        likeDislikeDB: LikesDislikesDB
    ): Promise<void> => {
    }

}
