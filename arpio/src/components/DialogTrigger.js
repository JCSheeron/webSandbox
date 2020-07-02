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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

// date & time pickers related
import 'date-fns';
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProviderhh
} from '@material-ui/pickers';

export default function FormDialog() {
  //const [open, setOpen] = useState(false);
  //const [open2, setOpen2] = useState(false);
  //const [open3, setOpen3] = useState(false);
  // const [enabled, setEnabled] = useState(true);
  // OR for multiple state variables, immitate a class
  const [state, setState] = useState({
    open: false,
    triggers: { Select: [] },
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
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
  };

  // onChange for type needs to dynamically render the trigger component.
  // This handler will update the trigers state array, which is
  // used to render the triggers select statement
  // Type       Trigger
  // DI         Select DI channel list
  // AI         Select DI channel list
  // Time       Time picker
  // Date       Date picker
  // DateTime   DateTime picker
  // Variable   text variable name

  const handleTypeChange = (event) => {
    // console.log(event.target);
    // console.log(event.target.name);
    // console.log(event.target.value);
    const name = event.target.name;
    const value = event.target.value; // the selected type
    if ('' == value) {
      setState({
        ...state,
        [name]: value,
        triggers: [],
        trigger: ''
      });
    } else if ('di' == value) {
      setState({
        ...state,
        [name]: value,
        triggers: ['Select', 'Channel', [1, 2, 3]]
      });
    } else if ('ai' == value) {
      setState({
        ...state,
        [name]: value,
        triggers: ['Select', 'Channel', [4, 5, 6]]
      });
    } else if ('time' == value) {
      setState({
        ...state,
        [name]: value,
        triggers: ['Time', 'Time']
      });
    } else if ('date' == value) {
      setState({
        ...state,
        [name]: value,
        triggers: ['Date', 'Date']
      });
    } else if ('datetime' == value) {
      setState({
        ...state,
        [name]: value,
        triggers: ['DateTime', 'DateTime']
      });
    }
  };

  const renderTriggerSelect = (triggers) => {
    // examine trigger to know how to render trigger
    // If there is no trigger data, a type probably has not been selected.
    // Disable the trigger control.
    if (!Array.isArray(triggers) || 0 == triggers.length) {
      return (
        <FormControl component='fieldset' disabled>
          <InputLabel htmlFor='selTrigger'>Trigger</InputLabel>
          <Select
            native
            value={state.trigger}
            onChange={handleComponentChange}
            inputProps={{
              name: 'trigger',
              id: 'selTrigger'
            }}>
            <option aria-label='None' value='' />
          </Select>
        </FormControl>
      );
    } else
      return (
        <FormControl component='fieldset'>
          <InputLabel htmlFor='selTrigger'>Trigger</InputLabel>
          <Select
            native
            value={state.trigger}
            onChange={handleComponentChange}
            inputProps={{
              name: 'trigger',
              id: 'selTrigger'
            }}>
            <option aria-label='None' value='' />
            <option value='true'>True</option>
            <option value='false'>False</option>
            <option value='value'>Value</option>
          </Select>
        </FormControl>
      );
  };

  const handleTriggerChange = (event) => {
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
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
          <FormControl component='fieldset'>
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

          <FormControl component='fieldset'>
            <InputLabel htmlFor='selType'>Type</InputLabel>
            <Select
              native
              value={state.type}
              onChange={handleTypeChange}
              inputProps={{
                name: 'type',
                id: 'selType'
              }}>
              <option aria-label='None' value='' />
              <optgroup label='Input/Output'>
                <option value='di'>DI</option>
                <option value='ai'>AI</option>
              </optgroup>
              <optgroup label='Time'>
                <option value='time'>Time</option>
                <option value='date'>Date</option>
                <option value='datetime'>DateTime</option>
              </optgroup>
              <optgroup label='Variable'>
                <option value='variable'>Variable</option>
              </optgroup>
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
