import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { radioChoices, incompatibilities } from './data';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '250px'
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2
  },
  resetContainer: {
    padding: theme.spacing.unit * 3
  }
});

function getSteps() {
  return ['Food Preference', 'Main Dishes', 'Side Dishes'];
}

function isThisChoiceDisabled(choiceId, choices) {
  let disabled = false;

  choices.first.forEach(val => {
    if (incompatibilities[val]) {
      if (incompatibilities[val].includes(+choiceId)) {
        disabled = true;
      }
    }
  });
  choices.second.forEach(val => {
    if (incompatibilities[val]) {
      if (incompatibilities[val].includes(+choiceId)) {
        disabled = true;
      }
    }
  });
  return disabled;
}

function getStepContent(step, handleRadioButtonChange, state) {
  switch (step) {
    case 0:
      return (
        <React.Fragment>
          {radioChoices[0].map(choice => (
            <FormControlLabel
              label={choice.value}
              control={
                <Checkbox
                  value={choice.id}
                  checked={
                    state.first &&
                    state.first.forEach(val => {
                      if (val === choice.id) {
                        return true;
                      } else {
                        return false;
                      }
                    })
                  }
                  onChange={handleRadioButtonChange}
                  color="primary"
                />
              }
            />
          ))}
        </React.Fragment>
      );
    case 1:
      return (
        <React.Fragment>
          {radioChoices[1].map(choice => {
            return (
              <FormControlLabel
                label={choice.value}
                control={
                  <Checkbox
                    disabled={isThisChoiceDisabled(choice.id, state.choices)}
                    value={choice.id}
                    checked={
                      state.first &&
                      state.first.forEach(val => {
                        if (val === choice.id) {
                          return true;
                        } else {
                          return false;
                        }
                      })
                    }
                    onChange={handleRadioButtonChange}
                    color="primary"
                  />
                }
              />
            );
          })}
        </React.Fragment>
      );
    case 2:
      return (
        <React.Fragment>
          {radioChoices[2].map(choice => {
            return (
              <FormControlLabel
                label={choice.value}
                control={
                  <Checkbox
                    disabled={isThisChoiceDisabled(choice.id, state.choices)}
                    value={choice.id}
                    checked={
                      state.first &&
                      state.first.forEach(val => {
                        if (val === choice.id) {
                          return true;
                        } else {
                          return false;
                        }
                      })
                    }
                    onChange={handleRadioButtonChange}
                    color="primary"
                  />
                }
              />
            );
          })}
        </React.Fragment>
      );
    default:
      return 'Unknown step';
  }
}

class VerticalLinearStepper extends React.Component {
  state = {
    activeStep: 0,
    choices: {
      first: [],
      second: [],
      third: []
    }
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  handleRadioButtonChange = event => {
    const { activeStep, choices } = this.state;
    if (activeStep === 0) {
      if (!choices.first.includes(event.target.value)) {
        this.setState({
          choices: {
            ...choices,
            first: [...choices.first, event.target.value]
          }
        });
      } else {
        let removedKeyArray = [...choices.first];
        removedKeyArray.splice(removedKeyArray.indexOf(event.target.value), 1);
        this.setState({
          choices: {
            ...choices,
            first: [...removedKeyArray]
          }
        });
      }
    }

    if (activeStep === 1) {
      if (!choices.second.includes(event.target.value)) {
        this.setState({
          choices: {
            ...choices,
            second: [...choices.first, ...choices.second, event.target.value]
          }
        });
      } else {
        let removedKeyArray = [...choices.second];
        removedKeyArray.splice(removedKeyArray.indexOf(event.target.value), 1);
        this.setState({
          choices: {
            ...choices,
            second: [...removedKeyArray]
          }
        });
      }
    }

    if (activeStep === 2) {
      if (!choices.third.includes(event.target.value)) {
        this.setState({
          choices: {
            ...choices,
            third: [...choices.third, event.target.value]
          }
        });
      } else {
        let removedKeyArray = [...choices.third];
        removedKeyArray.splice(removedKeyArray.indexOf(event.target.value), 1);
        this.setState({
          choices: {
            ...choices,
            third: [...removedKeyArray]
          }
        });
      }
    }
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep, choices } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography
                    style={{ textAlign: 'left', padding: '0px 20px' }}
                  >
                    {getStepContent(
                      index,
                      this.handleRadioButtonChange,
                      this.state
                    )}
                  </Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        disabled={
                          activeStep === 0 && !choices.first.length > 0
                            ? true
                            : false
                        }
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&quot;re finished</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(VerticalLinearStepper);
