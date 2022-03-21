import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useCatcher = (formKey, data) => {
  let catcher = JSON.parse(localStorage.getItem("SPIDER_FORMS_CATCHER"));
  const store = (catcher) => localStorage.setItem("SPIDER_FORMS_CATCHER", JSON.stringify(catcher));
  const dispatch = useDispatch();

  const cleanCatcher = () => {
    if (catcher) {
      catcher[formKey] = null;
      store(catcher);
    }
  };

  useEffect(() => {
    if (catcher && catcher[formKey]) {
      dispatch({
        type: "SET_POPUP",
        payload: {
          title: "Carga Pendiente",
          body: "Existe un documento sin completar, desea cargar los Datos?",
          confirm: () => (catcher[formKey] = data),
          cancel: cleanCatcher,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (catcher) {
      catcher[formKey] = data;
    } else {
      catcher = { [formKey]: data };
    }
    store(catcher);
    return cleanCatcher;
  }, [data]);

  return { cleanCatcher };
};

export default useCatcher;
