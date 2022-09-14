# Full Stack Twitter Clone

### Stack
<div>
  <img src="https://ui-lib.com/blog/wp-content/uploads/2021/12/nextjs-boilerplate-logo.png" height="100">
  <img src="https://w7.pngwing.com/pngs/358/849/png-transparent-postgresql-database-logo-database-symbol-blue-text-logo-thumbnail.png" height="100">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--In8-nmXa--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3ofe3msqe0bw4p6i9il8.png" height="100">
  <img src="https://www.freelogovectors.net/wp-content/uploads/2022/01/prismalogo-freelogovectors.net_.png" height="100">
  <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-ar21.png" height="100">
  <img src="https://user-images.githubusercontent.com/7342023/101421491-a0313380-3909-11eb-8dd6-6037753af051.png" height="100">
  <img src="https://logovtor.com/wp-content/uploads/2020/10/vercel-inc-logo-vector.png" height="100">
  <img src="https://getlogo.net/wp-content/uploads/2020/11/supabase-logo-vector.png" height="100">
  <img src="https://www.zencos.com/wp-content/uploads/2021/11/aws-logo.png" height="100">
  <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--iBf9O9OS--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://dev-to-uploads.s3.amazonaws.com/i/9ngdmhfexbyafu2p5cll.png" height="100">
  <img src="https://www.drupal.org/files/project-images/moment.png" height="100">
</div>

### Deployment
- Vercel
- Supabase

### Pages
|Method |URL                  |Auth   |Corresponding File           |
|-------|---------------------|-------|-----------------------------|
|GET    |/                    |FALSE  |/index.jsx                   |
|GET    |/:userName           |FALSE  |/[...slug].jsx               |
|GET    |/auth/singup         |FALSE  |/auth/singup.jsx             |
|GET    |/auth/login          |FALSE  |/auth/login.jsx              |
|GET    |/settings            |TRUE   |/settings/index.jsx          |
|GET    |/settings/account    |TRUE   |/settings/account/index.jsx  |
|GET    |/settings/password   |TRUE   |/settings/password/index.jsx |
|GET    |/bookmarks           |TRUE   |/bookmarks/index.jsx         |
|GET    |/compose             |TRUE   |/compose/tweet/index.jsx     |
|GET    |/notifications       |TRUE   |/notifications/index.jsx     |

### API Routes
|Method	|URL                            |Auth	  |Corresponding File	                |Expected Errors  |User Data                                                                                                                                        | Response                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|-------|-------------------------------|-------|-----------------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|GET	  |/api/auth/login	              |FALSE  |/api/auth/login.jsx	              |406              |email <br/> password	                                                                                                                            |{<br/>&nbsp;&nbsp;success:&nbsp;true,<br/>&nbsp;&nbsp;message:&nbsp;'successfully&nbsp;logged&nbsp;in'<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|POST	  |/api/auth/signup	              |FALSE  |/api/auth/signup.jsx	              |406              |name <br/> email <br/> dateOfBirth <br/> password <br/> passwordConfirmation                                                                     |{<br/>&nbsp;&nbsp;success:&nbsp;true,<br/>&nbsp;&nbsp;message:&nbsp;'created&nbsp;new&nbsp;user'<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|DELETE |/api/auth/logout               |TRUE   |/api/auth/logout.jsx               |406              |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;success:&nbsp;true,<br/>&nbsp;&nbsp;message:&nbsp;'successfully&nbsp;logged&nbsp;out'<br/>}                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|       |                               |       |                                   |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|GET    |/api/my/profile                |TRUE   |/api/my/profile/index.jsx          |401, 406         |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"id":&nbsp;String,<br/>&nbsp;&nbsp;"userName":&nbsp;String<br/>&nbsp;&nbsp;"name":&nbsp;String,<br/>&nbsp;&nbsp;"email":&nbsp;String<br/>&nbsp;&nbsp;"bio":&nbsp;String,<br/>&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/>&nbsp;&nbsp;"headerImg":&nbsp;String,<br/>&nbsp;&nbsp;"location":&nbsp;String,<br/>&nbsp;&nbsp;"website":&nbsp;String,<br/>&nbsp;&nbsp;"dateOfBirth":&nbsp;Object,<br/>&nbsp;&nbsp;"joinDate":&nbsp;Object<br/>}                                                                                                      |
|PUT    |/api/my/profile/update         |TRUE   |/api/my/profile/update.jsx         |401, 406         |userName<br/>name<br/>email<br/>bio<br/>avatarImg<br/>headerImg<br/>location<br/>website<br/>dateOfBirth<br/> password<br/>passwordConfrimation  |{<br/>&nbsp;&nbsp;"id":&nbsp;String,<br/>&nbsp;&nbsp;"userName":&nbsp;String<br/>&nbsp;&nbsp;"name":&nbsp;String,<br/>&nbsp;&nbsp;"email":&nbsp;String<br/>&nbsp;&nbsp;"bio":&nbsp;String,<br/>&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/>&nbsp;&nbsp;"headerImg":&nbsp;String,<br/>&nbsp;&nbsp;"location":&nbsp;String,<br/>&nbsp;&nbsp;"website":&nbsp;String,<br/>&nbsp;&nbsp;"dateOfBirth":&nbsp;Object,<br/>&nbsp;&nbsp;"joinDate":&nbsp;Object<br/>}                                                                                                      |
|       |                               |       |                                   |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|POST   |/api/my/posts                  |TRUE   |/api/my/posts.jsx                  |401, 406         |content <br/> mediaUrl <br/> postType <br/> postId                                                                                               |{<br/>&nbsp;&nbsp;"id":&nbsp;Int,<br/>&nbsp;&nbsp;"userId":&nbsp;String<br/>&nbsp;&nbsp;"postId":&nbsp;Int,<br/>&nbsp;&nbsp;"content":&nbsp;String,<br/>&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/>&nbsp;&nbsp;"date":&nbsp;Object,<br/>&nbsp;&nbsp;"editDate":&nbsp;Object,<br/>&nbsp;&nbsp;"postType":&nbsp;String<br/>}                                                                                                                                                                                                                                       |
|GET    |/api/my/posts/:id              |FALSE  |/api/my/posts/[id].jsx             |404, 406         |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"id":&nbsp;Int,<br/>&nbsp;&nbsp;"userId":&nbsp;String<br/>&nbsp;&nbsp;"postId":&nbsp;Int,<br/>&nbsp;&nbsp;"content":&nbsp;String,<br/>&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/>&nbsp;&nbsp;"date":&nbsp;Object,<br/>&nbsp;&nbsp;"editDate":&nbsp;Object,<br/>&nbsp;&nbsp;"postType":&nbsp;String<br/>}                                                                                                                                                                                                                                       |
|DELETE |/api/my/posts/delete           |TRUE   |/api/my/posts/delete.jsx           |401, 404, 406    |postId                                                                                                                                           |{<br/>&nbsp;&nbsp;"id":&nbsp;Int,<br/>&nbsp;&nbsp;"userId":&nbsp;String<br/>&nbsp;&nbsp;"postId":&nbsp;Int,<br/>&nbsp;&nbsp;"content":&nbsp;String,<br/>&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/>&nbsp;&nbsp;"date":&nbsp;Object,<br/>&nbsp;&nbsp;"editDate":&nbsp;Object,<br/>&nbsp;&nbsp;"postType":&nbsp;String<br/>}                                                                                                                                                                                                                                       |
|       |                               |       |                                   |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|GET    |/api/usersId                   |FALSE  |/api/usersId/[id]/index.jsx        |404, 406         |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"id":&nbsp;String,<br/>&nbsp;&nbsp;"userName":&nbsp;String<br/>&nbsp;&nbsp;"name":&nbsp;String,<br/>&nbsp;&nbsp;"email":&nbsp;String<br/>&nbsp;&nbsp;"bio":&nbsp;String,<br/>&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/>&nbsp;&nbsp;"headerImg":&nbsp;String,<br/>&nbsp;&nbsp;"location":&nbsp;String,<br/>&nbsp;&nbsp;"website":&nbsp;String,<br/>&nbsp;&nbsp;"dateOfBirth":&nbsp;Object,<br/>&nbsp;&nbsp;"joinDate":&nbsp;Object<br/>}                                                                                                      |
|       |                               |       |                                   |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|GET    |/api/users/:username           |FALSE  |/api/users/[username]/index.jsx    |404, 406         |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"id":&nbsp;String,<br/>&nbsp;&nbsp;"userName":&nbsp;String<br/>&nbsp;&nbsp;"name":&nbsp;String,<br/>&nbsp;&nbsp;"email":&nbsp;String<br/>&nbsp;&nbsp;"bio":&nbsp;String,<br/>&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/>&nbsp;&nbsp;"headerImg":&nbsp;String,<br/>&nbsp;&nbsp;"location":&nbsp;String,<br/>&nbsp;&nbsp;"website":&nbsp;String,<br/>&nbsp;&nbsp;"dateOfBirth":&nbsp;Object,<br/>&nbsp;&nbsp;"joinDate":&nbsp;Object<br/>}                                                                                                      |
|GET    |/api/users/:username/following |FALSE  |/api/users/:username/following.jsx |404, 406         |NONE                                                                                                                                             |[<br/>&nbsp;&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postId":&nbsp;null,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postUserId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interactionUserId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"actionType":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interactionUser":&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;String<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userName":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"bio":&nbsp;String<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/> &nbsp;&nbsp;}<br/> ] |
|GET    |/api/users/:username/followers |FALSE  |/api/users/:username/followers.jsx |404, 406         |NONE                                                                                                                                             |[<br/>&nbsp;&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postId":&nbsp;null,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postUserId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interactionUserId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"actionType":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interactionUser":&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;String<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userName":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"bio":&nbsp;String<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/> &nbsp;&nbsp;}<br/> ] |
|       |                               |       |                                   |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|GET    |/api/my/interactions           |FALSE  |/api/my/interactions.jsx           |401, 406         |NONE                                                                                                                                             |[ <br/> &nbsp;&nbsp;&nbsp;&nbsp;{ <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;Int, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postId":&nbsp;Int, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postUserId":&nbsp;String, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interactionUserId":&nbsp;String, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date":&nbsp;Object, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"actionType":&nbsp;String <br/> &nbsp;&nbsp;&nbsp;&nbsp;} <br/> ]  |
|GET    |/api/my/interaction            |FALSE  |/api/my/interaction.jsx            |406              |postId <br/> interactionUserId <br/> actionType                                                                                                  |[ <br/> &nbsp;&nbsp;&nbsp;&nbsp;{ <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;Int, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postId":&nbsp;Int, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postUserId":&nbsp;String, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interactionUserId":&nbsp;String, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date":&nbsp;Object, <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"actionType":&nbsp;String <br/> &nbsp;&nbsp;&nbsp;&nbsp;} <br/> ]  |
|GET    |/api/my/bookmarks              |TRUE   |/api/my/bookmarks/index.jsx        |401, 406         |NONE                                                                                                                                             |[ <br/> &nbsp;&nbsp;&nbsp;&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postId":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postUserId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"interactionUserId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"actionType":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"post":&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postId":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"editDate":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postType":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user":&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userName":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avatarImg":&nbsp;String<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/> &nbsp;&nbsp;&nbsp;&nbsp;}<br/> ] |
|POST   |/api/my/notifications/post     |TRUE   |/api/my/notifications/post.jsx     |401, 406         |userId <br/> content                                                                                                                             |{<br/> &nbsp;&nbsp;"id":&nbsp;Int,<br/> &nbsp;&nbsp;"userId":&nbsp;String,<br/> &nbsp;&nbsp;"content":&nbsp;String,<br/> &nbsp;&nbsp;"sendDate":&nbsp;Object,<br/> &nbsp;&nbsp;"readDate":&nbsp;null,<br/> &nbsp;&nbsp;"received":&nbsp;false<br/> }                                                                                                                                                                                                                                                                                                           |
|PUT    |/api/my/notifications/read     |TRUE   |/api/my/notifications/read.jsx     |401, 404, 406    |id                                                                                                                                               |{<br/> &nbsp;&nbsp;"id":&nbsp;Int,<br/> &nbsp;&nbsp;"userId":&nbsp;String,<br/> &nbsp;&nbsp;"content":&nbsp;String,<br/> &nbsp;&nbsp;"sendDate":&nbsp;Object,<br/> &nbsp;&nbsp;"readDate":&nbsp;Object,<br/> &nbsp;&nbsp;"received":&nbsp;true<br/> }                                                                                                                                                                                                                                                                                                          |
|GET    |/api/my/notifications          |TRUE   |/api/my/notifications/index.jsx    |401, 406         |NONE                                                                                                                                             |[<br/> &nbsp;&nbsp;&nbsp;&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"sendDate":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"readDate":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"received":&nbsp;Boolean<br/> &nbsp;&nbsp;&nbsp;&nbsp;}<br/> ]                 |
|       |                               |       |                                   |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|GET    |/api/post/:id                  |FALSE  |/api/post/[id].jsx                 |401, 404, 406    |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"id":&nbsp;Int,<br/>&nbsp;&nbsp;"userId":&nbsp;String,<br/>&nbsp;&nbsp;"postId":&nbsp;Int,<br/>&nbsp;&nbsp;"content":&nbsp;String,<br/>&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/>&nbsp;&nbsp;"date":&nbsp;Object,<br/>&nbsp;&nbsp;"editDate":&nbsp;Object,<br/>&nbsp;&nbsp;"postType":&nbsp;String<br/>}                                                                                                                                                                                                                                      |
|GET    |/api/post/stats/               |FALSE  |/api/post/stats/[id].jsx           |401, 404, 406    |NONE                                                                                                                                             |{<br/>&nbsp;&nbsp;"replies":&nbsp;Int,<br/>&nbsp;&nbsp;"retweets":&nbsp;Int,<br/>&nbsp;&nbsp;"likes":&nbsp;Int,<br/>&nbsp;&nbsp;"bookmarks":&nbsp;Int<br/>}                                                                                                                                                                                                                                                                                                                                                                                                    |
|       |                               |       |                                   |                 |                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
|GET    |/api/all/users                 |FALSE  |/api/all/users.jsx                 |401, 406         |NONE                                                                                                                                             |[ <br/> &nbsp;&nbsp;&nbsp;&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userName":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"bio":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avatarImg":&nbsp;String<br/> &nbsp;&nbsp;&nbsp;&nbsp;},<br/> ]                                                                                                |
|GET    |/api/all/posts                 |FALSE  |/api/all/posts.jsx                 |401, 406         |NONE                                                                                                                                             |[ <br/> &nbsp;&nbsp;&nbsp;&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userId":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postId":&nbsp;Int,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"mediaUrl":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"date":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"editDate":&nbsp;Object,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"postType":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"user":&nbsp;{<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"id":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"userName":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avatarImg":&nbsp;String,<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"bio":&nbsp;String<br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br/> &nbsp;&nbsp;&nbsp;&nbsp;},<br/> ]  |



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
|Field            |Type           |Atrribute                                                                              |
|-----------------|---------------|---------------------------------------------------------------------------------------|
|id               |String         |@unique @default(uuid())                                                               |
|userName         |String?        |@unique                                                                                |
|name             |String         |                                                                                       |
|email            |String         |@unique                                                                                |
|passwordHash     |String         |                                                                                       |
|salt             |String         |                                                                                       |
|bio              |String?        |@db.VarChar(280)                                                                       |
|avatarImg        |String?        |@default("https://unit-2-cardify.s3.ap-northeast-1.amazonaws.com/twitter-avatar.jpg")  |
|headerImg        |String?        |                                                                                       |
|location         |String?        |                                                                                       |
|website          |String?        |                                                                                       |
|dateOfBirth      |DateTime       |                                                                                       |
|joinDate         |DateTime       |@default(now())                                                                        |
|posts            |Post[]         |                                                                                       |
|postUser         |Interaction[]  |@relation("postUser")                                                                  |
|interactionUser  |Interaction[]  |@relation("interactionUser")                                                           |
|notifications    |Notification[] |                                                                                       |


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
|Field              |Type           |Attribute                                                                    |
|-------------------|---------------|-----------------------------------------------------------------------------|
|id                 |Int            |@id @default(autoincrement())                                                |
|postId             |Int?           |                                                                             |
|postUserId         |String         |                                                                             |
|interactionUserId  |String         |                                                                             |
|date               |DateTime       |@default(now())                                                              |
|actionType         |ActionTypes    |                                                                             |
|postUser           |User           |@relation("postUser", fields: [postUserId], references: [id])                |
|interactionUser    |User           |@relation("interactionUser", fields: [interactionUserId], references: [id])  |
|post               |Post?          |@relation(fields: [postId], references: [id])                                |


#### model Notification
|Field          |Type           |Attribute                                      |
|---------------|---------------|-----------------------------------------------|
|id             |Int            |@id @default(autoincrement())                  |
|userId         |String         |                                               |
|receivingUser  |String         |                                               |
|postId         |String?        |                                               |
|content        |String         |                                               |
|sendDate       |DateTime       |@default(now())                                |
|readDate       |DateTime?      |                                               |
|received       |Boolean        |@default(false)                                |
|user           |User           |@relation(fields: [userId], references: [id])  |
