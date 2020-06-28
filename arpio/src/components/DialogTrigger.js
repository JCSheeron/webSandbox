import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [enabled, setEnabled] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEnabledChange = (event) => {
    setEnabled(event.target.value);
  };

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Add Trigger
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Trigger</DialogTitle>
        <DialogContent>
          <FormControl component='fieldset'>
            <FormLabel component='legend'>Enabled</FormLabel>
            <RadioGroup
              aria-label='enabled'
              name='enabled1'
              value={enabled}
              onChange={handleEnabledChange}>
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

          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
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
