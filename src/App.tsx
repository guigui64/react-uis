import ButtonDemo from "./components/Button";
import "./App.css";
import { createContext, useContext } from "react";
import { atom, RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import produce from "immer";

export type LibType = "mui" | "chakra" | "daisy" | "blueprint"; //...

export const libsState = atom<LibType[]>({
  key: "libsState",
  default: ["mui", "blueprint", "daisy"],
});

function App() {
  return (
    <main className="container m-4">
      <div className="flex gap-4">
        <RecoilRoot>
          <Demo id={1} />
          <Demo id={2} />
          <Demo id={3} />
        </RecoilRoot>
      </div>
    </main>
  );
}

export const IndexContext = createContext(0);

function Demo({ id }: { id: number }) {
  const [libs, setLibs] = useRecoilState(libsState);
  return (
    <div className="container m-4">
      <div className="flex flex-col gap-4">
        <select
          className="select select-ghost w-full max-w-xs"
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
}

export const useLib = () => {
  const libs = useRecoilValue(libsState);
  const index = useContext(IndexContext);
  return libs[index] || "mui";
};

export default App;
