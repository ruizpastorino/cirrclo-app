const useDataHandler = (handler) => (e) => {
  const { name, value, type } = e.target;
  let content = value;
  if (e.target.getAttribute("type") === "number" || type === "number") {
    content = Number(value);
  } else if (type === "text") {
    content = value.toLowerCase();
  }
  handler((state) => {
    state[name] = content;
    return { ...state };
  });
};

export default useDataHandler;
