import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../types'

const ListItem: React.FunctionComponent = (props): JSX.Element => {
  return (
    <div></div>
  );
};

const mapStateToProps = (state: RootState) => ({

});

export default connect(mapStateToProps, {})(ListItem);
