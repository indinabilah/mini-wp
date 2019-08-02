# mini-wp 🐼

[![standard-readme compliant](https://img.shields.io/badge/Link%20deploy-MiniWP-brightgreen.svg?style=flat-square)](https://miniwp.indinabilah.me)


### List of basic routes

`baseUrl` :

```
http://localhost:3000
```

### User

| Router | HTTP | Header | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| /users | GET | none | none | get all users |
| /users | POST | none | username:STRING, email:STRING(valid email), password:STRING | register user |
| /users/login | POST | none | email:STRING, password:STRING | user login |

### Article

| Router | HTTP | Header | Body | Description |
| ------ | ---- | ------ | ---- | ----------- |
| /articles | GET | none | none | get all articles |
| /articles | POST | token | title:STRING, subtitle:STRING, description:STRING, image:STRING | register user |
| /articles/:id | GET | token | none | my article |
| /articles/up/:id | GET | token | none | my article |
| /articles/:id | PATCH | token | title:STRING, subtitle:STRING, description:STRING, image:STRING | update data article |
| /articles/:id | DELETE | token | none | delete an article