/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import useInput from "../utils/hooks/useInput";

function Welcome() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);
  const [Error, setError] = useState([{ name: "", message: "" }]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    description: "",
    tags: [],
  });
  useEffect(() => {
    if (!session) return;
    setLoading(false);
    if (formData.firstName === "" && formData.lastName === "")
      setFormData({
        ...formData,
        firstName: session?.user?.name.split(" ")[0],
        lastName: session?.user?.name.split(" ")[1],
      });
  }, [session]);
  let tags = [
    "figma",
    "product",
    "engineering",
    "javascript",
    "Blogger",
    "Entrepreneur",
  ];
  // error handling
  const selectRef = useRef(null);
  const tagsRef = useRef(null);
  let fields = [
    { field: "firstName", value: formData.firstName },
    { field: "lastName", value: formData.lastName },
    { field: "description", value: formData.description },
  ];

  // handle form
  const handleSubmit = (e: FormEvent) => {
    if (loadingForm) return;
    e.preventDefault();
    setLoadingForm(true);
    let requiredFields = fields.filter((field) => field.value.trim() === "");
    if (requiredFields.length > 0) {
      requiredFields.forEach((field) => {
        setError([
          ...Error,
          { name: field.field, message: `${field.field} is required` },
        ]);
      });
      setLoadingForm(false);
    } else {
      console.log(formData);
    }
  };

  const handleTags = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (formData.tags.filter((tag) => tag === e.target.value).length > 0)
      return;
    setFormData({
      ...formData,
      tags: [...formData.tags, e.target.value],
    });
    selectRef.current.value = "";
  };

  if (loading) {
    <div className="w-full items-center justify-center flex bg-slate-100 min-h-screen px-2 ">
      <div className="w-full lg:w-[75%] xl:w-[45%] rounded-xl items-start justify-start flex flex-col bg-white py-24 px-4">
        <h1 className="text-black text-xl"> loading ... </h1>
      </div>
    </div>;
  }
  return (
    <div className="w-full items-center justify-center flex bg-slate-100 min-h-screen px-2 ">
      <div className="w-full lg:w-[75%] xl:w-[45%] rounded-xl items-center justify-center flex flex-col bg-white py-24 px-4 shadow-xl shadow-gray-200">
        <img
          src="/devList.png"
          className="w-48 h-48 object-center object-contain"
          alt="logo"
        />
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full place-items-center grid grid-cols-2 gap-4 items-center justify-center px-12"
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
            {Error.filter((err) => err.name === "firstName").length > 0 && (
              <p className="text-red-500 text-sm">first Name is Required</p>
            )}
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
            {Error.filter((err) => err.name === "lastName").length > 0 && (
              <p className="text-red-500 text-sm">last Name is Required</p>
            )}
          </label>
          <label className="w-full col-span-2">
            Description
            <textarea
              className="input"
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
            />
            {Error.filter((err) => err.name === "description").length > 0 && (
              <p className="text-red-500 text-sm">description is Required</p>
            )}
          </label>
          <select
            ref={selectRef}
            className="outline-none col-span-2"
            onChange={(e) => handleTags(e)}
          >
            <option value="" hidden selected disabled>
              choose skills, roles, tools
            </option>
            {tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <div className="w-full col-span-2  place-items-start gap-2 grid grid-cols-5 border-b border-gray-300 mb-6 pb-4">
            {formData.tags.map((tag, i) => (
              <div
                title="remove"
                key={tag}
                onClick={() => {
                  setFormData({
                    ...formData,
                    tags: formData.tags.filter(
                      (tag) => formData.tags.indexOf(tag) !== i
                    ),
                  });
                  selectRef.current.value = "";
                }}
                className="tag"
              >
                <p>{tag}</p>
              </div>
            ))}
          </div>
          <button
            disabled={loadingForm}
            type="submit"
            className="btn w-full md:w-2/3 my-4 col-span-2"
          >
            {loadingForm ? "loading.." : "submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Welcome;
