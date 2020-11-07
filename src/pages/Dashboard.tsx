import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../types';

const Dashboard: React.FunctionComponent = (props): JSX.Element => {
  const title = 'Dashboard';

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({

});

export default connect(mapStateToProps, {})(Dashboard);
