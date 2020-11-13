import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import { ListItemOwnProps, ListItemProps, RootState } from '../types';
import '../styles/ListItem.css';
import Modal from './Modal';

type ListItemT = React.FunctionComponent<ListItemProps & ListItemOwnProps>;

const ListItem: ListItemT = (props): JSX.Element => {
  const { item: { id, text, completed }, socket, listId } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const toggleCompleted = (e: React.MouseEvent) => {
    // @ts-ignore
    // eslint-disable-next-line
    if (e.target.parentNode.classList.contains('list_item_deleteBtn')
      // @ts-ignore
      // eslint-disable-next-line
      || e.target.classList.contains('list_item_deleteBtn')) return;
    socket.emit('toggleCompleted', listId, id);
  };

  const deleteItem = () => {
    socket.emit('deleteItem', listId, id);
    setModalOpen(false);
  };

  return (
    <>
      <div onClick={toggleCompleted} className={`list_item ${completed ? 'completed' : ''}`}>
        <DeleteIcon color="secondary" className="list_item_deleteBtn" onClick={() => setModalOpen(true)} />
        <p>{text}</p>
      </div>
      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <>
          <p className="confirm_text">Are you sure you want to delete this item</p>
          <div className="confirm_buttons">
            <Button type="button" color="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="button" color="primary" onClick={deleteItem}>Confirm</Button>
          </div>
        </>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: RootState, ownProps: ListItemOwnProps) => ({
  item: ownProps.item,
  listId: ownProps.listId,
  socket: state.socket,
});

export default connect(mapStateToProps, {})(ListItem);
