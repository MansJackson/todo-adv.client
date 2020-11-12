import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListSummarProps, ListSummaryOwnProps, RootState } from '../types';
import Modal from './Modal';

type ListSummaryT = React.FunctionComponent<ListSummarProps & ListSummaryOwnProps>;

const ListSummary: ListSummaryT = (props): JSX.Element => {
  const { data: { id, title, editors }, socket } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');

  const addEditor = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('addEditor', inputText, id);
    setModalOpen(false);
  };

  return (
    <>
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
      <button type="button" className="addEditor_btn" onClick={() => setModalOpen(true)}>+</button>
      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <form onSubmit={addEditor}>
          <input placeholder="Email" type="text" onChange={(e) => setInputText(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: RootState, ownProps: ListSummaryOwnProps) => ({
  data: ownProps.data,
  socket: state.socket,
});

export default connect(mapStateToProps, {})(ListSummary);
