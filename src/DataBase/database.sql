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


