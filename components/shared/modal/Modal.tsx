import React from "react";
import { Integration, Integrations } from "../../../utils/db";
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
import Link from "next/link";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Input, Label, Fieldset, Button, Flex, IconButton } from "../styles";
import { useFetchData } from "../../../utils/hooks/useFetchData";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: Integration;
  children: React.ReactNode;
}

function Modal({ open, setOpen, item, children }: Props) {
  // custom hook that receives the type of integration
  // do the fetching and get the result.

  const { result, loading, getData } = useFetchData(item.title);

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
            <Button disabled={loading} variant="black">
              {loading ? "loading ... " : `link to ${item.title}`}
            </Button>
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
