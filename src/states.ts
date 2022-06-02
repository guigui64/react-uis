import { atom } from "recoil";

export const libTypes = ["mui", "chakra", "daisy", "blueprint"] as const;

export type LibType = typeof libTypes[number];

export const libsState = atom<LibType[]>({
  key: "libsState",
  default: [
    "mui",
    // "blueprint",
    // "daisy",
    "chakra",
  ],
});
