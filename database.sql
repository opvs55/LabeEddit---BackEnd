-- Active: 1678652770854@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
    role TEXT NOT NULL,
	created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
("u001", "Samuel", "samuel@samuel.com", "dsadsadasdsa", "ADMIN"),
("u002", "jefferson", "jefferson@jefferso.com", "123421321", "NORMAL"),
("u003", "marcos", "marcos@marcos.com", "424244", "NORMAL");

SELECT * FROM users;



CREATE TABLE post (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    context TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE likes_dislikes (
    user_id text NOT NULL,
    post_id text NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY(post_id) REFERENCES post(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


CREATE TABLE subposts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    post_id TEXT NOT NULL,
    context TEXT NOT NULL,
    user_id TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY (post_id) REFERENCES post(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


SELECT * FROM subposts;


DROP TABLE subposts;
