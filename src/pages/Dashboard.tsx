import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  connectSocketA,
  getListsA, notifyA, postListA,
} from '../actions';
import ListSummary from '../components/ListSummary';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import { DashboardProps, RootState } from '../types';

const Dashboard: React.FunctionComponent<DashboardProps> = (props): JSX.Element => {
  const {
    owned, shared, socket, getLists, postList, notify, connectSocket,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const addList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listTitle || listTitle === '') return; // Can not be empty
    postList(listTitle, (err, data) => {
      if (err) notify('Something went wrong trying to add list');
      if (data) {
        getLists((err2) => {
          if (err2) notify('Could not fetch lists');
        });
      }
      setListTitle('');
      setModalOpen(false);
    });
  };

  useEffect(() => {
    getLists((err) => {
      if (err) {
        notify(err.message);
      } else connectSocket();
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('updateLists', () => {
        getLists((err) => {
          if (err) notify(err.message);
        });
      });
    }
  }, [socket]);

  return (
    <>
      <Navbar />
      <div>
        <h1>Dashboard</h1>
        <button type="button" onClick={() => setModalOpen(true)}>+ New List</button>
        <div>
          <h2>Owned</h2>
          {!owned || !owned.length
            ? <p>No lists abvailable</p>
            : owned.map((el) => <ListSummary key={el.id} data={el} owned />)}
        </div>
        <div>
          <h2>Shared</h2>
          {!shared || !shared.length
            ? <p>No lists abvailable</p>
            : shared.map((el) => <ListSummary key={el.id} data={el} />)}
        </div>
      </div>
      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <div>
          <form onSubmit={(e) => addList(e)}>
            <input value={listTitle} type="text" className="modal_title" onChange={(e) => setListTitle(e.target.value)} />
            <button type="button" className="modal_exitBtn" onClick={() => setModalOpen(false)}>EXIT</button>
            <button type="submit" className="modal_addBtn">ADD</button>
          </form>
        </div>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  owned: state.lists.owned,
  shared: state.lists.shared,
  socket: state.socket,
});

export default connect(mapStateToProps, {
  getLists: getListsA,
  postList: postListA,
  notify: notifyA,
  connectSocket: connectSocketA,
})(Dashboard);
