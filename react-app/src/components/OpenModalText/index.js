import React from "react";
import { useModal } from "../../context/Modal";

function OpenModalText({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  myClass,
  modalClass,
}) {
  const { setModalContent, setOnModalClose, setModalClass } = useModal();
  const onClick = () => {
    if (modalClass) setModalClass(modalClass);
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <div onClick={onClick} className={`${myClass}`}>
      {buttonText}
    </div>
  );
}

export default OpenModalText;
