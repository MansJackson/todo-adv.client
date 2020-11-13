import { Avatar, Button, TextField } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Cursor from '@material-ui/icons/TouchApp';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListA, notifyA, setAmIOwnerA } from '../actions';
import ListItem from '../components/ListItem';
import Modal from '../components/Modal';
import Navbar from '../components/Navbar';
import { List, ListProps, RootState } from '../types';
import NotFound from './NotFound';
import '../styles/List.css';

const ListPage: React.FunctionComponent<ListProps> = (props): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState<List | null>(null);
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editorModalOpen, setEditorModalOpen] = useState(false);
  const [removeEditorModalOpen, setRemoveEditorModalOpen] = useState(false);
  const [selectedEditor, setSelectedEditor] = useState('');
  const [inputText, setInputText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [myId, setMyId] = useState('');

  const {
    getList, notify, setAmIOwner, amIOwner, socket,
  } = props;

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:8000/api/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => { setMyId(data); })
      .catch(() => null);
    getList(id, (err, data) => {
      if (err) window.location.href = '/';
      if (data) {
        setListData(data);
        socket.emit('joinRoom', id);

        window.addEventListener('mousemove', (e) => {
          setMousePosition({ x: e.clientX, y: e.clientY });
        });

        socket.on('notification', (msg: string) => {
          notify(msg);
        });

        socket.on('updateList', () => {
          getList(id, (err2, data2) => {
            if (err2) notify(err2.message);
            if (data2) setListData(data2);
          });
        });

        socket.on('isOwner', (payload: boolean) => {
          setAmIOwner(payload);
        });
      }
      setIsLoading(false);
    });
    return () => {
      if (socket) socket.emit('leaveRoom', id);
      window.removeEventListener('mousemove', (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
  }, []);

  useEffect(() => {
    socket.emit('changeMousePosition', id, mousePosition);
  }, [mousePosition]);

  if (isLoading) return <p>Loading...</p>;
  if (!listData) return <NotFound />;

  const {
    title,
    items,
    owner,
    editors,
  } = listData;

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('addItem', id, inputText);
    setInputText('');
    setItemModalOpen(false);
  };

  const addEditor = (e: React.FormEvent) => {
    e.preventDefault();
    socket.emit('addEditor', inputText, id);
    setInputText('');
    setEditorModalOpen(false);
  };

  const removeEditor = () => {
    socket.emit('removeEditor', selectedEditor, id);
    setRemoveEditorModalOpen(false);
  };

  const renderCursors = (): JSX.Element[] => {
    const onlinePeople = [];
    if (!amIOwner) onlinePeople.push(owner);
    editors.forEach((el) => {
      if (el.connected && el.id !== myId) onlinePeople.push(el);
    });
    return onlinePeople.map((el, i) => (
      <Cursor key={el.id} style={{ position: 'fixed', left: `${el.mousePosition.x}px`, top: `${el.mousePosition.y}px` }} className={`color-${i + 1}`} />
    ));
  };

  const renderAvatars = (): JSX.Element => {
    if (amIOwner) {
      return (
        <div className="navbar_avatars">
          <AvatarGroup>
            <Avatar className="clickable" onClick={() => setEditorModalOpen(true)}>+</Avatar>
            <Avatar className={owner.connected ? 'list_summary_avatar bg-1' : 'list_summary_avatar-disconnected'}>{owner.initials}</Avatar>
            {editors.map((el, i) => (
              <Avatar
                key={el.id}
                className={el.connected ? `list_summary_avatar clickable bg-${i + 2}` : 'list_summary_avatar-disconnected clickable'}
                onClick={() => {
                  setSelectedEditor(el.id);
                  setRemoveEditorModalOpen(true);
                }}
              >
                {el.initials}
              </Avatar>
            ))}
          </AvatarGroup>
        </div>
      );
    }
    return (
      <div className="navbar_avatars">
        <AvatarGroup>
          <Avatar className={owner.connected ? 'list_summary_avatar bg-1' : 'list_summary_avatar-disconnected'}>{owner.initials}</Avatar>
          {editors.map((el, i) => (
            <Avatar key={el.id} className={el.connected ? `list_summary_avatar bg-${i + 2}` : 'list_summary_avatar-disconnected'}>{el.initials}</Avatar>))}
        </AvatarGroup>
      </div>
    );
  };

  return (
    <div className="wrapper_dashboard">
      <Navbar filled>
        {renderAvatars()}
      </Navbar>
      <div className="list">
        <header className="list_header">
          <h1>{title}</h1>
        </header>
        <section className="list_body">
          <div className="list-addItem" onClick={() => setItemModalOpen(true)}>+</div>
          {items && items.length
            ? items.map((el) => <ListItem key={el.id} item={el} listId={id} />)
            : null}
        </section>
      </div>
      <Modal isOpen={itemModalOpen} setOpen={setItemModalOpen}>
        <form onSubmit={addItem}>
          {/* Fixes material ui bug for some reason */}
          <input autoComplete="false" style={{ visibility: 'hidden' }} />

          <TextField
            fullWidth
            label="To Do"
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="space-2" />

          <div className="confirm_buttons">
            <Button type="button" color="secondary" onClick={() => setItemModalOpen(false)}>Exit</Button>
            <Button type="submit" color="primary">Add</Button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={editorModalOpen} setOpen={setEditorModalOpen}>
        <form onSubmit={addEditor}>
          {/* Fixes material ui bug for some reason */}
          <input autoComplete="false" style={{ visibility: 'hidden' }} />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <div className="space-2" />

          <div className="confirm_buttons">
            <Button type="button" color="secondary" onClick={() => setEditorModalOpen(false)}>Exit</Button>
            <Button type="submit" color="primary">Add</Button>
          </div>
        </form>
      </Modal>
      <Modal isOpen={removeEditorModalOpen} setOpen={setRemoveEditorModalOpen}>
        <div>
          <p className="confirm_text">Are you sure you want to remove this user</p>
          <div className="confirm_buttons">
            <Button type="button" color="secondary" onClick={() => setRemoveEditorModalOpen(false)}>Cancel</Button>
            <Button type="button" color="primary" onClick={removeEditor}>Confirm</Button>
          </div>
        </div>
      </Modal>
      {renderCursors()}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  socket: state.socket,
  amIOwner: state.amIOwner,
});

export default connect(mapStateToProps, {
  getList: getListA,
  notify: notifyA,
  setAmIOwner: setAmIOwnerA,
})(ListPage);
