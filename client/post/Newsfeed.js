import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import auth from './../auth/auth-helper'
import PostList from './PostList'
import {listNewsFeed} from './api-post.js'
import NewPost from './NewPost'
import jwt from 'express-jwt'

const useSyles = makeStyles(theme => ({
    card: {
        margin: 'auto',
        paddingTop: 0,
        paddingBottom: theme.spacing(3)
    },
    title: {
        padding:`${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    media: {
        minHeight: 330
    }
}))
export default function Newsfeed() {
    const classes = useStyles()
    const [posts, setPosts] = useState([])
    const jwt = auth.isAuthenticated()
}

useEffect() => {
    const abortController = new AbortController()
    const signal = new abortController.signal

    listNewsFeed({
        userId: jwt.user._id
    }, {
        t: jwt.token
    }, signal).then((data) => {
        if (data.error)
    })
}