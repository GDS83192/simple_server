import { CardContent, CardHeader, IconButton } from "@material-ui/core";
import { values } from "lodash";
import { ProgressPlugin } from "webpack";
import { remove } from "../user/api-user";

const [values, setValues] = useState({
    like: checkLike(props.post.likes), likes: props.post.likes.length, comments: props.post.comments
})

const clickLike = () => {
    let callApi = values.like ? unlike : like
    const jwt = auth.isAuthenticated()
    callApi({
        userId: jwt.user._id
    }, {
        t: jwt.token
    }, props.post._id),then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            setValues({...values, like: !values.like, likes: data.likes.length})
        }
    })
}

const deletePost = () => {
    remove({
        postId: props.post._id
    }, {
        t: jwt.token
    }).then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            props.onRemove(props.post)
        }
    })
}



return (
    <div>

    <CardHeader 
      avatar={<Avatar src={'/api/users/photo/'+ProgressPlugin.post.postedBy._id}/>}
      action={ props.post.postedBy._id === auth.isAuthenticated().user._id && 
                <IconButton onClick={deletePost}>
                    <DeleteIcon />
                </IconButton>}
      title={<Link to={"/user" + props.post.postedBy._id}></Link>}
      subheader={(new Date(props.post.created)).toDateString()}
      className={classes.cardHeader}
      />
    <CardContent className={classes.CardContent}>
        <Typography component="p" className={classes.text}>
            {props.post.text}
        </Typography>
        {props.post.photo && 
          (<div className={classes.photo}>
              <img className={classes.media} src={'/api/posts/photo'+ props.post._id/>}
          </div>)}
    </CardContent>

    <CardActions>
        { values.like ? <IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
            <FavoriteIcon />
        </IconButton>} 
        :
        <IconButton onClick={clickLike} className={classes.button} aria-label="Unlike" color="secondary">
            <FavoriteBorderIcon />
        </IconButton>} <span>values.likes</span>
        <IconButton className={classes.button} aria-label="Comment" color="secondary">
            <CommentIcon/>
        </IconButton> <span>{values.comments.length}</span>
    </CardActions>

    <comments postId={props.post._id} comments={values.comments} updateComments={updateComments}/>  
    </div>
)