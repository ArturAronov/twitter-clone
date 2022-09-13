#
|Method	|URL                    |Auth	  |Corresponding File	        |Expected Errors  |User Data                                                                                                                                        | Response                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|-------|-----------------------|-------|---------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|GET	  |/api/auth/login	      |FALSE  |/api/auth/login.jsx	      |406              |email <br/> password	                                                                                                                            |{<br/>&nbsp;&nbsp;success:&nbsp;true,<br/>&nbsp;&nbsp;message:&nbsp;'successfully&nbsp;logged&nbsp;in'<br/>}                                                                                                                                                                                                                                                                                                                                               |
|POST	  |/api/auth/signup	      |FALSE  |/api/auth/signup.jsx	      |406              |name <br/> email <br/> dateOfBirth <br/> password <br/> passwordConfirmation                                                                     |{<br/>&nbsp;&nbsp;success:&nbsp;true,<br/>&nbsp;&nbsp;message:&nbsp;'created&nbsp;new&nbsp;user'<br/>}                                                                                                                                                                                                                                                                                                                                                     |
|DELETE |/api/auth/logout       |TRUE   |/api/auth/logout.jsx       |406              |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;success:&nbsp;true,<br/>&nbsp;&nbsp;message:&nbsp;'successfully&nbsp;logged&nbsp;out'<br/>}                                                                                                                                                                                                                                                                                                                                              |
|       |                       |       |                           |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|GET    |/api/my/profile        |TRUE   |/api/my/profile/index.jsx  |401, 406         |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"id":&nbsp;String,<br/>&nbsp;&nbsp;"userName":&nbsp;String<br/>&nbsp;&nbsp;"name":&nbsp;String,<br/>&nbsp;&nbsp;"email":&nbsp;String<br/>&nbsp;&nbsp;"bio":&nbsp;String,<br/>&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/>&nbsp;&nbsp;"headerImg":&nbsp;String,<br/>&nbsp;&nbsp;"location":&nbsp;String,<br/>&nbsp;&nbsp;"website":&nbsp;String,<br/>&nbsp;&nbsp;"dateOfBirth":&nbsp;Object,<br/>&nbsp;&nbsp;"joinDate":&nbsp;Object<br/>}  |
|PUT    |/api/my/profile/update |TRUE   |/api/my/profile/update.jsx |401, 406         |userName<br/>name<br/>email<br/>bio<br/>avatarImg<br/>headerImg<br/>location<br/>website<br/>dateOfBirth<br/> password<br/>passwordConfrimation  |{<br/>&nbsp;&nbsp;"id":&nbsp;String,<br/>&nbsp;&nbsp;"userName":&nbsp;String<br/>&nbsp;&nbsp;"name":&nbsp;String,<br/>&nbsp;&nbsp;"email":&nbsp;String<br/>&nbsp;&nbsp;"bio":&nbsp;String,<br/>&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/>&nbsp;&nbsp;"headerImg":&nbsp;String,<br/>&nbsp;&nbsp;"location":&nbsp;String,<br/>&nbsp;&nbsp;"website":&nbsp;String,<br/>&nbsp;&nbsp;"dateOfBirth":&nbsp;Object,<br/>&nbsp;&nbsp;"joinDate":&nbsp;Object<br/>}  |
|       |                       |       |                           |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|POST   |/api/my/posts          |TRUE   |/api/my/posts.jsx          |401, 406         |content <br/> mediaUrl <br/> postType <br/> postId                                                                                               |{<br/>&nbsp;&nbsp;"id":&nbsp;Int,<br/>&nbsp;&nbsp;"userId":&nbsp;String<br/>&nbsp;&nbsp;"postId":&nbsp;Int,<br/>&nbsp;&nbsp;"content":&nbsp;String,<br/>&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/>&nbsp;&nbsp;"date":&nbsp;Object,<br/>&nbsp;&nbsp;"editDate":&nbsp;Object,<br/>&nbsp;&nbsp;"postType":&nbsp;String<br/>}                                                                                                                                   |
|GET    |/api/my/posts/:id      |FALSE  |/api/my/posts/[id].jsx     |404, 406         |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"id":&nbsp;Int,<br/>&nbsp;&nbsp;"userId":&nbsp;String<br/>&nbsp;&nbsp;"postId":&nbsp;Int,<br/>&nbsp;&nbsp;"content":&nbsp;String,<br/>&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/>&nbsp;&nbsp;"date":&nbsp;Object,<br/>&nbsp;&nbsp;"editDate":&nbsp;Object,<br/>&nbsp;&nbsp;"postType":&nbsp;String<br/>}                                                                                                                                   |
|DELETE |/api/my/posts/delete   |TRUE   |/api/my/posts/delete.jsx   |401, 404, 406    |postId                                                                                                                                           |{<br/>&nbsp;&nbsp;"id":&nbsp;Int,<br/>&nbsp;&nbsp;"userId":&nbsp;String<br/>&nbsp;&nbsp;"postId":&nbsp;Int,<br/>&nbsp;&nbsp;"content":&nbsp;String,<br/>&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/>&nbsp;&nbsp;"date":&nbsp;Object,<br/>&nbsp;&nbsp;"editDate":&nbsp;Object,<br/>&nbsp;&nbsp;"postType":&nbsp;String<br/>}                                                                                                                                   |
|       |                       |       |                           |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|GET    |/api/usersId           |FALSE  |/api/usersId/[id]/index.jsx|404, 406         |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"id":&nbsp;String,<br/>&nbsp;&nbsp;"userName":&nbsp;String<br/>&nbsp;&nbsp;"name":&nbsp;String,<br/>&nbsp;&nbsp;"email":&nbsp;String<br/>&nbsp;&nbsp;"bio":&nbsp;String,<br/>&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/>&nbsp;&nbsp;"headerImg":&nbsp;String,<br/>&nbsp;&nbsp;"location":&nbsp;String,<br/>&nbsp;&nbsp;"website":&nbsp;String,<br/>&nbsp;&nbsp;"dateOfBirth":&nbsp;Object,<br/>&nbsp;&nbsp;"joinDate":&nbsp;Object<br/>}  |







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
