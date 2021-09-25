import Post from '../models/post.model'
import errorHandler from './../helpers/dbErrorHandler'
import formidable from 'formidable'
import fs from 'fs'
import { rest } from 'lodash'

const photo = (req, res, next) => {
    res.set("Content-Type", req.post.photo.contentType)
    return res.send(req.post.photo.data)
}

const postByID = async (req, res, next, id) => {
    try{
        let post=await Post.findById(id)
                           .populate('postedBy', '_id name')
                           .exec()
        if (!post)
          return res.status('400').json({
              error: "Post not found"
          })
        req.post = post
        next()
    } catch(err) {
        return res.status('400').json({
            error: "Could not retrieve use post"
        })
    }
}

const create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let post = new Post(fields)
        post.postedBy = req.profile
        if(files.photo){
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        try {
            let result = await post.save()
            res.json(result)
        } catch (err){
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const postByID = async (req, res, next, id) => {
    try{
        let post = await Post.findById(id).populate('postedBy', '_id name').exec()
        if(!post)
          return res,statys('400').json({
              error: "Post not found"
          })
        req.post = post
        next()
    } catch(err){
        return resstatus('400').json({
            error: 'Could not retrieve use post'
        })
    }
}

const listByUser = async (req, res) => {
    try{
        let posts = await Post.find({postedBy: req.profile._id})
                              .populate('comments.postedBy', '_id name')
                              .populate('postedBy', '_id name')
                              .sort('-created')
                              .exec()
        res.json(posts)
    } catch (err){
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

const listNewsFeed = async (req, res) => {
    let following = req.profile.following
    following.push(req.profile._id)
    try {
        let posts = await POSt.find({postedBy:{ $in: req.profile.following}})
                              .populate('comments.postedBy', '_id name')
                              .populate('postedBy', '_id name')
                              .sort('-created')
                              .exec()
        res.json(posts)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const listByUser = async (req, res) => {
    try{
        let posts = await Post.find({ postedBy: req.profile._id})
                              .populate('comments.postedBy', '_id name')
                              .sort('-created')
                              .exec()
    } catch(err) {
        return res.status(400).json({
            error:errorHandler.getErrorMessage(err)
        })
    }
}

const create = (req, res, next) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        try {
            let result = await post.save()
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    })
}

const isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
    if (!isPoster) {
        return res.status('403').json({
            error: "user is not authorized"
        })
    }
    next()
}

const like = async (req, res) => {
    try {
        let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {likes: req.body.userId}}, {new: true})
        res.json(result)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const unlike = async(req, res) => {
    try {
        let result = await Post.findByIdAndUpdate(req.body.postId, {$pull: {likes: req.body.userId}}, {new: true})

        res.json(result)
    } catch(err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const checkLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1
    return match
}

const comment = async (req, res) => {
    let comment = req.body.comment
    comment.postedBy = req.body.userId
    try {
        let result = await Post.findByIdAndUpdate(req.body.postId, {$push: {comments: comment}},{new: true})
        .populate('comments.postedBy', '_id name')
        .populate('postedBy', '_id name')
        .exec()
    res.json(result)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}