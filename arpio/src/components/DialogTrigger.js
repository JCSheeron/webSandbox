import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

// date & time pickers related
import { format as dateFormat } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

// Use material-ui styles to define some styles
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  select: {
    marginTop: theme.spacing(2)
  }
}));

export default function FormDialog() {
  const classes = useStyles(); // get the styles defined above
  // const [open, setOpen] = useState(false);
  // const [enabled, setEnabled] = useState(true);
  // OR for multiple state variables, immitate a class
  const [state, setState] = useState({
    open: false,
    triggers: [],
    conditions: [],
    enabled: 'true',
    type: '',
    trigger: '',
    condition: '',
    comparison: ''
  });

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  // onChange (generic) for component that does not need a special handler
  const handleComponentChange = (event) => {
    //console.log(event);
    //console.log(event.target);
    //console.log(event.target.name);
    //console.log(event.target.value);
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
  };

  // onChange for time picker
  const handleDateTimeChange = (dateTime) => {
    setState({ ...state, trigger: dateTime });
  };

  const handleTriggerChange = (event) => {
    setState({ ...state, trigger: event.target.value });
  };

  // onChange for type needs to dynamically render the trigger component.
  // This handler will update the trigers state array, which is
  // used to render the triggers select statement
  // Type       Trigger
  // DI         Select DI channel list
  // AI         Select AI channel list
  // Time       Time picker
  // Date       Date picker
  // DateTime   DateTime picker
  // Variable   text variable name

  const handleTypeChange = (event) => {
    // console.log(event);
    // console.log(event.target);
    // console.log(event.currentTarget);
    // console.log(event.target.name);
    // console.log(event.target.value);
    const value = event.target.value; // the selected type
    // Clear the trigger in state when the type is set to
    // prevent a the previous trigger selection from being invalid.

    if ('' == value) {
      setState({
        ...state,
        type: '',
        trigger: '',
        triggers: []
      });
    } else if ('di' == value) {
      setState({
        ...state,
        type: value,
        trigger: '',
        // [0] type of control, [1] label, [2] options
        triggers: ['select', 'Channel', [1, 2, 3]]
      });
    } else if ('ai' == value) {
      setState({
        ...state,
        type: value,
        trigger: '',
        // [0] type of control, [1] label, [2] options
        triggers: ['select', 'Channel', [4, 5, 6]]
      });
    } else if ('time' == value) {
      // if type was a datetime or similar, keep the trigger selection
      var trigger;
      if (
        'time' == state.type ||
        'date' == state.type ||
        'datetime' == state.type
      )
        trigger = state.trigger;
      else trigger = null; // use null so no time is displayed

      setState({
        ...state,
        type: value,
        trigger: trigger,
        // [0] type of control, [1] label
        triggers: ['time', 'Trigger Time']
      });
    } else if ('date' == value) {
      // if type was a datetime or similar, keep the trigger selection
      var trigger;
      if (
        'time' == state.type ||
        'date' == state.type ||
        'datetime' == state.type
      )
        trigger = state.trigger;
      else trigger = null; // use null so no time is displayed

      setState({
        ...state,
        type: value,
        trigger: trigger,
        // [0] type of control, [1] label
        triggers: ['date', 'Trigger Date']
      });
    } else if ('datetime' == value) {
      // if type was a datetime or similar, keep the trigger selection
      var trigger;
      if (
        'time' == state.type ||
        'date' == state.type ||
        'datetime' == state.type
      )
        trigger = state.trigger;
      else trigger = null; // use null so no time is displayed

      setState({
        ...state,
        type: value,
        trigger: trigger,
        // [0] type of control, [1] label
        triggers: ['datetime', 'Trigger DateTime']
      });
    }
  };

  const renderTriggerSelect = (triggers) => {
    // The triggers data was set in state when type was chosen.
    // It is passed in to support some "custom" ability when called,
    // but in reality the triggers data could have been fetched from state.
    // Examine type to know how to render trigger.
    // If type is empty, or if there is no trigger data,
    // a type probably has not been selected.
    // Disable the trigger control.
    if ('' == state.type || !Array.isArray(triggers) || 0 == triggers.length) {
      return (
        // disable the trigger selection if there is no type selected,
        // or if the triggers state is an empty array/not an array.
        <FormControl
          className={classes.formControl}
          component='fieldset'
          disabled>
          <InputLabel id='selTriggerLabel'>Trigger</InputLabel>
          <Select
            className={classes.select}
            labelId='selTriggerLabel'
            id='selTrigger'
            value={state.trigger}
            onChange={handleTriggerChange}>
            <MenuItem value=''>None</MenuItem>
          </Select>
        </FormControl>
      );
      // if trigger type should be a selection,
      // then use the label and choices from the triggers state
    } else if ('select' == triggers[0].toLowerCase()) {
      return (
        <FormControl className={classes.formControl} component='fieldset'>
          <InputLabel id='selTriggerLabel'>{triggers[1]}</InputLabel>
          <Select
            labelId='selTriggerLabel'
            id='selTrigger'
            value={state.trigger}
            onChange={handleTriggerChange}>
            <MenuItem value=''>None</MenuItem>
            {state.triggers[2].map((channel) => (
              <MenuItem value={channel}>{channel}</MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if ('time' == triggers[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            id='trigger-time-picker'
            label={triggers[1]}
            //24 hr format with seconds and now button
            ampm={false}
            views={['hours', 'minutes', 'seconds']}
            format='HH:mm:ss'
            showTodayButton
            todayLabel='now'
            value={state.trigger}
            onChange={handleDateTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change time'
            }}
          />
        </MuiPickersUtilsProvider>
      );
    } else if ('date' == triggers[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id='trigger-date-picker'
            label={triggers[1]}
            format='MM/dd/yyyy'
            showTodayButton
            todayLabel='today'
            value={state.trigger}
            onChange={handleDateTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      );
    } else if ('datetime' == triggers[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            id='trigger-datetime-picker'
            label={triggers[1]}
            format='MM/dd/yyyy HH:mm:ss'
            showTodayButton
            todayLabel='now'
            value={state.trigger}
            onChange={handleDateTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      );
    }
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Add Trigger
      </Button>
      <Dialog
        open={state.open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Trigger</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl} component='fieldset'>
            <FormLabel component='legend'>Enabled</FormLabel>
            <RadioGroup
              aria-label='enabled'
              name='enabled'
              value={state.enabled}
              onChange={handleComponentChange}>
              <FormControlLabel
                value='true'
                control={<Radio />}
                label='Enabled'
              />
              <FormControlLabel
                value='false'
                control={<Radio />}
                label='Disabled'
              />
            </RadioGroup>
          </FormControl>

          <FormControl className={classes.formControl} component='fieldset'>
            <InputLabel id='selTypeLabel'>Type</InputLabel>
            <Select
              labelId='selTypeLabel'
              id='selType'
              value={state.type}
              onChange={handleTypeChange}>
              <MenuItem value=''>None</MenuItem>
              <MenuItem value='di'>DI</MenuItem>
              <MenuItem value='ai'>AI</MenuItem>
              <MenuItem value='time'>Time</MenuItem>
              <MenuItem value='date'>Date</MenuItem>
              <MenuItem value='datetime'>DateTime</MenuItem>
              <MenuItem value='variable'>Variable</MenuItem>
            </Select>
          </FormControl>
          {renderTriggerSelect(state.triggers)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleClose} color='primary'>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
