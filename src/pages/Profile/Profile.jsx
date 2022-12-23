import { useId } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

// Components
import Skeleton from "react-loading-skeleton";
import { Error, RenderWhen } from "../../components";

import useProfile from "../Profile/hooks/useProfile";

const Input = ({
  label,
  defaultValue,
  value,
  onChange,
  disabled,
  errorMsg,
  name,
}) => {
  const id = useId();

  return (
    <div className="mb-4 flex flex-col">
      <label htmlFor={id} className="font-bold text-sm mb-2">
        {label}
      </label>
      <input
        autoComplete="off"
        type="text"
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={clsx("p-2 border rounded w-1/2", {
          "border-red-400": errorMsg,
        })}
        defaultValue={defaultValue}
        placeholder=""
        name={name}
        // ref={ref}
      />
      <RenderWhen condition={errorMsg}>
        <div className="py-1 text-xs text-red-500">{errorMsg}</div>
      </RenderWhen>
    </div>
  );
};

const PhotoInput = ({
  defaultValue,
  value,
  onChange,
  disabled,
  errorMsg,
  name,
}) => {
  const id = useId();
  return (
    <div className="mb-4 flex flex-col">
      <input
        accept="image/*"
        autoComplete="off"
        type="file"
        id={id}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={clsx("p-2 border rounded w-1/2", {
          "border-red-400": errorMsg,
        })}
        defaultValue={defaultValue}
        placeholder=""
        name={name}
        // ref={ref}
      />
      <RenderWhen condition={errorMsg}>
        <div className="py-1 text-xs text-red-500">{errorMsg}</div>
      </RenderWhen>
      <img className="rounded bg-green-400" src={value} />
    </div>
  );
};

const Profile = ({}) => {
  const navigate = useNavigate();
  const { data, isLoading, error, errors, onSubmit, values, onChange } =
    useProfile({
      id: 1,
      afterSubmission: () => {
        navigate("/");
      },
    });

  const handleImageChange = (event) => {
    console.log("file :", URL.createObjectURL(event.target.files[0]));
    onChange("photo", URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="shadow-md w-full d-flex justify-center items-center p-5 mt-2">
      <RenderWhen condition={isLoading}>
        <Skeleton count={3} className="h-36 mb-6" />
      </RenderWhen>

      <RenderWhen condition={error}>
        <Error />
      </RenderWhen>

      <RenderWhen condition={data && data?.profile}>
        <form onSubmit={onSubmit} className="flex flex-col">
          <Input
            label="User Name"
            value={values.name}
            onChange={onChange}
            disabled={isLoading}
            errorMsg={errors.name}
            name="name"
          />
          <Input
            label="Family"
            value={values.family}
            onChange={onChange}
            disabled={isLoading}
            errorMsg={errors.family}
            name="family"
          />
          <Input
            label="Email"
            value={values.email}
            onChange={onChange}
            disabled={isLoading}
            errorMsg={errors.email}
            name="email"
          />
          {/* <PhotoInput
            value={values.photo}
            onChange={handleImageChange}
            disabled={isLoading}
            errorMsg={errors.photo}
            name="photo"
          /> */}

          <div className="py-4 flex justify-end">
            <div>
              <button
                className="py-2 px-4 mr-2 text-red-500 rounded"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                className="py-2 px-4  text-white rounded border bg-blue-500 border-blue-600 hover:bg-blue-600 transition-colors"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </RenderWhen>
    </div>
  );
};

export default Profile;
