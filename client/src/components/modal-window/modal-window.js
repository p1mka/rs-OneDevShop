import { Outlet, useNavigate } from "react-router-dom";
import { Icon } from "../icon/icon";
import { useDispatch, useSelector } from "react-redux";
import { setIsModalOpen } from "../../store/actions";
import { selectIsModalOpen } from "../../store/selectors";
import styled from "styled-components";

const ModalWindowContainer = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isModalOpen = useSelector(selectIsModalOpen);

  const onClose = () => {
    navigate("/");
    dispatch(setIsModalOpen(false));
  };
  const onReturn = () => {
    navigate("/authorize");
  };

  return (
    isModalOpen && (
      <div className={className} onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <Icon
            id="la-arrow-circle-left"
            className="modal-back"
            size="24px"
            onClick={onReturn}
          />
          <Icon
            id="la-times-circle"
            className="modal-close"
            size="24px"
            onClick={onClose}
          />

          <div className="modal-content">
            <Outlet />
          </div>
        </div>
      </div>
    )
  );
};

export const ModalWindow = styled(ModalWindowContainer)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.25);
  animation-name: appear;
  animation-duration: 300ms;

  .modal {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem;
    width: 50%;
    max-width: 550px;
    background: white;
    border-radius: 0.25rem;
    max-height: calc(100vh - 40px);
    text-align: center;
    overflow: hidden;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: slide-in;
    animation-duration: 0.5s;
  }

  .modal-back {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 24px;
    background: #f3f2f1;
    border-radius: 10% 0 10% 10%;
  }
  .modal-close {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    background: #f3f2f1;
    border-radius: 10% 0 10% 10%;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
  }

  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-in {
    from {
      transform: translateY(-150px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

// export const ModalWindow = ({ className, header, children, bindElement }) => {
//   const [modalIsOpen, setModalIsOpen] = useState(true);
//   const customStyles = {
//     content: {
//       display: "flex",
//       flexDirection: "column",
//       // alignItems: "center",
//       textAlign: "center",
//       top: "50%",
//       left: "50%",
//       right: "auto",
//       bottom: "auto",
//       width: "30%",
//       height: "30%",
//       transform: "translate(-50%, -50%)",
//     },
//   };
//   Modal.setAppElement(bindElement);

//   const navigate = useNavigate();

//   // const onModalOpen = () => setModalIsOpen(true);

//   const onModalClose = () => {
//     navigate(-1);
//     setModalIsOpen(false);
//   };

//   return (
//     <div className={className}>
//       <Modal
//         ariaHideApp={false}
//         isOpen={modalIsOpen}
//         onRequestClose={onModalClose}
//         style={customStyles}
//         contentLabel={header}
//       >
//         <h2>{header}</h2>
//         <div>{children}</div>
//         <button className="button" onClick={onModalClose}>
//           Закрыть
//         </button>
//       </Modal>
//     </div>
//   );
// };
