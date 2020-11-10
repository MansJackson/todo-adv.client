import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListSummaryOwnProps, RootState } from '../types';

const ListSummary: React.FunctionComponent<ListSummaryOwnProps> = (props): JSX.Element => {
  const { data: { id, title, editors } } = props;

  return (
    <Link to={`/list/${id}`}>
      <div className="dashboard_list" id={id}>
        <h1>{title}</h1>
        {editors
          ? editors.map((el) => (
            <p>{el.split(' ')[0][0] + el.split(' ')[1][0]}</p>
          ))
          : null}
      </div>
    </Link>
  );
};

const mapStateToProps = (state: RootState, ownProps: ListSummaryOwnProps) => ({
  data: ownProps.data,
});

export default connect(mapStateToProps, {
})(ListSummary);
