import React from 'react';
import PropTypes from 'prop-types';

/* Function component version
const ContestPreview = (contest) => (
  <div className='ContestPreview'>
    <div className='catagory-name'>{contest.categoryName}</div>
    <div className='contest-name'>{contest.contestName}</div>
  </div>
);
*/

// Need a class component version because we need a dynamic event handler
// within a stateless component.
class ContestPreview extends React.Component {
  handleClick = () => {
    // console.log(this.props.contestName);
    // console.log(this.props.id);
    this.props.onClick(this.props._id);
  };
  render() {
    return (
      <div className='link ContestPreview' onClick={this.handleClick}>
        <div className='catagory-name'>{this.props.categoryName}</div>
        <div className='contest-name'>{this.props.contestName}</div>
      </div>
    );
  }
}

ContestPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ContestPreview;
