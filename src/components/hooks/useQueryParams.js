import { useEffect, useState } from "react";
import { useLocation } from "react-router";

const useQueryParams = () => {
  const [params, setParams] = useState({});
  const location = useLocation();

  useEffect(() => {
    const query = location.search;
    if(query){
    const split = query.replace("?", "").split("&").map((element) => element.split("="));
    const result = {};
    split.forEach(([key, value]) => {
      result[key] = value;
    });
    setParams(result);
    }
  }, [location]);

  return params;
};

export default useQueryParams;
