import { PostDataBase } from "../Database/PostDatabase";
import { PostDB, PostModel, SubPostDB } from "../Interfaces/Types";





export class SubPost {
    constructor(
        private id: string,
        private postId: string,
        private context: string,
        private creatorId: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string
    ) { }

    public toSubPostModel(): SubPostDB {
        return {
            id: this.id,
            post_id: this.postId,
            context: this.context,
            user_id:this.creatorId,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}

export class Post {

    constructor(
        private id: string,
        private context: string,
        private likes: number,
        private dislikes: number,
        private createdAt: string,
        private updatedAt: string,
        private creatorId: string,
        private creatorName: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(value: string): void {
        this.id = value
    }

    public getContext(): string {
        return this.context
    }

    public setContext(value: string): void {
        this.context = value
    }

    public getLikes(): number {
        return this.likes
    }

    public setLikes(value: number): void {
        this.likes = value
    }

    public addLike() {
        this.likes += 1
    }

    public removeLike() {
        this.likes -= 1
    }

    public addDislikes() {
        this.dislikes += 1
    }

    public removeDislikes() {
        this.dislikes -= 1
    }

    public getDislikes(): number {
        return this.dislikes
    }

    public setDislikes(value: number): void {
        this.dislikes = value
    }

    public getCreatedAt(): string {
        return this.createdAt
    }

    public setCreatedAt(value: string): void {
        this.createdAt = value
    }

    public getUpdatedAt(): string {
        return this.updatedAt
    }

    public setUpdatedAt(value: string): void {
        this.updatedAt = value
    }

    public getCreatorId(): string {
        return this.creatorId
    }

    public setCreatorId(value: string): void {
        this.creatorId = value
    }

    public getCreatorName(): string {
        return this.creatorName
    }

    public setCreatorName(value: string): void {
        this.creatorName = value
    }

    public ToDBModel(): PostDB {
        return {
            id: this.id,
            creator_id: this.creatorId,
            context: this.context,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        }
    }


    public async toBusinessModel(): Promise<PostModel> {
        const subPosts = await PostDataBase.getSubPostByPostId(this.id);
        return {
            id: this.id,
            context: this.context,
            likes: this.likes,
            dislikes: this.dislikes,
            created_at: this.createdAt,
            updated_at: this.updatedAt,
            creator: {
                id: this.creatorId,
                name: this.creatorName
            },
            subPosts
        };
    }
}
