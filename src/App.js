import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RadioStepper from './RadioStepper';

class App extends Component {
  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '80px', fontFamily: 'Pacifico' }}>Menu</div>
        </Grid>

        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Grid container justify="center">
            <Grid item xs={6} style={{ textAlign: 'center' }}>
              <Paper
                style={{
                  width: '100%',
                  height: '560px',
                }}
              >
                <RadioStepper />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default App;
