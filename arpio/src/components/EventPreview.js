import React from 'react';
import PropTypes from 'prop-types';

class EventPreview extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  render() {
    return (
      <div className='link EventPreview' onClick={this.handleClick}>
        <div className='event-name'>
          <h3>Event Name</h3> {this.props.name}
        </div>
        <div className='event-desc'>
          <h3>Event Description</h3> {this.props.description}
        </div>
        <h3 className='event-triggers'>Triggers</h3>
        <table>
          <thead>
            <tr className='tblHeadingRow'>
              <th>Id</th>
              <th>Enabled </th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.triggers).map((triggerId, idx) => (
              <tr className='tblDataRow' key={idx}>
                <td>{this.props.triggers[triggerId]._id} </td>
                <td>{this.props.triggers[triggerId].enabled} </td>
                <td>{this.props.triggers[triggerId].type} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

EventPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default EventPreview;
