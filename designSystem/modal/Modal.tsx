import React from "react";
import { Integration, Integrations } from "../../utils/db";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "./PrimitiveModal";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Input, Label, Fieldset, Button, Flex, IconButton } from "../styles";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: Integration;
  children: React.ReactNode;
}

function Modal({ open, setOpen, item, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="flex">
          {item.icon}
          <p className="mx-2 self-center">{item.title}</p>
        </DialogTitle>
        <DialogDescription>{item.desc}</DialogDescription>
        <Fieldset>
          <Label htmlFor="name">username</Label>
          <Input id="name" className="smooth" />
        </Fieldset>
        <Flex css={{ marginTop: 25, justifyContent: "flex-end" }}>
          <DialogClose asChild>
            <Button variant="black">Save changes</Button>
          </DialogClose>
        </Flex>
        <DialogClose asChild>
          <IconButton aria-label="Close">
            <Cross2Icon />
          </IconButton>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
