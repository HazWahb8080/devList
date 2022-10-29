import { styled, keyframes } from "@stitches/react";
import { violet, blackA, mauve, green, gray } from "@radix-ui/colors";

export const Flex = styled("div", { display: "flex" });
export const Box = styled("div", {});
export const IconButton = styled("button", {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: violet.violet11,
  position: "absolute",
  top: 10,
  right: 10,

  "&:hover": { backgroundColor: violet.violet4 },
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

export const Fieldset = styled("fieldset", {
  all: "unset",
  display: "flex",
  gap: 20,
  alignItems: "center",
  marginBottom: 15,
});

export const Label = styled("label", {
  fontSize: 15,
  color: gray.gray12,
  width: 90,
  textAlign: "right",
});

export const Input = styled("input", {
  all: "unset",
  width: "100%",
  flex: "1",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: gray.gray12,
  boxShadow: `0 0 0 1px ${gray.gray7}`,
  height: 35,
  border: "1px solid transparent",
  "&:hover": {
    border: `1px solid ${gray.gray10}`,
    backgroundColor: gray.gray1,
  },
  "&:focus": {
    border: `1px solid ${gray.gray10}`,
    backgroundColor: gray.gray1,
  },
});
export const Button = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,
  cursor: "pointer",
  variants: {
    variant: {
      violet: {
        backgroundColor: "white",
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        "&:hover": { backgroundColor: mauve.mauve3 },
        "&:focus": { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
      black: {
        backgroundColor: gray.gray12,
        color: gray.gray1,
        "&:hover": { backgroundColor: gray.gray8, color: gray.gray12 },
        "&:focus": { boxShadow: `0 0 0 2px ${gray.gray7}` },
      },
    },
  },

  defaultVariants: {
    variant: "violet",
  },
});
