import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../types';

const ListDashboard: React.FunctionComponent = (props): JSX.Element => {
  useEffect(() => {
    fetch('http://localhost:8000/api/lists', { credentials: 'include' })
      .then()
  }, [])

  return (
    <div className="dashboard_list">
      <h1>title</h1>
      <ul>
        <li>MJ</li>
        <li>AT</li>
      </ul>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({

});

export default connect(mapStateToProps, {})(ListDashboard);