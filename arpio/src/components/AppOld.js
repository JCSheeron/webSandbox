import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';

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
const styles = (theme) => ({
  root: {
    display: 'flex'
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 240,
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
});

// Use browser history. HTML5 window.history supported on most browsers
// Put it in a function so if it needs to change, only the innerds of
// the function need to change.
const pushState = (obj, url) => window.history.pushState(obj, '', url);
const onPopState = (handler) => {
  window.onpopstate = handler;
};

class App extends React.Component {
  // State using a constructor
  constructor(props) {
    super(props);
    this.state = {
      // Only put things on state that need to be tracked, and that can't be
      // computed from other things.

      // Set initial state value from properties so a default can be passed
      // Thus, supporting server rendering for example.
      // eventData is an object contining a events object. The events
      // object contains event objects.
      // {  currentEventId: <id>
      //    arpiData:
      //    {events : {_id, name, description,
      //              startTimes[], endTimes[], triggers[], actions[] }
      //    }
      // }
      currentEventId: this.props.initialData.currentEventId,
      arpiData: this.props.initialData.arpiData,
      modalEditTriggersIsOpen: false
    };
  }
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };

  openReqModalEditTriggers = () => {
    this.setState({ modalEditTriggersIsOpen: true });
  };

  closeReqModalEditTriggers = () => {
    this.setState({ modalEditTriggersIsOpen: false });
  };

  componentDidMount() {
    onPopState((event) => {
      // console.log(event.state);
      this.setState({
        currentEventId: (event.state || {}).currentEventId // null or the current id
      });
    });
  }

  componentWillUnmount() {
    // clean timers, listeners, events
    onPopState(null);
  }

  fetchEvent = (eventId) => {
    // push the event to browser history (which makes it current and adds it to history)
    pushState({ currentEventId: eventId }, `/events/${eventId}`);
    // Now look up the event using the api
    // console.log(`EventId in fetchEvent ${eventId}`);
    api.fetchEvent(eventId).then((dataObj) => {
      //console.log('dataObj in FetchEvent');
      //console.log(
      //  inspect(dataObj, {
      //    showHidden: false,
      //    depth: null,
      //    colors: true
      //  })
      //);

      this.setState((prevState) => {
        return {
          currentEventId: dataObj.currentEventId,
          arpiData: {
            ...prevState.arpiData,
            events: {
              ...prevState.arpiData.events,
              [eventId]: dataObj.events[eventId]
            }
          }
        };
      });
    });
  };

  // Fetch the events object from the api and put them into the state
  fetchEventList = () => {
    // Clear the event id from browser, which removes is and adds a
    // non-id entry to the history
    pushState({ currentEventId: null }, '/');
    api.fetchEventList().then((events) => {
      this.setState((prevState) => {
        return {
          currentEventId: null,
          arpiData: {
            ...prevState.arpiData,
            events: events
          }
        };
      });
    });
  };

  // Fetch the triggers from the api and put them into the state.
  fetchtriggers = (eventId) => {
    api.fetchTriggers(eventId).then((triggers) => {
      this.setState((prevState) => {
        return {
          arpiData: {
            ...prevState.arpiData,
            events: {
              ...prevState.arpiData.events,
              [eventId]: {
                ...prevState.arpiData.events[eventId],
                triggers: triggers
              }
            }
          }
        };
      });
    });
  };

  // Fetch the actions from the api and put them into the state.
  fetchActions = (eventId) => {
    api.fetchActions(eventId).then((actions) => {
      this.setState((prevState) => {
        return {
          arpiData: {
            ...prevState.arpiData,
            events: {
              ...prevState.arpiData.events,
              [eventId]: {
                ...prevState.arpiData.events[eventId],
                actions: actions
              }
            }
          }
        };
      });
    });
  };

  // get the event corresponding to the current id
  currentEvent = () => {
    return this.state.arpiData.events[this.state.currentEventId];
  };

  // instead of having page header as a state variable, dynamically determine
  // the page header value. It should be the event name or the default
  pageHeader = () => {
    if (this.state.currentEventId) {
      return this.currentEvent().name;
    }
    return 'Event List';
  };

  addTrigger = (newTrigger, eventId) => {
    // use api method to add a start time to the event start times
    api.addTrigger(newStartTime, eventId).then((resp) => {
      console.log('addTrigger api responded');
      // TODO: Figure out the "updatedEvent" part of the console log statement
      console.log(
        `addTrigger api resp updatedEvent: ${inspect(resp.updatedEvent, {
          showHidden: false,
          depth: null,
          colors: true
        })}`
      );
      /*
      // TODO: Update state with the updated start time
      this.setState((prevState) => {
        return {
          arpiData: {
            ...prevState.arpiData,
            events: {
              ...prevState.arpiData.events,
              [eventId]: {
                ...prevState.arpiData.events[eventId],
                startTimes: startTimes
              }
            }
          }
        };
      });
      */
    });
  };

  editTriggers = (newTrigger, eventId) => {
    console.log(
      `App.js::editTrigger called.
        newTrigger: ${newTrigger}, eventId: ${eventId}`
    );
  };

  editActions = (newAction, eventId) => {
    console.log(
      `App.js::editAction called.
        newAction: ${newAction}, eventId: ${eventId}`
    );
  };
  // return either a list of events or if there is a valid id, the
  // event corresponding to the id
  currentContent = () => {
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
  };

  render() {
    //<Drawer
    //  variant='permanent'
    //  classes={{
    //    paper: classes.drawerPaper
    //  }}></Drawer>
    return (
      // render using currentContent method
      // which conditionally looks at eventId state to know
      // how to render

      <div className='App'>
        <HeaderComponent message={this.pageHeader()} />
        <Drawer variant='permanent'>
          <AppMenu />
        </Drawer>
        <main>
          <Container>I'm the content</Container>
        </main>
      </div>
    );
  }
}

export default App;
