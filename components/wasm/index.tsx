import { ReactNode, useEffect, useRef } from "react";
import { wasmReady } from "redux/feature/status";
import store from "redux/store";

interface Props {
  children: ReactNode;
}
const Wasm = (props: Props) => {
  const func = useRef(() => {
    let timer = setInterval(() => {
      let { Go } = global as any;
      if (!Go) return console.log("WASM not found.");
      const go = new Go();
      const WASM_URL = "/wasm/zecreyLegend.wasm";

      var wasm: WebAssembly.Instance;

      if ("instantiateStreaming" in WebAssembly) {
        WebAssembly.instantiateStreaming(fetch(WASM_URL), go.importObject).then(
          function (obj) {
            wasm = obj.instance;
            go.run(wasm);
            store.dispatch(wasmReady());
            clearInterval(timer);
          }
        );
      } else {
        fetch(WASM_URL)
          .then((resp) => resp.arrayBuffer())
          .then((bytes) =>
            WebAssembly.instantiate(bytes, go.importObject).then(function (
              obj
            ) {
              wasm = obj.instance;
              go.run(wasm);
              store.dispatch(wasmReady());
              clearInterval(timer);
            })
          );
      }
    }, 1000);
  }).current;

  useEffect(() => func(), []);

  return <>{props.children}</>;
};

export default Wasm;
