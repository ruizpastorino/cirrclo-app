import React from "react";
import { useCallback } from "react";

const Popup = ({
  close,
  timer = 1000,
  detail,
  message,
  icon,
  iconColor = "warning",
  cancelTitle = "Cancelar",
  confirmTitle = "Confirmar",
  cancel,
  confirm,
  okButton,
}) => {
  const windowWrapper = React.useRef();

  const closeWindow = useCallback(() => {
    if (cancel) cancel();
    windowWrapper.current.className += " show-down";
    setTimeout(() => {
      close();
    }, 200);
  }, []);

  React.useEffect(() => {
    if (!confirm && !okButton && timer ) {
      setTimeout(closeWindow, timer);
    }
  }, []);

  return (
    <div className="modal-outside">
      <div style={styleWindow} ref={windowWrapper} className="modal-window py-5">
        <div className="center-all column px-5">
          {icon && <i className={`${icon} display-2 text-${iconColor} mb-2`} />}
          <h5 className="display-7 strong-text text-center my-2">{message}</h5>
          {detail && <p className="my-2 text-center text-break w-100">{detail}</p>}
        </div>
        {okButton && (
          <div className="text-center w-100 px-5 mt-3">
            <button className="btn btn-warning flex-1 mr-2" onClick={closeWindow}>
              Entendido
            </button>
          </div>
        )}
        {confirm && (
          <div className="d-flex w-100 px-5 mt-3">
            <button className="btn btn-light flex-1 mr-2" onClick={closeWindow}>
              {cancelTitle}
            </button>
            <button
              className="btn btn-success flex-1"
              onClick={() => {
                close();
                setTimeout(confirm, 0);
              }}
            >
              {confirmTitle}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;

const styleWindow = {
  minWidth: "350px",
  maxWidth: "500px",
  minHeight: "200px",
  borderRadius: "5px",
  backgroundColor: "#404040",
};
