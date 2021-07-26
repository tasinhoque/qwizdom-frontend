import api from '../api';
import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
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
import { createMuiTheme } from '@material-ui/core/styles';
import { CardActionArea } from '@material-ui/core';
import { QuizHome } from '../pages';
import { withRouter } from 'react-router-dom';

const dummy = createMuiTheme({
  breakpoints: {
    values: {
      tablet: 425,
      laptop: 1200,
      desktop: 1400,
    },
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '320px',
    // maxWidth: 350,

    marginBottom: 10,
  },
  media: {
    height: '180px',
    // paddingTop: '56.25%', // 16:9
  },
  container: {
    marginBottom: '8px',
    position: 'relative',
    width: '100%',
  },
  quizImage: {
    width: '100%',
    height: 'auto',
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
    marginLeft: '-8px',
    backgroundColor: red[500],
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: '0 2px 2px 0',
  },
  chipStyle: {
    display: 'flex',
    justifyContent: 'flex-start',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  [dummy.breakpoints.up('laptop')]: {
    root: {
      // minWidth: '450px',
    },
  },
  // [dummy.breakpoints.between('tablet', 'laptop')]: {
  //   root: {
  //     maxWidth: '300px',
  //   },
  // },
}));

export default withRouter(function SingleCard(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const rerouteQuiz = () => {
    props.history.push(`/quiz/${props.id}/home`);
  };

  useEffect(async () => {
    console.log(props.categories);
  }, []);

  return (
    <Card className={classes.root}>
      <div className={classes.container}>
        <CardActionArea onClick={rerouteQuiz}>
          <CardMedia
            component="img"
            className={classes.media}
            image={props.coverImage}
          />
        </CardActionArea>
      </div>
      <div style={{ paddingLeft: '8px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px',
          }}
        >
          <Typography variant="h6" component="p">
            {props.name}
          </Typography>
          <Box className={classes.chipStyle}>
            <Chip color="primary" label={props.categories[0].name} />
            {/* {props.categories.map((category, i) => ( */}
            {/*   <Chip color="primary" label={category.name} key={i} /> */}
            {/* ))} */}
          </Box>
        </div>
        <div className={classes.titleContainer}>
          <CardHeader
            avatar={
              <Avatar
                // src="assets/images/marcos.png"
                src={props.creator.avatar}
                className={classes.avatar}
                size="small"
              ></Avatar>
            }
            title={props.creator.name}
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
            <Typography variant="body2">
              {props.totalParticipants || 0} participants
            </Typography>
            <Rating
              name="read-only"
              value={props.averageRating}
              precision={0.5}
              readOnly
            />
          </Box>
        </div>
      </div>
    </Card>
  );
});
