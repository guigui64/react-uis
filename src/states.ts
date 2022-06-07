import { atom } from "recoil";

export const libTypes = ["blueprint", "chakra", "daisy", "mui"] as const;

export type LibType = typeof libTypes[number];

export const libsState = atom<LibType[]>({
  key: "libsState",
  default: [...libTypes],
});
