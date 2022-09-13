#
|Method	|URL			|Auth	|Corresponding File	| Expected Errors	|User Data		| Response													|
|-------|-----------------------|-------|-----------------------|-----------------------|-----------------------|---------------------------------------------------------------------------------------------------------------|
|GET	|/api/auth/login	|FALSE	|/api/auth/login.jsx	|406			|email <br/> password	|{<br/>&nbsp;&nbsp;success: true,<br/>&nbsp;&nbsp;message: 'successfully logged in'<br/>}			|








&nbsp;

### Database Schema
|enum PostTypes |
|---------------|
|TWEET          |
|RETWEET        |
|MEDIA          |
|REPLY          |


|enum ActionTypes |
|-----------------|
|LIKE             |
|BOOKMARK         |
|FOLLOW           |


#### model User
|Field          |Type           |Atrribute                  |
|---------------|---------------|---------------------------|
|id             |String         |@unique @default(uuid())   |
|userName       |String?        |                           |
|name           |String         |                           |
|email          |String         |                           |
|passwordHash   |String         |                           |
|salt           |String         |                           |
|bio            |String?        |@db.VarChar(280)           |
|avatarImg      |String?        |                           |
|headerImg      |String?        |                           |
|location       |String?        |                           |
|website        |String?        |                           |
|dateOfBirth    |DateTime       |                           |
|joinDate       |DateTime       |@default(now())            |
|posts          |Post[]         |                           |
|interactions   |Interaction[]  |                           |
|notifications  |Notification[] |                           |


#### model Post
|Field          |Type           |Attribute                                      |
|---------------|---------------|-----------------------------------------------|
|id             |Int            |@id @default(autoincrement())                  |
|userId         |String         |                                               |
|postId         |Int?           |                                               |
|content        |String?        |@db.VarChar(280)                               |
|mediaUrl       |String?        |                                               |
|date           |DateTime       |@default(now())                                |
|editDate       |DateTime?      |                                               |
|postType       |PostTypes      |                                               |
|interactions   |Interaction[]  |                                               |
|user           |User           |@relation(fields: [userId], references: [id])  |

#### model Interaction
|Field            |Type           |Attribute                                      |
|-----------------|---------------|-----------------------------------------------|
|id               |Int            |@id @default(autoincrement())                  |
|postId           |Int?           |                                               |
|userId           |String         |                                               |
|followingUserId  |String?        |                                               |
|date             |DateTime       |@default(now())                                |
|actionType       |ActionTypes    |                                               |
|user             |User           |@relation(fields: [userId], references: [id])  |
|post             |Post           |@relation(fields: [postId], references: [id])  |


#### model Notification
|Field        |Type           |Attribute                                      |
|-------------|---------------|-----------------------------------------------|
|id           |Int            |@id @default(autoincrement())                  |
|userId       |String         |                                               |
|content      |String         |                                               |
|sendDate     |DateTime       |@default(now())                                |
|readDate     |DateTime?      |                                               |
|received     |Boolean        |@default(false)                                |
|user         |User           |@relation(fields: [userId], references: [id])  |