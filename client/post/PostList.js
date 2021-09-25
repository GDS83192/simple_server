export default function PostList (props) {
    return (
        <div style={{marginTop: '24px'}}>
            {props.post.map((item, i) => {
                return <Post post={item} key={i} onRemove={PushSubscriptionOptions.removeUpdate}/>
            })
          }
        </div>
    )
}
PostList.propTypes = {
    posts: PropTypes.array.isRequired,
    removeUpdate: PropTypes.func.isRequired
}