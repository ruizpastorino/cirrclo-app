import React, { createRef, useEffect, useState } from "react";
import './style.css'

export const StyledInput = React.forwardRef(
  (
    {
      style,
      buttonContent,
      label,
      icon,
      iconColor="success",
      action,
      actionIcon,
      actionVariant = "dark",
      disabledAction,
      focusTrigger,
      textTransform,
      errorMsg,
      inputStyle,
      ...props
    },
    ref
  ) => {
    const innerRef = createRef();

    useEffect(() => {
      if (focusTrigger) {
        innerRef.current.focus();
      }
    }, [focusTrigger]);

    return (
      <div
        style={{ flex: 1, margin: "16px 0px", ...style }}
        className={`column ${props.disabled ? "opacity-low" : ""}`}
      >
        {label && <label >{label}</label>}
        <div style={inputStyle} className="d-flex align-items-center input-wrapper w-100 flex-1">
          {icon && (
            <div style={{ width: "30px" }} className="center-all h-100">
              <i className={`fas display-8 fa-${icon} text-${iconColor}`} />
            </div>
          )}
          <input
            className={`flex-1 w-100 ${textTransform || ""}`}
            {...props}
            ref={ref || innerRef}
          />
          {(action || actionIcon) && (
            <button
              type="button"
              className="icon-button px-2"
              disabled={props.disabled || disabledAction}
              onClick={action}
            >
              <i className={`fas fa-${actionIcon} text-${actionVariant} display-7`} />
            </button>
          )}
        </div>
        {errorMsg && (
          <p className="py-2 text-danger">
            <i className="fas fa-times-circle text-danger" /> {errorMsg}
          </p>
        )}
      </div>
    );
  }
);

export const StyledSelect = ({
  style,
  inputStyle,
  variant = "light",
  label,
  icon,
  action,
  actionIcon = "spider",
  actionVariant = "light",
  disabledAction,
  textTransform,
  ...props
}) => {
  return (
    <div
      style={{ flex: 1, margin: "16px 0px", ...style }}
      className={`column ${props.disabled ? "opacity-low" : ""}`}
    >
      {label && <label>{label}</label>}
      <div className="flex-1 d-flex align-items-center input-wrapper w-100">
        {icon && (
          <div style={{ width: "30px" }} className="center-all h-100">
            <i className={`fas display-8 fa-${icon} text-${variant}`} />
          </div>
        )}
        <select style={inputStyle} className={`flex-1 w-100 ${textTransform || ""}`} {...props}>
          {props.children}
        </select>
        {action && (
          <button
            type="button"
            className="icon-button px-2"
            disabled={props.disabled || disabledAction}
            onClick={action}
          >
            <i className={`fas fa-${actionIcon} text-${actionVariant} display-7`} />
          </button>
        )}
      </div>
    </div>
  );
};

export const StyledTextArea = ({
  style,
  buttonContent,
  label,
  rows = 5,
  focusTrigger,
  ...props
}) => {
  const point = createRef();

  useEffect(() => {
    if (focusTrigger) {
      point.current.focus();
    }
  }, [focusTrigger]);

  return (
    <div
      style={{ flex: 1, margin: "16px 0px", ...style }}
      className={`column ${props.disabled ? "opacity-low" : ""}`}
    >
      {label && <label>{label}</label>}
      <div className="d-flex align-items-center input-wrapper w-100">
        <textarea
          className={`flex-1 w-100 ${props.className}`}
          {...props}
          rows={rows}
          {...props}
        />
      </div>
    </div>
  );
};

export const ImageInput = ({ label, onSelect, style, onRemove }) => {
  const [preview, setPreview] = useState(null);
  const [data, setData] = useState(null);

  const inputRef = createRef();

  const handleImage = (data) => {
    const files = data.target.files;
    if (files.length) {
      onSelect(files[0]);
    }
  };

  const remove = () => {
    setPreview(null);
    setData(null);
    onRemove();
  };

  return (
    <div
      style={{ height: "100px", margin: "16px 0px", ...style }}
      className="w-100 column"
    >
      {label && <label className="font-weight-bold display-9">{label}</label>}
      {!preview ? (
        <>
          <input
            ref={inputRef}
            type="file"
            onChange={handleImage}
            accept=".jpg,.jpeg,.png"
          />
          <div
            className="file-input center-all touchable flex-1 p-2"
            onClick={() => inputRef.current.click()}
          >
            <i className="fas fa-camera text-warning display-7" />
          </div>
        </>
      ) : (
        <div className="w-100 preview-img">
          <img src={preview} className="w-100" />
          <p className="touchable" onClick={remove}>
            <i className="fas fa-trash text-danger mr-1" /> Eliminar {data?.name}
          </p>
        </div>
      )}
    </div>
  );
};
