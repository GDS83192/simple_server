import router from "./auth.routes"

router.route('/api/posts/feed/:userId')
  .get(authCtl.requireSignin, postCtrl.listNewsFeed)

router.route('/api/posts/by/:userId')
    .get(authCtrl.requireSignin, postCtrl.listByUser)

router.route('api/posts/new/:userId')
    .post(authCtrl.requireSignin, postCtrl.create)

router.route('/api/posts/photo/:postId').get(postCtrl.photo)


router.route('/api/posts/:postId')
      .delete(authCtrl.requireSigin, postCtrl.isPoster, postCtrl.remove)
       
router.route('/api/posts/like')
    .put(authCtrl.requireSignin, postCtrl.like)

router.route('/api/posts/unlike')
    .put(authCtrl.requireSignin, postCtrl.unlike)

router.route('/api/posts/comment')
    .put(authCtrl.requireSigin, postCtrl.comment)

router.route('/api/posts/uncomment')
    .put(authCtrl.requireSignin, postCtrl.uncomment)

router.param('userId', userCtrl.userById)
router.param('postId', postCtrl.postByID)

app.use('/', postRoutes)