import { atom } from "recoil";

export const libTypes = ["blueprint", "chakra", "daisy", "mui", "joy"] as const;
export const displayNames = {
  mui: "Material UI",
  blueprint: "Blueprint",
  daisy: "Daisy UI",
  chakra: "Chakra UI",
  joy: "Joy UI",
};

export type LibType = typeof libTypes[number];

export const libsState = atom<LibType[]>({
  key: "libsState",
  default: [...libTypes],
});
