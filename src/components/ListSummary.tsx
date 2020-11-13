import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {
  Avatar,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { ListSummarProps, ListSummaryOwnProps, RootState } from '../types';
import Modal from './Modal';
import '../styles/ListSummary.css';

const useStyles = makeStyles((theme: Theme) => createStyles({
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

type ListSummaryT = React.FunctionComponent<ListSummarProps & ListSummaryOwnProps>;

const ListSummary: ListSummaryT = (props): JSX.Element => {
  const {
    data: {
      id,
      title,
      editors,
      owner,
    },
    socket,
    owned,
  } = props;

  const classes = useStyles();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteEditorModalOpen, setDeleteEditorModalOpen] = useState(false);

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
      <div className="list_summary">
        <div className="list_summary_header">
          <AvatarGroup max={4}>
            <Avatar className={`${classes.small} list_summary_avatar`}>{owner.initials}</Avatar>
            {editors.map((el) => (
              <Avatar key={el.id} className={`${classes.small} list_summary_avatar`}>{el.initials}</Avatar>))}
          </AvatarGroup>
          {owned
            ? <DeleteIcon className="list_summary_deleteBtn" onClick={() => setDeleteModalOpen(true)} color="secondary" />
            : <DeleteIcon className="list_summary_deleteBtn" onClick={() => setDeleteEditorModalOpen(true)} color="secondary" />}
        </div>
        <Link to={`/list/${id}`}>
          <div className="list_summary_body" id={id}>
            <h1>{title}</h1>
          </div>
        </Link>
      </div>
      <Modal isOpen={deleteModalOpen} setOpen={setDeleteModalOpen}>
        <div>
          <p className="confirm_text">Are you sure you want to delete this list</p>
          <div className="confirm_buttons">
            <Button type="button" color="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button type="button" color="primary" onClick={deleteList}>Confirm</Button>
          </div>
        </div>
      </Modal>
      <Modal isOpen={deleteEditorModalOpen} setOpen={setDeleteEditorModalOpen}>
        <div>
          <p className="confirm_text">Are you sure you want to remove your permission to edit this file?</p>
          <div className="confirm_buttons">
            <Button type="button" color="secondary" onClick={() => setDeleteEditorModalOpen(false)}>Cancel</Button>
            <Button type="button" color="primary" onClick={removeFromEditor}>Confirm</Button>
          </div>
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
