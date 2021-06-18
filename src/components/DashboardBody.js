import React, { useState } from 'react';
import { useEffect } from 'react';
import { SingleCard } from '../components';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import api from '../api';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

function DashboardBody(props) {
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [quizArray, setQuizArray] = useState([]);

  useEffect(async () => {
    const signedIn = localStorage.getItem('refreshToken');
    if (!signedIn) {
      props.history.push('/');
    }
    setLoading(true);
    api
      .getQuizzes(pageNum, 4)
      .then((res) => {
        setTotalPage(res.data.totalPages);
        setQuizArray(res.data.results);
        console.log(res);
        setLoading(false);
      })
      .catch((e) => {});
  }, [pageNum]);

  const pageChange = async (_event, num) => {
    setPageNum(num);
    console.log('changed num is ', num);
  };

  if (loading) {
    return (
      <>
        <div
          style={{
            padding: '10px 0px 35px 0px',
          }}
        >
          <Typography style={{ borderBottom: '2px solid black' }} variant="h4">
            Quizzes
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress color="secondary" />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            padding: '10px 0px 35px 0px',
          }}
        >
          <Typography style={{ borderBottom: '2px solid black' }} variant="h4">
            Quizzes
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {quizArray.map((q) => {
            return <SingleCard {...q} key={q.id} />;
          })}
        </div>
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Pagination
            count={totalPage}
            onChange={pageChange}
            page={pageNum}
            color="secondary"
          />
        </div>
      </>
    );
  }
}

export default withRouter(DashboardBody);
