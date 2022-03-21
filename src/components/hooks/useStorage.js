const useStorage = (key) => {
  const get = () => JSON.parse(localStorage.getItem(key));

  const update = (doc) => localStorage.setItem(key, JSON.stringify(doc));

  const add = (doc) => {
    const prev = get();
    if (prev && Array.isArray(prev)) {
      update([...prev, doc]);
    } else {
      update([doc]);
    }
  };

  const data = get();

  return { update, add, data, get };
};

export default useStorage;
