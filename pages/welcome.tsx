/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import useForm from "../utils/hooks/useForm";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

function Welcome() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [loadingForm, setLoadingForm] = useState(false);
  const [userName, setUserName] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    if (!session) return;
    setUserName({
      firstName: session?.user?.name.split(" ")[0],
      lastName: session?.user?.name.split(" ")[1],
    });
  }, [session]);
  const { formData, handleChange } = useForm({
    firstName: "",
    lastName: "",
    description: "",
  });
  useEffect(() => {
    if (!session) return;
    setLoading(false);
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [session]);

  // handle form
  const handleSubmit = async (e: FormEvent) => {
    if (loadingForm) return;
    e.preventDefault();
    setLoadingForm(true);
    await setDoc(doc(db, "users", session?.user?.email), {
      firstName: formData.firstName,
      lastName: formData.lastName,
      description: formData.description,
      email: session?.user?.email,
    });
    setLoadingForm(false);
    router.push("/dash");
  };
  if (loading) {
    <div className="w-full items-center justify-center flex bg-slate-100 min-h-screen">
      <h1 className="text-black text-xl"> loading ... </h1>
    </div>;
  }
  return (
    <div className="w-full items-center justify-center flex bg-white min-h-screen px-2 py-4 ">
      <div className="w-full lg:w-[75%] xl:w-[35%] rounded-xl items-center justify-center flex flex-col bg-white 2xl:py-24 px-4 py-6 shadow-xl shadow-gray-200">
        <img
          src="/devList.png"
          className="2xl:w-48 2xl:h-48 w-36 object-center object-contain pb-6"
          alt="logo"
        />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full place-items-center grid grid-cols-2 gap-4 items-center justify-center px-12"
        >
          <label className="w-full">
            First Name
            <input
              name="firstName"
              className="input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label className="w-full">
            Last Name
            <input
              name="lastName"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <label className="w-full col-span-2">
            Description
            <textarea
              name="description"
              className="input"
              value={formData.description}
              onChange={handleChange}
            />
          </label>

          <button
            disabled={loadingForm}
            type="submit"
            className="btn w-full my-4 col-span-2"
          >
            {loadingForm ? "loading.." : "submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Welcome;
