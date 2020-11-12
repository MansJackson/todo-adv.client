import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ModalOwnProps, RootState } from '../types';
import '../styles/Modal.css';

const Modal: React.FunctionComponent<ModalOwnProps & { children: JSX.Element }> = (
  props,
): JSX.Element => {
  const { setOpen, isOpen, children } = props;

  useEffect(() => {
    // eslint-disable-next-line
    document.addEventListener('click', (e: any) => {
      // eslint-disable-next-line
      if (!e.target) return;
      // eslint-disable-next-line
      if (e.target.classList.contains('modal')) setOpen(false);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`modal ${isOpen ? 'modal-open' : 'modal-close'}`}>
      <div className="modal_window">
        {children}
      </div>
    </div>
  );
};

const mapStateToProps = (_state: RootState, ownProps: ModalOwnProps) => ({
  isOpen: ownProps.isOpen,
  setOpen: ownProps.setOpen,
});

export default connect(mapStateToProps, {})(Modal);
