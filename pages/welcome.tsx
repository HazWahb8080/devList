import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";

export type Inputs = {
  firstName: string;
  lastName: string;
  description: string;
  tags: string[];
};
function Welcome() {
  const { data: session } = useSession();
  // handling form data
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!session) return;
    setLoading(false);
  }, [session]);

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
          onSubmit={handleSubmit(onSubmit)}
          className="w-full place-items-center grid grid-cols-2 gap-4"
        ></form>
      </div>
    </div>
  );
}

export default Welcome;
