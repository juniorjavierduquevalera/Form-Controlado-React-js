import { useState, useEffect } from "react";

const usePreLoad = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 2000);
  }, []);
  return {
    load,
  };
};

export default usePreLoad;
