import React, { useState } from "react";
interface User {
  firstName: string;
  lastName: string;
  description: string;
}

function useForm(initialValue: User) {
  const [formData, setFormData] = useState(initialValue);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((curr) => ({ ...curr, [e.target.name]: e.target.value }));
  };
  return { formData, handleChange };
}

export default useForm;
