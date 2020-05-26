import React from 'react';
import PropTypes from 'prop-types';
// import { inspect } from 'util'; //console.log of objects

// components
import HeaderComponent from './HeaderComponent';
import EventList from './EventList';
import Event from './Event';

// import api
import * as api from '../api';

// simulate data that will eventually come from elsewhere
import data from '../testData1.json';

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
      // { arpiData:
      //    currentEventId: id,
      //    {events : {_id, name, description,
      //              startTimes[], endTimes[], triggers[], actions[] }
      //    }
      // }
      arpiData: this.props.initialData.arpiData,
      currentEventId: this.props.initialData.currentEventId
    };
  }

  static propTypes = {
    initialData: PropTypes.object.isRequired
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
    // Now look up the event
    // using the api
    api.fetchEvent(eventId).then((dataObj) => {
      this.setState((prevState) => {
        return {
          arpiData: {
            ...prevState.arpiData,
            currentEventId: dataObj.currentEventId,
            events: {
              ...prevState.arpiData.events,
              [dataObj.currentEventId]: events[dataObj.currentEventId]
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
          arpiData: {
            ...prevState.arpiData,
            currentEventId: null,
            events: events
          }
        };
      });
    });
  };

  // Fetch the start times from the api and put them into the state.
  fetchStartTimes = (eventId) => {
    api.fetchStartTimes(eventId).then((startTimes) => {
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

  addStartTimes = (newStartTime, eventId) => {
    // use api method to add a start time to the event start times
    api.addStartTime(newStartTime, eventId).then((resp) => {
      console.log('editStartTime api responded');
      // TODO: Figure out the "updatedEvent" part of the console log statement
      console.log(
        `editStartTime api resp updatedEvent: ${inspect(resp.updatedEvent, {
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

  editStartTimes = (newStartTime, eventId) => {
    console.log(
      `App.js::editStartTime called.
        newStartTime: ${newStartTime}, eventId: ${eventId}`
    );
  };

  editEndTimes = (newEndTime, eventId) => {
    console.log(
      `App.js::editEndTime called.
        newEndTime: ${newEndTime}, eventId: ${eventId}`
    );
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
    if (this.state.currentEventId) {
      return (
        <Event
          eventListClick={this.fetchEventList}
          editStartTimes={this.editStartTimes}
          editEndTimes={this.editStartTimes}
          editTriggers={this.editStartTimes}
          editActions={this.editStartTimes}
          {...this.currentEvent()}
        />
      );
    }
    return (
      <EventList
        events={this.state.arpiData.events}
        onEventClick={this.fetchEvent}
      />
    );
  };

  render() {
    return (
      // render using currentContent method
      // which conditionally looks at eventId state to know
      // how to render

      <div className='App'>
        <HeaderComponent message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;
