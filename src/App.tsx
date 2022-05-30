import ButtonDemo from "./components/Button";
import "./App.css";
import { createContext, useContext } from "react";
import { atom, RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import produce from "immer";
import { ChakraProvider } from "@chakra-ui/react";

import "./blueprint-trimmed.css";

export type LibType = "mui" | "chakra" | "daisy" | "blueprint"; //...

export const libsState = atom<LibType[]>({
  key: "libsState",
  default: ["mui", "blueprint", "daisy", "chakra"],
});

function App() {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="navbar bg-base-300 fixed">
          <div className="flex-none">
            <label
              htmlFor="my-drawer"
              className="btn btn-square btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-none">
            <a className="btn btn-ghost normal-case text-xl">React-UIs</a>
            <span className="text-sm">Compare React UI libraries</span>
          </div>
        </div>
        <main className="m-4 pt-16 flex gap-4">
          <RecoilRoot>
            <Demo id={1} />
            <Demo id={2} />
            <Demo id={3} />
            <Demo id={4} />
          </RecoilRoot>
        </main>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu menu-compact p-4 overflow-y-auto w-60 bg-base-300 text-base-content">
          <li>
            <a className="active">Buttons</a>
          </li>
          <li>
            <a>...</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export const IndexContext = createContext(0);

function Demo({ id }: { id: number }) {
  const [libs, setLibs] = useRecoilState(libsState);
  const innerDemo = (
    <div className="container p-4 bg-base-100 shadow-xl rounded-lg">
      <div className="flex flex-col gap-4">
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) =>
            setLibs(
              produce(libs, (draft) => {
                draft[id] = e.currentTarget.value as LibType;
              })
            )
          }
          value={libs[id]}
        >
          <option value="mui">Material UI</option>
          <option value="blueprint">Blueprint</option>
          <option value="daisy">Daisy UI</option>
          <option value="chakra">Chakra UI</option>
        </select>
        <div>
          <IndexContext.Provider value={id}>
            <ButtonDemo />
          </IndexContext.Provider>
        </div>
      </div>
    </div>
  );
  if (libs[id] === "chakra") {
    return <ChakraProvider>{innerDemo}</ChakraProvider>;
  } else {
    return innerDemo;
  }
}

export const useLib = () => {
  const libs = useRecoilValue(libsState);
  const index = useContext(IndexContext);
  return libs[index] || "mui";
};

export default App;
