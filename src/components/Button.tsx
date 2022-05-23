import { lazy, ReactNode } from "react";
// const MuiButton = lazy(() => import("@mui/material/Button"));
import MuiButton from "@mui/material/Button";
import { Button as BlueprintButton } from "@blueprintjs/core";
import { useLib } from "../App";

type ButtonProps = {
  variant?: "ghost" | "outlined";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  size?: "large" | "medium" | "small";
};

function Button(
  props: ButtonProps & {
    children?: ReactNode;
  }
): ReactNode {
  const { children, ...otherProps } = props;
  const lib = useLib();
  switch (lib) {
    case "mui":
      return <MuiButton {...toMui(otherProps)}>{props.children}</MuiButton>;
    case "blueprint":
      return (
        <BlueprintButton {...toBlueprint(otherProps)}>
          {props.children}
        </BlueprintButton>
      );
    case "daisy":
      return <button className={toDaisy(otherProps)}>{props.children}</button>;
    default:
      throw Error(`Unknown library "${lib}"`);
  }
}

const toMui = (props: ButtonProps) => ({
  variant: { undefined: "contained", ghost: "text", outlined: "outlined" }[
    props.variant
  ] as "contained" | "text" | "outlined",
  color: props.color,
  size: props.size,
});

const toBlueprint = (props: ButtonProps) => ({
  minimal: props.variant === "ghost",
  outlined: props.variant === "outlined",
  intent: props.color,
  size: { small: "small", large: "large", medium: "regular" }[props.size],
});

const toDaisy = (props: ButtonProps) => {
  let cn = "btn";
  if (props.variant) {
    cn += " " + { outlined: "btn-outline", ghost: "btn-ghost" }[props.variant];
  }
  return cn;
};

export default Button;
