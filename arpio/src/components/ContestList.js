import React from 'react';
import PropTypes from 'prop-types';

import ContestPreview from './ContestPreview';

const ContestList = ({ contests, onContestClick }) => (
  // use if contests is an array of contests
  //<div className='ContestList'>
  //  {contests.map((contest) => (
  //    <ContestPreview key={contest.id} onClck={onContestClick} {...contest} />
  //  ))}
  //</div>
  // use if contests is an object full of contests with an id key
  <div className='ContestList'>
    {Object.keys(contests).map((contestId) => (
      <ContestPreview
        key={contestId}
        onClick={onContestClick}
        {...contests[contestId]}
      />
    ))}
  </div>
);

ContestList.propTypes = {
  // use one if contests is an array or object
  // contests: PropTypes.array
  contests: PropTypes.object,
  onContestClick: PropTypes.func.isRequired
};

export default ContestList;
