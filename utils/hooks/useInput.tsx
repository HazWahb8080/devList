import React, { useState } from "react";

function useInput(initialValue: string) {
  const [defaultValue, setValue] = useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);
  const bind = {defaultValue, onChange };

  return [defaultValue, onChange, bind];
}

export default useInput;
