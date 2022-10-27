/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useEffect, useState, useRef, useMemo } from "react";
import { useSession } from "next-auth/react";
import useInput from "../utils/hooks/useForm";
import Router, { useRouter } from "next/router";
import useForm from "../utils/hooks/useForm";
import { tags } from "../utils/db";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { CheckIcon } from "@heroicons/react/24/outline";
type Tag = string;
type Tags = Tag[];

function Welcome() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [loadingForm, setLoadingForm] = useState(false);
  const [Error, setError] = useState([{ name: "", message: "" }]);
  const [userName, setUserName] = useState({ firstName: "", lastName: "" });
  const [tagsDisplay, setTags] = useState(tags);
  const newTagsRef = useRef(null);
  useEffect(() => {
    if (!session) return;
    setUserName({
      firstName: session?.user?.name.split(" ")[0],
      lastName: session?.user?.name.split(" ")[1],
    });
  }, [session]);
  const selectRef = useRef(null);
  const { formData, handleChange } = useForm(
    {
      firstName: "",
      lastName: "",
      description: "",
      tags: [],
    },
    selectRef
  );

  useEffect(() => {
    if (!session) return;
    setLoading(false);
    if (status === "unauthenticated") router.replace("/auth/signin");
  }, [session]);

  // error handling
  const tagsRef = useRef(null);
  let fields = [
    { field: "firstName", value: formData.firstName },
    { field: "lastName", value: formData.lastName },
    { field: "description", value: formData.description },
  ];

  // handle form
  const handleSubmit = async (e: FormEvent) => {
    if (loadingForm) return;
    e.preventDefault();
    setLoadingForm(true);
    await setDoc(doc(db, "users", session?.user?.email), {
      firstName: formData.firstName,
      lastName: formData.lastName,
      description: formData.description,
      tags: formData.tags,
      email: session?.user?.email,
    });
    setLoadingForm(false);
    router.push("/dash");
  };
  const [removeTag, setRemoveTag] = useState<Tags>([]);
  const restoreItem = (el: string) => {
    setRemoveTag(removeTag.filter((item) => item !== el));
  };

  if (loading) {
    <div className="w-full items-center justify-center flex bg-slate-100 min-h-screen px-2 ">
      <div className="w-full lg:w-[75%] xl:w-[45%] rounded-xl items-start justify-start flex flex-col bg-white py-24 px-4">
        <h1 className="text-black text-xl"> loading ... </h1>
      </div>
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
            {Error.filter((err) => err.name === "firstName").length > 0 && (
              <p className="text-red-500 text-sm">first Name is Required</p>
            )}
          </label>
          <label className="w-full">
            Last Name
            <input
              name="lastName"
              className="input"
              value={formData.lastName}
              onChange={handleChange}
            />
            {Error.filter((err) => err.name === "lastName").length > 0 && (
              <p className="text-red-500 text-sm">last Name is Required</p>
            )}
          </label>
          <label className="w-full col-span-2">
            Description
            <textarea
              name="description"
              className="input"
              value={formData.description}
              onChange={handleChange}
            />
            {Error.filter((err) => err.name === "description").length > 0 && (
              <p className="text-red-500 text-sm">description is Required</p>
            )}
          </label>
          <div className="w-full justify-center items-center flex col-span-2">
            <select
              name="tags"
              value=""
              ref={selectRef}
              className="outline-none"
              onChange={(e) => {
                removeTag.some((item) => item === e.target.value)
                  ? restoreItem(e.target.value)
                  : formData.tags.filter((tag) => tag === e.target.value)
                      .length === 0 && handleChange(e);
              }}
            >
              <option value="" defaultChecked selected disabled>
                choose skills, roles, tools
              </option>
              {tagsDisplay.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <div className="w-full items-center justify-center flex">
              <input placeholder="add..." className="input" ref={newTagsRef} />
              <CheckIcon
                onClick={() =>
                  newTagsRef.current.value.trim() !== "" &&
                  (setTags([...tagsDisplay, newTagsRef.current.value]),
                  (newTagsRef.current.value = ""))
                }
                className="icon cursor-pointer hover:stroke-green-500 smooth hover:scale-110"
              >
                add
              </CheckIcon>
            </div>
          </div>

          <div className="w-full col-span-2  place-items-start gap-2 grid grid-cols-3 border-b border-gray-300 mb-6 pb-4">
            {formData.tags
              .filter((tag) => tag !== removeTag.find((item) => item === tag))
              .map((tag) => (
                <div
                  onClick={() => setRemoveTag([...removeTag, tag])}
                  title="remove"
                  key={tag}
                  className="tag"
                >
                  <p className="text-xs">{tag}</p>
                </div>
              ))}
          </div>
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
