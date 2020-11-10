import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { notifyA, setOwnedListA, setSharedListA } from '../actions';
import ListSummary from '../components/ListSummary';
import Modal from '../components/Modal';
import { DashboardProps, List, RootState } from '../types';

const Dashboard: React.FunctionComponent<DashboardProps> = (props): JSX.Element => {
  const {
    owned, shared, setOwned, setShared, notify,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const getLists = useCallback(() => {
    fetch('http://localhost:8000/api/lists', { credentials: 'include' })
      .then((res) => {
        if (res.status === 204) return false; // Something went wrong
        return res.json();
      })
      .then((data: { owned: List[], shared: List[] } | false) => {
        if (!data) return;
        setOwned(data.owned);
        setShared(data.shared);
      })
      .catch((err: Error) => notify(err.message));
  }, [setOwned, setShared, notify]);

  const addList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listTitle || listTitle === '') return; // Can not be empty
    fetch('http://localhost:8000/api/lists', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ title: listTitle }),
    })
      .then((res) => {
        if (res.status === 201) {
          notify('List has been created');
          getLists();
        } else {
          notify('Something went wrong');
        }
        setModalOpen(false);
      })
      .catch(() => notify('Something went wrong, try again later'));
  };

  useEffect(() => {
    getLists();
  }, [getLists]);

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <button type="button" onClick={() => setModalOpen(true)}>+ New List</button>
        <div>
          <h2>Owned</h2>
          {!owned || !owned.length
            ? <p>No lists abvailable</p>
            : owned.map((el) => <ListSummary key={el.id} data={el} />)}
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
            <input type="text" className="modal_title" onChange={(e) => setListTitle(e.target.value)} />
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
});

export default connect(mapStateToProps, {
  setOwned: setOwnedListA,
  setShared: setSharedListA,
  notify: notifyA,
})(Dashboard);
