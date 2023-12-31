import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';

import BaseballCard from './BaseballCard.jsx';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(3),
      minWidth: '200px',
    },
    loading: {
      marginBottom: theme.spacing(2),
    },
  };
});

const CardDisplay = ({ playerNames, handleClick }) => {
  const classes = useStyles();

  const isReady = playerNames && playerNames.length > 0;

  const cards = playerNames.map((playerName) => (
    <Grid item sm={5} md={3} key={playerName}>
      <BaseballCard
        playerName={playerName}
        key={playerName}
        handleClick={handleClick}
      />
    </Grid>
  ));

  return (
      <Container>
      <Grid container={true} className={classes.root}>
        <Grid container={true} justifyContent={'center'}>
          <Paper className={classes.paper} elevation={0}>
            {!isReady && (
              <CircularProgress size="2rem" className={classes.loading} />
            )}
            <Typography>
              {isReady
                ? 'Click on a card below to make an offer to buy the card.'
                : 'Fetching card list...'}
            </Typography>
          </Paper>
        </Grid>
         <Grid
           container={true}
           alignItems="stretch"
           direction="row"
           justifyContent={'center'}
         >
           {cards}
         </Grid>
      </Grid>
    </Container>
  );
};

export default CardDisplay;
