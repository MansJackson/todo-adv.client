import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import {
  connectSocketA,
  getListsA, notifyA, postListA,
} from '../redux/actions';
import ListSummary from '../components/ListSummary';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import { DashboardProps, RootState } from '../types';
import '../styles/Dashboard.css';

const Dashboard: React.FunctionComponent<DashboardProps> = (props): JSX.Element => {
  const {
    owned, shared, cookie, getLists, postList, notify, connectSocket,
  } = props;

  const [modalOpen, setModalOpen] = useState(false);
  const [listTitle, setListTitle] = useState('');

  const addList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listTitle || listTitle === '') {
      notify('Field can not be empty');
      return;
    }
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
      } else {
        setTimeout(() => {
          connectSocket(cookie);
        }, 50);
      }
    });
  }, []);

  return (
    <>
      <Navbar filled />
      <div className="wrapper_dashboard">
        <section className="dashboard">
          <h2 className="owned_title">My Lists</h2>
          <div className="dashboard_owned">
            {!owned || !owned.length
              ? null
              : owned.map((el) => <ListSummary key={el.id} data={el} owned />)}
            <div className="dashboard_newBtn" onClick={() => setModalOpen(true)}>+</div>
          </div>
          <h2 className="shared_title">Shared With Me</h2>
          <div className="dashboard_shared">
            {!shared || !shared.length
              ? <p>No lists abvailable</p>
              : shared.map((el) => <ListSummary key={el.id} data={el} />)}
          </div>
        </section>
        <Modal isOpen={modalOpen} setOpen={setModalOpen}>
          <div>
            <form onSubmit={(e) => addList(e)}>
              {/* Fixes material ui bug for some reason */}
              <input autoComplete="false" style={{ visibility: 'hidden' }} />

              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
              />

              <div className="space-2" />

              <div className="confirm_buttons">
                <Button type="button" color="secondary" onClick={() => setModalOpen(false)}>Exit</Button>
                <Button type="submit" color="primary">Add</Button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  owned: state.lists.owned,
  shared: state.lists.shared,
  socket: state.socket,
  cookie: state.cookie,
});

export default connect(mapStateToProps, {
  getLists: getListsA,
  postList: postListA,
  notify: notifyA,
  connectSocket: connectSocketA,
})(Dashboard);
