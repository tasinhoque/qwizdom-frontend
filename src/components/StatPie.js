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
import { Header } from '../components';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { PieChart } from 'react-minimal-pie-chart';

const useStyles = makeStyles(theme => ({}));

export default function StatPie(props) {
  const classes = useStyles();
  const { id } = useParams();

  const [selected, setSelected] = useState(null);

  const [hovered, setHovered] = useState(0);
  const dataMock = [
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ];

  // console.log(props.data);
  // props.data[0].value = 10;
  // props.data[1].value = 5;

  const lineWidth = 30;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <>
      <PieChart
        style={{
          fontFamily:
            '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
          fontSize: '8px',
        }}
        data={props.data}
        // data={dataMock}
        radius={30}
        // viewBoxSize={[100, 100]}
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        segmentsShift={index => (index === selected ? 3 : 1)}
        animate
        label={({ dataEntry }) =>
          dataEntry.percentage === 0
            ? ``
            : `${Math.round(dataEntry.percentage)}%`
        }
        lineWidth={60}
        labelPosition={120}
        labelStyle={index => ({
          // fill: dataMock[index].color,
          fill: props.data[index].color,
          fontSize: '8px',
          fontFamily: 'sans-serif',
        })}
        lineWidth={60}
        onClick={(_, index) => {
          setSelected(index === selected ? undefined : index);
        }}
        onMouseOver={(_, index) => {
          setHovered(index);
        }}
        onMouseOut={() => {
          setHovered(undefined);
        }}
      />
    </>
  );
}
