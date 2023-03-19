
export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}
export interface TokenPayLoad {
    id: string,
    name: string,
    role: USER_ROLES
}

export interface UserDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: USER_ROLES,
    createdAt: string
}


export interface LikesDislikesDB {
    user_id: string,
    post_id: string,
    like: number
}

export interface PostDB {
    id: string,
    creator_id: string,
    context: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface SubPostDB{
    id:string,
    post_id:string,
    context:string,
    user_id:string,
    likes:number,
    dislikes:number,
    created_at: string,
    updated_at: string
}

export enum POST_LIKE {
    ALREADY_LIKED = "Already Liked",
    ALREADY_DISLIKED = "Already Disliked"
}


export interface PostWithCreatorNameDB extends PostDB {
    creator_name: string
}

export interface SubPostWithCreatorNameDB extends SubPostDB {
    creator_name: string
}


export interface PostModel {
    id: string,
    context: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: {
        id: string,
        name: string
    },
    subPosts?: SubPostDB[]



}


export interface SubPostModel {
    id: string,
    post_id:string,
    context: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    user_id: string
}




