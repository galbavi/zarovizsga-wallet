import React, { useCallback, useContext, useState } from "react";
import { ConfirmModal } from "../modals/ConfirmModal";
import { ErrorModal } from "../modals/ErrorModal";
import { WalletModal } from "../modals/WalletModal";
import { TransactionModal } from "../modals/TransactionModal";
import { ShareModal } from "../modals/ShareModal";

const ModalContext = React.createContext();
ModalContext.displayName = "ModalContext";

export const MODALS = {
  NONE: "NONE",
  CONFIRM: "CONFIRM",
  ERROR: "ERROR",
  WALLET: "WALLET",
  TRANSACTION: "TRANSACTION",
  SHARE: "SHARE",
};

export const Modals = () => {
  return (
    <ModalContext.Consumer>
      {(context) => {
        const onClose = () => context.showModal(MODALS.NONE);
        switch (context.currentModal) {
          case MODALS.CONFIRM:
            return <ConfirmModal onClose={onClose} {...context.modalProps} />;
          case MODALS.ERROR:
            return <ErrorModal onClose={onClose} {...context.modalProps} />;
          case MODALS.WALLET:
            return <WalletModal onClose={onClose} {...context.modalProps} />;
          case MODALS.TRANSACTION:
            return (
              <TransactionModal onClose={onClose} {...context.modalProps} />
            );
          case MODALS.SHARE:
            return <ShareModal onClose={onClose} {...context.modalProps} />;
          case MODALS.NONE:
          default:
            return null;
        }
      }}
    </ModalContext.Consumer>
  );
};

export const ModalContextProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState(false);
  const [modalProps, setModalProps] = useState({});
  const showModal = useCallback(
    (newModal, newModalProps = {}) => {
      setModalProps(newModalProps);
      setCurrentModal(newModal);
    },
    [setCurrentModal, setModalProps]
  );
  return (
    <ModalContext.Provider value={{ currentModal, showModal, modalProps }}>
      {children}
      <Modals />
    </ModalContext.Provider>
  );
};

export const useModals = () => {
  return useContext(ModalContext);
};
