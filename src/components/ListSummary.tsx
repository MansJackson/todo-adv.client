import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListSummarProps, ListSummaryOwnProps, RootState } from '../types';
import Modal from './Modal';

type ListSummaryT = React.FunctionComponent<ListSummarProps & ListSummaryOwnProps>;

const ListSummary: ListSummaryT = (props): JSX.Element => {
  const { data: { id, title, editors }, socket, owned } = props;

  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteEditorModalOpen, setDeleteEditorModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const addEditor = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('addEditor', inputText, id);
    setEditorModalOpen(false);
  };

  const deleteList = () => {
    socket.emit('deleteList', id);
    setDeleteModalOpen(false);
  };

  const removeFromEditor = () => {
    socket.emit('removeAsEditor', id);
    setDeleteEditorModalOpen(false);
  };

  return (
    <>
      {owned
        ? <button type="button" className="delete_list" onClick={() => setDeleteModalOpen(true)}>-</button>
        : <button type="button" className="remove_editor" onClick={() => setDeleteEditorModalOpen(true)}>-</button>}
      <Link to={`/list/${id}`}>
        <div className="dashboard_list" id={id}>
          <h1>{title}</h1>
          {editors
            ? editors.map((el) => (
              <p>{el.initials}</p>
            ))
            : null}
        </div>
      </Link>
      <button type="button" className="addEditor_btn" onClick={() => setEditorModalOpen(true)}>+</button>
      <Modal isOpen={editorModalOpen} setOpen={setEditorModalOpen}>
        <form onSubmit={addEditor}>
          <input placeholder="Email" type="text" onChange={(e) => setInputText(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      </Modal>
      <Modal isOpen={deleteModalOpen} setOpen={setDeleteModalOpen}>
        <div>
          <p>Are you sure you want to delete this list</p>
          <button type="button" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
          <button type="button" onClick={deleteList}>Confirm</button>
        </div>
      </Modal>
      <Modal isOpen={deleteEditorModalOpen} setOpen={setDeleteEditorModalOpen}>
        <div>
          <p>Are you sure you want to remove your permission to edit this file?</p>
          <button type="button" onClick={() => setDeleteEditorModalOpen(false)}>Cancel</button>
          <button type="button" onClick={removeFromEditor}>Confirm</button>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: RootState, ownProps: ListSummaryOwnProps) => ({
  data: ownProps.data,
  socket: state.socket,
  owned: ownProps.owned,
});

export default connect(mapStateToProps, {})(ListSummary);
