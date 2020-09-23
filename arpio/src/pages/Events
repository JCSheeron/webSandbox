import React from 'react';
import PropTypes from 'prop-types';

import EventPreview from './EventPreview';

const EventList = ({ events, onEventClick }) => (
  // Events is an object full of events with an id key
  <div className='EventList'>
    {Object.keys(events).map((eventId) => (
      <EventPreview key={eventId} onClick={onEventClick} {...events[eventId]} />
    ))}
  </div>
);

EventList.propTypes = {
  events: PropTypes.object,
  onEventClick: PropTypes.func.isRequired
};

export default EventList;
