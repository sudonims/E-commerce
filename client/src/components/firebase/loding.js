import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  root: {
    minHeight: '100vh',
    justifyContent: 'center',
  },
  top: {
    color: 'red',
    position: 'fixed',
    top: '50%',
    bottom: 'auto',
    left: '50%',
  },
});

export default function Loading() {
  const classes = useStyle();
  return (
    <Container className={classes.root}>
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={60}
        thickness={6}
      />
    </Container>
  );
}