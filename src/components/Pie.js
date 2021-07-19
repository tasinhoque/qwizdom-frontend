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

export default function Pie() {
  const classes = useStyles();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(0);

  const [hovered, setHovered] = useState(0);
  const dataMock = [
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ];
  const data = dataMock.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: 'grey',
      };
    }
    return entry;
  });

  const lineWidth = 30;

  useEffect(() => {
    setLoading(false);

    return () => {};
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div style={{ height: '500px', width: '300px', margin: '40px' }}>
            stat page
            <PieChart
              style={{
                fontFamily:
                  '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                fontSize: '8px',
              }}
              data={data}
              radius={42}
              segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
              segmentsShift={index => (index === selected ? 6 : 1)}
              animate
              label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
              label={({ dataEntry }) => dataEntry.title}
              lineWidth={60}
              labelPosition={110}
              labelStyle={index => ({
                fill: dataMock[index].color,
                fontSize: '5px',
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
            ;
          </div>
        )}
      </div>
    </>
  );
}
