import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 400,
    marginBottom: 30,
  },
  media: {
    height: 140,
    // paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chipStyle: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  quizReview: {
    margin: theme.spacing(2),
  },
}));

export default function QuizReviewCard() {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <div className={classes.titleContainer}>
        <CardHeader
          avatar={
            <Avatar
              src="assets/images/marcos.png"
              className={classes.avatar}
            ></Avatar>
          }
          title="Marcos Marshal"
          // subheader="September 14, 2016"
        />

        <Box
          component="fieldset"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          borderColor="transparent"
        >
          <Rating name="read-only" value={2} readOnly />
        </Box>
      </div>
      <div style={{ padding: '5px' }}>
        <Typography className={classes.quizReview} component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          euismod libero erat, vitae finibus dui viverra eu.
        </Typography>
      </div>

    </Card>
  );
}
