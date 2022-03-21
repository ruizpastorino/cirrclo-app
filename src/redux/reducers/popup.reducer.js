const popupReducer = (state = false, { type, payload }) => {
  switch (type) {
    case "SET_POPUP":
      return payload;
    case "CLOSE_POPUP":
      return false;
    default:
      return state;
  }
};

export default popupReducer;
