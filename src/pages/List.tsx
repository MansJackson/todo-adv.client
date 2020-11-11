import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsLoadingA, connectSocketA, closeSocketA } from '../actions';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import { List, ListProps, RootState } from '../types';
import NotFound from './NotFound';

const ListPage: React.FunctionComponent<ListProps> = (props): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState<List | null>(null);
  const [err, setErr] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [itemText, setItemText] = useState('');

  const { socket, connectSocket, closeSocket } = props;

  useEffect(() => {
    fetch(`http://localhost:8000/api/lists/${id}`, { credentials: 'include' })
      .then((res) => {
        if (res.status === 200) return res.json();
        setErr(true);
        return false;
      }).then((data: { list: List } | false) => {
        if (data) {
          setListData(data.list);
          connectSocket();
        }
        setIsLoading(false);
      }).catch(() => {
        setErr(true);
        setIsLoading(false);
      });
    return () => {
      closeSocket(socket);
    };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (err || !listData) return <NotFound />;

  const { title, items } = listData;

  const addItem = () => {
    // emit request with socket
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
            ? items.map((el) => <p>{el}</p>)
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
  connectSocket: connectSocketA,
  closeSocket: closeSocketA,
})(ListPage);
