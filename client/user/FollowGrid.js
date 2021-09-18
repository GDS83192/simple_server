import { Typography } from "@material-ui/core"

export default function FollowGrid(props) {
    const classes = useStyles()
      return (<div className={classes.root}>
          <GridList cellHeight={160} className={classes.GridList} cols={4}>
              {props.people.map((person, i) =>{
                  return <GridListTile style={{'height':120}} key={i}>
                      <Link to={"/user/" + person._id}>
                          <Avatar src={'/api/users/photo/'+person._id} className={classes.bigAvatar}/>
                          <Typography className={classes.tileText}>
                              {person.name}
                          </Typography>
                      </Link>
                  </GridListTile>
              })}
          </GridList>
      </div>)
}

FollowGrid.propTypes = {
    people: PropTypes.array.isRequired
}