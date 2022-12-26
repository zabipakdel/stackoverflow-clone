const BASE_API = process.env.REACT_APP_BASE_URL;

const Endpoints = {
  postQuestion: () => `${BASE_API}/questions`,
  getQuestions: (q) => `${BASE_API}/questions${q ? `?${q}` : ""}`,
  getQuestionById: (id) => `${BASE_API}/questions/${id}`,
  getProfile: (id) => `${BASE_API}/user/${id}`,
  postProfile: () => `${BASE_API}/user`,
};

export default Endpoints;
