import { atom } from "recoil";
import { libTypes } from "./consts";
import { LibType } from "./types";
import { shuffled } from "./utils";

const initialLibs = shuffled(libTypes.slice()).slice(0, 2);

export const libsState = atom<LibType[]>({
  key: "libsState",
  default: initialLibs,
});
