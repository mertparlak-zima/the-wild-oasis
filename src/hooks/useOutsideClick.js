import { useRef } from "react";
import { useEffect } from "react";

export default function useOutsideClick({ callBack, listenCapturing = true }) {
  const ref = useRef();
  useEffect(
    function () {
      if (!ref.current) return;

      document.addEventListener(
        "click",
        (e) => {
          if (ref.current && !ref.current.contains(e.target)) {
            callBack();
          }
        },
        listenCapturing
      );

      return () => {
        document.removeEventListener("click", (e) => {}, listenCapturing);
      };
    },
    [ref, callBack, listenCapturing]
  );

  return ref;
}
