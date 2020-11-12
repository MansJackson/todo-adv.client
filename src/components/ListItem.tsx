import React from 'react';
import { connect } from 'react-redux';
import { ListItemOwnProps, ListItemProps, RootState } from '../types';

type ListItemT = React.FunctionComponent<ListItemProps & ListItemOwnProps>;

const ListItem: ListItemT = (props): JSX.Element => {
  const { item: { id, text, completed }, socket, listId } = props;

  const toggleCompleted = () => { socket.emit('toggleCompleted', listId, id); };

  return (
    <div onClick={toggleCompleted} className={`list_item ${completed ? 'completed' : ''}`}>
      <p>{text}</p>
    </div>
  );
};

const mapStateToProps = (state: RootState, ownProps: ListItemOwnProps) => ({
  item: ownProps.item,
  listId: ownProps.listId,
  socket: state.socket,
});

export default connect(mapStateToProps, {})(ListItem);
