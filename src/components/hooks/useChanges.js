import { useEffect, useState } from "react";

const useChanges = (reference, data, defaults = []) => {
  const [changes, setChanges] = useState();

  const evaluate = (previous, current) => {
    const type = Array.isArray(current) ? "array" : typeof current;

    switch (type) {
      case "object":
        const buffer = {};

        const keys = Object.keys(previous).concat(Object.keys(current)).shorten();
        keys.forEach((key) => {
          if (previous.hasOwnProperty(key) && typeof previous[key] === typeof current[key]) {
            const changed = evaluate(previous[key], current[key]);
            if ((changed || changed === "" || changed === 0) && !defaults.includes(key)) {
              buffer[key] = changed;
            }
          } else {
            buffer[key] = current[key];
          }
        });

        if (Object.keys(buffer).length) {
          defaults.forEach((key) => {
            if (current[key]) {
              buffer[key] = current[key];
            }
          });
          return buffer;
        }

        break;

      case "array":
        const existChange = current.find(
          (doc, idx) => !previous[idx] || evaluate(previous[idx], doc)
        );
        if (existChange) return current;
        return existChange;

      default:
        if (previous !== current) {
          return current;
        }
        break;
    }
  };

  useEffect(() => {
    setChanges(evaluate(reference, data));
  }, [data]);

  return changes;
};

export default useChanges;
