import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contest extends Component {
  componentDidMount() {
    // Could have component fetch its own names, but we want to keep state
    // in the App component instead. Use passed in function and the nameIds
    this.props.fetchNames(this.props.nameIds);
    //console.log(this.props);
  }
  handleSubmit = (event) => {
    event.preventDefault();
    // read the value that the user typed
    //console.log(`Contest.js newNameInput ${this.refs.newNameInput.value}`);
    //console.log(`Contest.js id ${this.props._id}`);
    // Only do something interesting if the user input is not empty
    if (this.refs.newNameInput.value) {
      this.props.addName(this.refs.newNameInput.value, this.props._id);
    }
    this.refs.newNameInput.value = '';
  };
  render() {
    return (
      <div className='Contest'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Contest Description</h3>
          </div>
          <div className='panel-body'>
            <div className='contest-description'>{this.props.description}</div>
          </div>
        </div>

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Proposed Names</h3>
          </div>
          <div className='panel-body'>
            <ul className='list-group'>
              {this.props.nameIds.map((nameId) => (
                <li key={nameId} className='list-group-item'>
                  {this.props.lookupNameObj(nameId).name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='panel panel-info'>
          <div className='panel-heading'>
            <h3 className='panel-title'>Propose a New Name</h3>
          </div>
          <div className='panel-body'>
            <form onSubmit={this.handleSubmit}>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='New Name Here...'
                  ref='newNameInput'
                  className='form-control'
                />
                <span className='input-group-btn'>
                  <button type='submit' className='btn btn-info'>
                    Sumbit
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className='home-link link' onClick={this.props.contestListClick}>
          Contest List
        </div>
      </div>
    );
  }
}

Contest.propTypes = {
  _id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  contestListClick: PropTypes.func.isRequired,
  fetchNames: PropTypes.func.isRequired,
  nameIds: PropTypes.array.isRequired,
  lookupNameObj: PropTypes.func.isRequired,
  addName: PropTypes.func.isRequired
};

export default Contest;
