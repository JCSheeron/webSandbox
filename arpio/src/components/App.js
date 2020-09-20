import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { inspect } from 'util'; //console.log of objects

// components
import HeaderComponent from './HeaderComponent';
import AppMenu from './AppMenu';
import EventList from './EventList';
import Event from './Event';

// import api
import * as api from '../api';

// simulate data that will eventually come from elsewhere
import data from '../testData1.json';

// Use material-ui styles to define some styles
// makeStyles returns a hook to access class styles
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    background: '#535454',
    color: '#fff'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

// Use browser history. HTML5 window.history supported on most browsers
// Put it in a function so if it needs to change, only the innerds of
// the function need to change.
const pushState = (obj, url) => window.history.pushState(obj, '', url);
const onPopState = (handler) => {
  window.onpopstate = handler;
};

const App = (props) => {
  // state variables
  // Init using inital data properties
  const [arpiData, setArpiData] = useState(props.initialData.arpiData);

  // use hook from makeStyles to bring in styles
  const classes = useStyles();

  // return either a list of events or if there is a valid id, the
  // event corresponding to the id
  // currentContent = () => {
  // If you have a valid id (from a click on an event), then
  // display the event, otherwise display the event list
  //if (this.state.currentEventId) {
  //  //console.log(
  //  //  `App.js this.currentEvent:  ${inspect(this.currentEvent(), {
  //  //    showHidden: false,
  //  //    depth: null,
  //  //    colors: false
  //  //  })}`
  //  //);
  //  return (
  //    <Event
  //      eventListClick={this.fetchEventList}
  //      openReqModalEditTriggers={this.openReqModalEditTriggers}
  //      closeReqModalEditTriggers={this.closeReqModalEditTriggers}
  //      isModalEditTriggersOpen={this.state.modalEditTriggersIsOpen}
  //      {...this.currentEvent()}
  //    />
  //  );
  //}
  //return (
  //  <EventList
  //    events={this.state.arpiData.events}
  //    onEventClick={this.fetchEvent}
  //  />
  //);
  // };

  //<Drawer
  //  variant='permanent'
  //  classes={{
  //    paper: classes.drawerPaper
  //  }}></Drawer>
  return (
    // render using currentContent method
    // which conditionally looks at eventId state to know
    // how to render

    <div className={clsx('App', classes.root)}>
      <CssBaseline />
      <Drawer variant='permanent' classes={{ paper: classes.drawerPaper }}>
        <AppMenu />
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth='lg' className={classes.container}>
          <Typography>I'm the content</Typography>
        </Container>
      </main>
    </div>
  );
};

// set up props
App.propTypes = {
  initialData: PropTypes.object.isRequired
};

export default App;
