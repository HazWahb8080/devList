import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useSession } from "next-auth/react";

type Inputs = {
  firsName: string;
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

  return (
    <div className="w-full items-center justify-center flex bg-slate-100 min-h-screen px-2 ">
      <div className="w-full lg:w-[45%] border border-black rounded-xl items-start justify-start flex flex-col bg-white py-24 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full place-items-center grid grid-cols-2 gap-4">
          {/* register your input into the hook by invoking the "register" function */}
          <input className="input"
            defaultValue={session?.user?.name.split(" ")[0]}
            {...register("firsName", { required: true })}
            aria-invalid={errors.firsName ? "true" : "false"}
          />
          {errors.firsName?.type === "required" && (
            <p role="alert">firs name is required</p>
          )}
          <input
          className="input"
            defaultValue={session?.user?.name.split(" ")[1]}
            {...register("lastName", { required: true })}
            aria-invalid={errors.lastName ? "true" : "false"}
          />
          {errors.lastName?.type === "required" && (
            <p role="alert">Last name is required</p>
          )}
          {/* include validation with required or other standard HTML validation rules */}
          <input
          className="input col-span-2"
            {...register("description", { required: true })}
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description?.type === "required" && (
            <p role="alert">description is required</p>
          )}
          <input
          className="input col-span-2"
            {...register("tags", { required: true })}
            aria-invalid={errors.tags ? "true" : "false"}
          />
          {errors.tags?.type === "required" && (
            <p role="alert">tags required</p>
          )}
          <input className="w-full lg:w-2/3 col-span-2 btn mt-8" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Welcome;
