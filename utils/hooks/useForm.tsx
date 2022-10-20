import React, { ReactElement, Ref, useState } from "react";

interface formInputs {
  firstName: string;
  lastName: string;
  description: string;
  tags: string[];
}

function useForm(initialValue = {} as formInputs , ref:React.RefObject<HTMLSelectElement>) {
  const [formData, setFormData] = useState(initialValue);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    e.target.name === "tags"
      ? (setFormData((curr) => ({
          ...curr,
          [e.target.name]: [...curr.tags, e.target.value],
        })),
       ref.current.value === "")
      : setFormData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  return { formData, handleChange };
}

export default useForm;
