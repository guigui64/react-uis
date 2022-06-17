import { createContext, ReactNode, useContext } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import produce from "immer";
import { ChakraProvider } from "@chakra-ui/react";
import { libsState } from "../states";
import { LibType } from "../types";
import { displayNames, libTypes } from "../consts";
import { CssVarsProvider } from "@mui/joy";

export const IndexContext = createContext(0);

export const useLib = () => {
  const libs = useRecoilValue(libsState);
  const index = useContext(IndexContext);
  return libs[index] || "mui";
};

function Demo({ id, children }: { id: number; children: ReactNode }) {
  const [libs, setLibs] = useRecoilState(libsState);
  const availableLibs = libTypes.filter((lib) => !libs.includes(lib));
  const innerDemo = (
    <div data-theme="light" className="p-4 bg-base-100 shadow-xl rounded-lg">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 min-w-min">
          <select
            className="select select-bordered max-w-xs flex-grow"
            onChange={(e) =>
              setLibs(
                produce(libs, (draft) => {
                  draft[id] = e.currentTarget.value as LibType;
                })
              )
            }
            value={libs[id]}
          >
            {[libs[id], ...availableLibs].map((lib) => (
              <option key={lib} value={lib}>
                {displayNames[lib]}
              </option>
            ))}
          </select>
          <button
            className={
              "btn btn-sm btn-circle btn-ghost text-content/50" +
              (libs.length === 1 ? " opacity-0" : "")
            }
            onClick={() =>
              setLibs((libs) => libs.filter((lib) => lib !== libs[id]))
            }
            disabled={libs.length === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div>
          <IndexContext.Provider value={id}>{children}</IndexContext.Provider>
        </div>
      </div>
    </div>
  );
  if (libs[id] === "chakra") {
    return <ChakraProvider>{innerDemo}</ChakraProvider>;
  } else if (libs[id] === "joy") {
    return <CssVarsProvider>{innerDemo}</CssVarsProvider>;
  } else {
    return innerDemo;
  }
}

export default function DemoGroup({
  element,
}: {
  element: (lib: LibType) => ReactNode;
}) {
  const [libs, setLibs] = useRecoilState(libsState);
  const availableLibs = libTypes.filter((lib) => !libs.includes(lib));
  return (
    <div className="flex flex-wrap gap-4">
      {libs.map((lib, i) => (
        <Demo id={i} key={i}>
          {element(lib)}
        </Demo>
      ))}
      {libs.length < libTypes.length && (
        <button
          className="btn btn-ghost btn-circle my-auto min-h-full"
          onClick={() => setLibs((libs) => [...libs, availableLibs[0]])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
