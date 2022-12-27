import { useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
// Helpers
import axios from "axios";

// endpoints
import Endpoints from "../../../constants/APIs";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(10, "Too Short!")
    .max(150, "Too Long!")
    .required("Please fill this input"),

  description: Yup.string()
    .min(100, "Too Short!")
    .required("Please fill this input"),
});

const useQuestion = ({ id, afterSubmission }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [votes, setVotes] = useState(0);
  const hasAlreadyVoted = useRef(false);

  const handleUpvote = async () => {
    try {
      await axios.patch(Endpoints.getQuestionById(data.id), {
        rate: {
          up: data.rate.up + 1,
          down: data.rate.down,
          total: data.rate.total + 1,
        },
      });
      if (!hasAlreadyVoted.current) setVotes((currentVote) => currentVote + 1);
      else alert("You already voted");
    } catch (e) {}
  };

  const handleDownvote = async () => {
    try {
      await axios.patch(Endpoints.getQuestionById(data.id), {
        rate: {
          up: data.rate.up,
          down: data.rate.down + 1,
          total: data.rate.total + 1,
        },
      });
      if (!hasAlreadyVoted.current) setVotes((currentVote) => currentVote - 1);
      else alert("You already voted");
    } catch (e) {}
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },

    onSubmit: async (values) => {
      console.log({ values });
      // try {
      //   setIsLoading(true);
      //   await axios.post(Endpoints.postAnswer(), {
      //     ...values,
      //     created_at: new Date(),
      //     author: "Hesan",
      //     rate: { up: 0, down: 0, total: 0 },
      //     answers: {
      //       total: 0,
      //       quotes: [],
      //     },
      //     views: 0,
      //     tags: [],
      //     comments: [],
      //   });
      //   toast("SUCCESS");
      //   setIsLoading(false);
      //   if (afterSubmission && typeof afterSubmission === "function")
      //     afterSubmission();
      // } catch (e) {
      //   setIsLoading(false);
      //   setError(false);
      // }
    },

    validationSchema,
  });

  useEffect(() => {
    const trackView = async () => {
      try {
        await axios.patch(Endpoints.getQuestionById(data.id), {
          views: data.views + 1,
        });
      } catch (e) {}
    };

    trackView();
  }, [data?.id]);

  useEffect(() => {
    if (votes !== data?.rate?.up - data?.rate?.down)
      hasAlreadyVoted.current = true;
  }, [votes, data?.rate]);

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();

    const getData = async () => {
      try {
        setIsLoading(true);
        setError(false);

        const { data: questionDetails } = await axios.get(
          Endpoints.getQuestionById(id)
          // { cancelToken: axiosCancelToken.token }
        );
        setIsLoading(false);
        setData(questionDetails);
        setVotes(questionDetails?.rate?.up - questionDetails?.rate?.down);
        hasAlreadyVoted.current = false;
      } catch (e) {
        setError(true);
        setIsLoading(false);
      }
    };

    if (id) getData();

    return () => {
      axiosCancelToken.cancel("Request Cancel");
    };
  }, [id]);

  return {
    data,
    isLoading,
    error,
    votes,
    handleUpvote,
    handleDownvote,
    values: formik.values,
    errors: formik.errors,
    onChange: formik.handleChange,
    onSubmit: formik.handleSubmit,
  };
};

export default useQuestion;
