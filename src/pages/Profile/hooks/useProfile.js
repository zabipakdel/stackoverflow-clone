import { useState, useEffect } from "react";

// Helpers
import axios from "axios";
import { useFormik } from "formik";
// endpoints
import Endpoints from "../../../constants/APIs";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Please fill this input"),

  family: Yup.string().required("Please fill this input"),
});

const useProfile = ({ id, afterSubmission }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      family: "",
      email: "",
      photo: "",
    },

    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        await axios.post(Endpoints.postProfile(), { ...values });
        setIsLoading(false);
        if (afterSubmission && typeof afterSubmission === "function")
          afterSubmission();
      } catch (e) {
        setIsLoading(false);
        setError(false);
      }
    },

    validationSchema,
  });

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { data: profile } = await axios.get(
          Endpoints.getProfile(`?id_like=${id}`)
          // { cancelToken: axiosCancelToken.token }
        );

        setIsLoading(false);
        setData(profile);
        console.log({ profile });
        formik.setValues({
          name: profile.name,
          family: profile.family,
          email: profile.email,
          photo: profile.photo,
        });
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    getData();

    return () => {
      axiosCancelToken.cancel("Request Cancel");
    };
  }, []);

  return {
    data: {
      profile: data,
    },
    isLoading,
    error,
    values: formik.values,
    errors: formik.errors,
    onChange: formik.handleChange,
    onSubmit: formik.handleSubmit,
  };
};

export default useProfile;
