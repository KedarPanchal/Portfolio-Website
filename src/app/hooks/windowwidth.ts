import { useState, useEffect } from "react";

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function storeNewDimensions() {
      setWindowWidth(window.innerWidth);
    }

    storeNewDimensions();
    window.addEventListener("resize", storeNewDimensions);
    return () => window.removeEventListener("resize", storeNewDimensions);
  }, []);

  return windowWidth;
}
