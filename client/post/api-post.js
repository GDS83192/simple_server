const listNewsFeed = async (params, credentials, signal) => {
    try {
        let response = await fetch('/api/posts/feed/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const listByUser = async (req, res) => {
    try {
        let posts = await Post.find({postedBy: req.profile._id})
                              .populate('comments.postBy', '_id name')
    }
}

const create = async (params, credentials, post) => {
    try {
        let response = await fetch('/api/posts/new/'+ params.userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'AUthorization': 'Bearer ' + credentials.t
            },
            body: post
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const like = async (params, credentials, postId) => {
    try{
        let response = await fetch('/api/posts/liike', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'applicaton/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId:params.userId, postId: postId})
        })
        return await response.json()
    } catch(err) {
        console.log(err)
    }
}

const comment = async (params, credentials, postId, comment) => {
    try {
        let response = await fetch('api/posts/comment/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            },
            body: JSON.stringify({userId:params.userId, postId: postId, comments: comment})
        })
        return await response.json()
        catch(err) {
            console.log(err)
        }
    }
}