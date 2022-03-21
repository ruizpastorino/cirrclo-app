import React from 'react'
import './styles.css'

const ModalBody = ({
  style,
  close,
  lock,
  form,
  duplicate,
  lockAction,
  cancelButtonTitle,
  extraButtonTitle,
  extraButtonColor,
  extraButtonAction,
  disabledExtraButton,
  confirmTitle,
  confirm,
  disabledConfirm,
  hideButtons,
  title,
  children,
  footer,
  bodyClassName,
  autoClose,
  useKeyEnter,
}) => {
  const windowRef = React.createRef()
  const closeWindow = () => {
    windowRef.current.className += ' show-down'
    setTimeout(() => {
      close()
    }, 250)
  }

  const handleConfirm = () => {
    if (!disabledConfirm) {
      confirm()
      if (autoClose) {
        close()
      }
    }
  }

  return (
    <div className="modal-outside">
      <Wrapper
        form={form}
        ref={windowRef}
        style={{ width: '450px', ...style }}
        className="modal-window"
      >
        <div className="d-flex justify-content-between align-items-center w-100 p-2 bg-dark">
          <h6 className="flex-1 m-0  text-white">{title}</h6>
          {duplicate && <i className="fas fa-copy touchable mr-2" onClick={duplicate} />}
          {lockAction && (
            <i
              className={`fas fa-${lock ? 'lock' : 'lock-open'} mr-2 touchable`}
              onClick={lockAction}
            />
          )}
          <i className="fas fa-times touchable" onClick={closeWindow} />
        </div>
        {/* content */}
        <div
          className={`flex-1 d-flex flex-column flex-nowrap scroll-area p-4  ${
            bodyClassName || ''
          }`}
          onKeyDown={(e) =>
            e.keyCode === 13 && useKeyEnter ? handleConfirm() : null
          }
        >
          {children}
        </div>
        {!hideButtons && (
          <div className="d-flex w-100 justify-content-end p-4">
            <button
              type="button"
              style={{ maxWidth: '200px' }}
              className="flex-1 mr-2 btn btn-light"
              onClick={closeWindow}
            >
              {cancelButtonTitle || 'Cancel'}
            </button>
            {extraButtonTitle && (
              <button
                type="button"
                disabled={disabledExtraButton}
                style={{ maxWidth: '200px' }}
                className={`flex-1 mr-2 btn btn-${extraButtonColor || 'light'}`}
                onClick={extraButtonAction}
              >
                {extraButtonTitle}
              </button>
            )}
            <button
              type="button"
              disabled={disabledConfirm}
              style={{ maxWidth: '200px' }}
              className="flex-1 btn btn-warning"
              onClick={handleConfirm}
            >
              {confirmTitle || 'Confirm'}
            </button>
          </div>
        )}
        <p className="text-center text-secondary my-3">{footer}</p>
      </Wrapper>
    </div>
  )
}

export default ModalBody

const Wrapper = React.forwardRef(
  ({ className, style, children, form }, ref) => {
    if (form) {
      return (
        <form ref={ref} {...{ className, style }}>
          {children}
        </form>
      )
    } else {
      return (
        <div ref={ref} {...{ className, style }}>
          {children}
        </div>
      )
    }
  },
)
