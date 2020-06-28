import React from 'react';
import PropTypes from 'prop-types';

import * as TriggerTable from './TriggerTable';
import * as ActionTable from './ActionTable';

import DialogTrigger from './DialogTrigger';

class EventPreview extends React.Component {
  //constructor(props) {
  //super(props);
  //}
  /*
  handleClick = () => {
    this.props.onClick(this.props._id);
  };
  */

  // Create a function that will render our row sub components
  renderRowSubComponent = ({ row }) => {
    return (
      <ActionTable.RenderActionTable
        columns={ActionTable.getTableColumns()}
        data={ActionTable.getTableData(
          this.props.triggers[row.original._id].actions
        )}
      />
    );
    //renderActionTable((columns = {}), (data = {}));
  };
  // data={this.getActionTableData(3)}

  render() {
    return (
      <div className='link EventPreview'>
        {' '}
        //onClick={this.handleClick}>
        <div className='event-name'>
          <h3>Event Name</h3> {this.props.name}
        </div>
        <div className='event-desc'>
          <h3>Event Description</h3> {this.props.description}
        </div>
        <h3 className='event-triggers'>Triggers</h3>
        <TriggerTable.RenderTriggerTable
          columns={TriggerTable.getTableColumns()}
          data={TriggerTable.getTableData(this.props.triggers)}
          renderRowSubComponent={this.renderRowSubComponent}
        />
        <DialogTrigger />
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
