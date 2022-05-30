import { /*lazy,*/ ReactNode } from "react";
// const MuiButton = lazy(() => import("@mui/material/Button"));
import MuiButton from "@mui/material/Button";
import { Button as ChakraButton } from "@chakra-ui/react";
import { Button as BlueprintButton, Intent } from "@blueprintjs/core";
import { useLib } from "../App";

const docs = {
  mui: "https://mui.com/material-ui/react-button/",
  blueprint: "https://blueprintjs.com/docs/#core/components/button",
  daisy: "https://daisyui.com/components/button/",
  chakra: "https://chakra-ui.com/docs/components/form/button",
};

const variants = ["outlined", "ghost"];
const colors = ["primary", "secondary", "success", "warning", "error"];
const sizes = ["large", "medium", "small"];

type ButtonProps = {
  variant?: typeof variants[number];
  color?: typeof colors[number];
  size?: typeof sizes[number];
};

export function Button(
  props: ButtonProps & {
    children?: ReactNode;
  }
) {
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
    case "chakra":
      return (
        <ChakraButton {...toChakra(otherProps)}>{props.children}</ChakraButton>
      );
    default:
      throw Error(`Unknown library "${lib}"`);
  }
}

const toMui = (props: ButtonProps) => ({
  variant: (props.variant
    ? ({ ghost: "text", outlined: "outlined" }[props.variant] as
        | "text"
        | "outlined")
    : "contained") as "contained" | "text" | "outlined",
  color: props.color as
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "inherit"
    | "info"
    | undefined,
  size: props.size as "large" | "medium" | "small" | undefined,
});

const toBlueprint = (props: ButtonProps) => ({
  minimal: props.variant === "ghost",
  outlined: props.variant === "outlined",
  intent: (props.color &&
  ["primary", "success", "warning", "error"].includes(props.color)
    ? props.color === "error"
      ? "danger"
      : props.color
    : "none" || "none") as Intent,
  large: props.size === "large",
  small: props.size === "small",
});

const toDaisy = (props: ButtonProps) => {
  let cn = "btn";
  props.variant &&
    (cn +=
      " " + { outlined: "btn-outline", ghost: "btn-ghost" }[props.variant]);
  props.color &&
    (cn +=
      " " +
      {
        primary: "btn-primary",
        secondary: "btn-secondary",
        success: "btn-success",
        warning: "btn-warning",
        error: "btn-error",
      }[props.color]);
  props.size &&
    (cn +=
      " " + { large: "btn-lg", medium: "btn-md", small: "btn-sm" }[props.size]);
  return cn;
};

const toChakra = (props: ButtonProps) => ({
  size: props.size && { small: "sm", large: "lg" }[props.size],
  variant: props.variant === "outlined" ? "outline" : props.variant,
  colorScheme:
    (props.color &&
      {
        primary: "teal",
        secondary: "purple",
        success: "green",
        warning: "yellow",
        error: "red",
      }[props.color]) ||
    "gray",
});

export default function ButtonDemo() {
  const lib = useLib();
  return (
    <div className="flex flex-col gap-4">
      <a className="link text-xs" href={docs[lib]}>
        {docs[lib]}
      </a>
      <div className="flex gap-4">
        {sizes.map((size) => (
          <div key={`size-${size}`}>
            <Button size={size}>Button</Button>
          </div>
        ))}
      </div>
      {colors.map((color) => (
        <div className="flex gap-4" key={`color-${color}`}>
          {[undefined, ...variants].map((variant) => (
            <div key={`variant-${variant}`}>
              <Button variant={variant} color={color}>
                Button
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
