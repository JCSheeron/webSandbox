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
    enabled: true,
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

  // onChange for trigger enable/disable
  const handleEnabledChange = (event) => {
    // Value gets converted to a string by the onChange.
    // but the rest of the enable is configured to use boolean.
    // Convert to a boolean so a bool is stored in state
    // const value = 'true' == event.target.value ? true : false;
    const value = 'true' == event.target.value.toLowerCase();
    setState({ ...state, enabled: value });
  };

  // onChange for trigger
  const handleTriggerChange = (event) => {
    setState({ ...state, trigger: event.target.value });
  };

  // onChange for condition
  const handleConditionChange = (event) => {
    setState({ ...state, condition: event.target.value });
  };

  // onChange for time picker
  const handleDateTimeChange = (dateTime) => {
    setState({ ...state, trigger: dateTime });
  };

  // onChange for condition time picker
  const handleConditionDateTimeChange = (dateTime) => {
    setState({ ...state, conditions: dateTime });
  };
  // onChange for type needs to dynamically provide trigger and condition options
  // for dynamically rendering the trigger and condition components.
  // This handler will update the triggers and conditions state arrays, which are
  // used to render the select components
  // Type       Trigger                   Condition options
  // DI         Select DI channel list    true/false
  // AI         Select AI channel list    >, >=, =, <=, < a specified value
  // Time       Time picker               before, at, after a specified time
  // Date       Date picker               before, at or after a specified date
  // DateTime   DateTime picker           before, at or after a specified datetime
  // Variable   text variable name        >, >=, =, <=, < a specified value

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
        triggers: [],
        conditions: []
      });
    } else if ('di' == value) {
      setState({
        ...state,
        type: value,
        trigger: '',
        // [0] type of control, [1] label, [2] option values, [3] option labels
        triggers: ['select', 'Channel', [1, 2, 3], ['Ch1', 'Ch2', 'Ch3']],
        // [0] type of condition, [1] label, [2] option values, [3] option labels
        conditions: ['select', 'Level', [true, false], ['On/High', 'Off/Low']]
      });
    } else if ('ai' == value) {
      setState({
        ...state,
        type: value,
        trigger: '',
        // [0] type of control, [1] label, [2] option values, [3] option labels
        triggers: ['select', 'Channel', [4, 5, 3], ['Ch4', 'Ch5', 'Ch6']],
        // [0] type of condition, [1] label, [2] option values, [3] option labels
        conditions: [
          'select',
          'Comparison',
          ['==', '!=', '>', '>=', '<=', '<'],
          [
            'Equal',
            'Not Equal',
            'Greater Than',
            'Greater Than or Equal',
            'Less Than or Equal',
            'Less Than'
          ]
        ]
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
        triggers: ['time', 'Trigger Time'],
        // [0] type of condition, [1] label, [2] option values, [3] option labels
        conditions: [
          'time',
          'Comparison',
          ['==', '!=', '>', '>=', '<=', '<'],
          ['At', 'Not At', 'After', 'At or After', 'At or Before', 'Before']
        ]
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
        triggers: ['date', 'Trigger Date'],
        // [0] type of condition, [1] label, [2] option values, [3] option labels
        conditions: [
          'date',
          'Comparison',
          ['==', '!=', '>', '>=', '<=', '<'],
          ['At', 'Not At', 'After', 'At or After', 'At or Before', 'Before']
        ]
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
        triggers: ['datetime', 'Trigger DateTime'],
        // [0] type of condition, [1] label, [2] option values, [3] option labels
        conditions: [
          'datetime',
          'Comparison',
          ['==', '!=', '>', '>=', '<=', '<'],
          ['At', 'Not At', 'After', 'At or After', 'At or Before', 'Before']
        ]
      });
    }
  };

  const renderTriggerSelect = (triggerOptions) => {
    // The triggers data was set in state when type was chosen.
    // It is passed in to support some "custom" ability when called,
    // but in reality the triggers data could have been fetched from state.
    // Examine type to know how to render trigger.
    // If type is empty, or if there is no trigger data,
    // a type probably has not been selected.
    // Disable the trigger control.
    if (
      '' == state.type ||
      !Array.isArray(triggerOptions) ||
      0 == triggerOptions.length
    ) {
      return (
        // disable the trigger selection if there is no type selected,
        // or if the options is an empty array/not an array.
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
      // if trigger type is specified in options,
      // then use the label and choices from the options
    } else if ('select' == triggerOptions[0].toLowerCase()) {
      return (
        <FormControl className={classes.formControl} component='fieldset'>
          <InputLabel id='selTriggerLabel'>{triggerOptions[1]}</InputLabel>
          <Select
            labelId='selTriggerLabel'
            id='selTrigger'
            value={state.trigger}
            onChange={handleTriggerChange}>
            <MenuItem value=''>None</MenuItem>
            // trigger options has this structure: // [0] type of control, [1]
            // label, [2] option values, [3] option labels
            {triggerOptions[2].map((channel, idx) => (
              <MenuItem key={idx} value={channel}>
                {triggerOptions[3][idx]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if ('time' == triggerOptions[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            id='trigger-time-picker'
            label={triggerOptions[1]}
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
    } else if ('date' == triggerOptions[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id='trigger-date-picker'
            label={triggerOptions[1]}
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
    } else if ('datetime' == triggerOptions[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            id='trigger-datetime-picker'
            label={triggerOptions[1]}
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

  const renderConditionSelect = (conditionOptions) => {
    // The conditions data was set in state when type was chosen.
    // It is passed in to support some "custom" ability when called,
    // but in reality the conditions data could have been fetched from state.
    // Examine type to know how to render condition.
    // If type is empty, or if there is no condition data,
    // a type probably has not been selected.
    // Disable the trigger control.
    if (
      '' == state.type ||
      !Array.isArray(conditionOptions) ||
      0 == conditionOptions.length
    ) {
      return (
        // disable the condition selection if there is no type selected,
        // or if the options is an empty array/not an array.
        <FormControl
          className={classes.formControl}
          component='fieldset'
          disabled>
          <InputLabel id='selConditionLabel'>Condition</InputLabel>
          <Select
            className={classes.select}
            labelId='selConditionLabel'
            id='selCondition'
            value={state.condition}
            onChange={handleConditionChange}>
            <MenuItem value=''>None</MenuItem>
          </Select>
        </FormControl>
      );
      // if condition type is specified in options,
      // then use the label and choices from the options
    } else if ('select' == conditionOptions[0].toLowerCase()) {
      return (
        <FormControl className={classes.formControl} component='fieldset'>
          <InputLabel id='selConditionLabel'>{conditionOptions[1]}</InputLabel>
          <Select
            labelId='selConditionLabel'
            id='selCondition'
            value={state.condition}
            onChange={handleConditionChange}>
            <MenuItem value=''>None</MenuItem>
            // condition options has this structure: [0] type of condition, [1]
            // label, [2] option values, [3] option labels
            {conditionOptions[2].map((channel, idx) => (
              <MenuItem key={idx} value={channel}>
                {conditionOptions[3][idx]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    } else if ('time' == conditionOptions[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            id='condition-time-picker'
            label={conditionOptions[1]}
            //24 hr format with seconds and now button
            ampm={false}
            views={['hours', 'minutes', 'seconds']}
            format='HH:mm:ss'
            showTodayButton
            todayLabel='now'
            value={state.condition}
            onChange={handleConditionDateTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change time'
            }}
          />
        </MuiPickersUtilsProvider>
      );
    } else if ('date' == conditionOptions[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id='condition-date-picker'
            label={conditionOptions[1]}
            format='MM/dd/yyyy'
            showTodayButton
            todayLabel='today'
            value={state.condition}
            onChange={handleConditionDateTimeChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
      );
    } else if ('datetime' == conditionOptions[0].toLowerCase()) {
      return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            id='condition-datetime-picker'
            label={conditionOptions[1]}
            format='MM/dd/yyyy HH:mm:ss'
            showTodayButton
            todayLabel='now'
            value={state.condition}
            onChange={handleConditionDateTimeChange}
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
              onChange={handleEnabledChange}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label='Enabled'
              />
              <FormControlLabel
                value={false}
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
          {renderConditionSelect(state.conditions)}
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
