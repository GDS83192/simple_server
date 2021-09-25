import { values } from "lodash"

const clickPost = () => {
    let postData = new FormData()
    postData.append('text', values.text)
    postData.append('photo', values.photo)
    create({
        userId: jwt.user._id
    }, {
        t:jwt.token
    }, postData).then((data) => {
        if (data.error) {
            setValues({...values, error: data.error})
        } else {
            setValues({...values, text:'', photo: ''})
            props.addUpdate(data)
        }
    })
}