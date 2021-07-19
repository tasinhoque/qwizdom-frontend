import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  ComponentProps,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import api from '../api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Header, Pie } from '../components';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { PieChart } from 'react-minimal-pie-chart';

const useStyles = makeStyles(theme => ({}));

export default function Stat(props) {
  const classes = useStyles();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    try {
      setLoading(false);

      const response = await api.getPieInfo('60f54796ae87f5172830e0b0');

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <Pie />
    </>
  );
}
