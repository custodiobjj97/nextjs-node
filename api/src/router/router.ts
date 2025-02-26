import { Router } from "express";
import { CreateUserController } from "../controller/user/createUser.controller";
import { AuthUserController } from "../controller/user/authUser.controller";
import { authenticated } from "../middlewares/authenticated";
import { ListUserController } from "../controller/user/listUser.controller";
import { CreatePostController } from "../controller/posts/createPost.controller";
import { ListPostsController } from "../controller/posts/listPosts.controller";
import { DeletePostsController } from "../controller/posts/deletePosts.controller";



export const router:Router=Router()

// router user
router.post('/user/signup', CreateUserController)
router.post('/user/login', AuthUserController)
router.get('/user/me', authenticated as any, ListUserController)
// router posts!


router.post('/posts',authenticated as any, CreatePostController)
router.get('/posts', authenticated as any, ListPostsController)
router.delete('/posts/:id', authenticated as any, DeletePostsController)


