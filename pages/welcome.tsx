import React, { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Welcome() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    description: "",
    tags: [],
  });
  useEffect(() => {
    if (!session) return;
    setLoading(false);
  }, [session]);

  // handle form
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  if (loading) {
    <div className="w-full items-center justify-center flex bg-slate-100 min-h-screen px-2 ">
      <div className="w-full lg:w-[45%] border border-black rounded-xl items-start justify-start flex flex-col bg-white py-24 px-4">
        <h1 className="text-black text-xl"> loading ... </h1>
      </div>
    </div>;
  }
  return (
    <div className="w-full items-center justify-center flex bg-slate-100 min-h-screen px-2 ">
      <div className="w-full lg:w-[45%] border border-black rounded-xl items-start justify-start flex flex-col bg-white py-24 px-4">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full place-items-center grid grid-cols-2 gap-4"
        >
          <label className="w-full">
            First Name
            <input
              className="input"
              defaultValue={session?.user?.name.split(" ")[0]}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
            />
          </label>
          <label className="w-full">
            Last Name
            <input
              className="input"
              defaultValue={session?.user?.name.split(" ")[1]}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
            />
          </label>
          <label className="w-full col-span-2">
            Description
            <input
              className="input"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
          </label>
          <input className="input col-span-2" />
        </form>
      </div>
    </div>
  );
}

export default Welcome;
