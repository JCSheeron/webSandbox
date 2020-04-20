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
    // console.log(this.props.onClick);
    this.props.onClick(this.props.id);
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
  id: PropTypes.number.isRequired,
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ContestPreview;
