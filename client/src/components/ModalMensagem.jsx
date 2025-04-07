import React from "react";

function ModalMensagem({ titulo, mensagem, onClose,tipo}) {
  return (
    <>
      {/* Modal principal */}
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1050,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className={`modal-header ${tipo}`}>
              <h5 className="modal-title">{titulo || "Atenção"}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body">
              <p>{mensagem || "Algo deu errado."}</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className={`btn btn-secondary ${tipo}`}
                onClick={onClose}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalMensagem;
