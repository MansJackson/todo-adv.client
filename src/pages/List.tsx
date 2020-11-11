import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsLoadingA, getListA, notifyA } from '../actions';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import { List, ListProps, RootState } from '../types';
import NotFound from './NotFound';

const ListPage: React.FunctionComponent<ListProps> = (props): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState<List | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemText, setItemText] = useState('');

  const { getList, socket, notify } = props;

  useEffect(() => {
    setIsLoading(true);
    getList(id, (err, data) => {
      if (err) notify(err.message);
      if (data) {
        setListData(data);

        socket.emit('joinRoom', id);

        socket.on('notification', (msg: string) => {
          notify(msg);
        });

        socket.on('updateList', () => {
          getList(id, (err2, data2) => {
            if (err2) notify(err2.message);
            if (data2) setListData(data2);
          });
        });
      }
      setIsLoading(false);
    });
    return () => {
      if (socket) socket.emit('leaveRoom', id);
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!listData) return <NotFound />;

  const { title, items } = listData;

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('addItem', id, itemText);
  };

  return (
    <>
      <Navbar />
      <div>
        <header>
          <h1>{title}</h1>
          <button type="button" onClick={() => setModalOpen(true)}>+</button>
        </header>
        <section>
          {items && items.length
            ? items.map((el) => <p key={el.id}>{el.text}</p>)
            : <p>no items yet</p>}
        </section>
      </div>
      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <form onSubmit={addItem}>
          <input type="text" onChange={(e) => setItemText(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoading: state.isLoading,
  socket: state.socket,
});

export default connect(mapStateToProps, {
  setIsLoading: setIsLoadingA,
  getList: getListA,
  notify: notifyA,
})(ListPage);
