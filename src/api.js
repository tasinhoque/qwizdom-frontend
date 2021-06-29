import axios from 'axios';
const baseUrl = 'http://localhost:4000';
// axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

axios.interceptors.request.use(
  config => {
    if (
      config.url.includes('login') ||
      config.url.includes('register') ||
      config.url.includes('refresh')
    ) {
      return config;
    } else {
      let accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
        if (config.data && config.data.hasOwnProperty('fileUpload')) {
          console.log(config);
          config.headers['Content-Type'] = 'multipart/form-data';
        } else {
          config.headers['Accept'] = 'application/json';
        }
        return config;
      }
    }
  },
  error => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    return response;
  },

  function (error) {
    console.log(error);
    if (
      error.config.url.includes('login') ||
      error.config.url.includes('register') ||
      error.config.url.includes('refresh')
    ) {
      throw error;
    }
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem('refreshToken');
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return axios
        .post(`${baseUrl}/auth/refresh-tokens`, { refreshToken: refreshToken })
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('accessToken', res.data.access.token);
            localStorage.setItem('refreshToken', res.data.refresh.token);
            console.log('Access token refreshed!');
            return axios(originalRequest);
          }
        });
    }
    throw error;
  }
);

const api = {
  signup: body => {
    return axios.post(`${baseUrl}/auth/register`, body);
  },
  login: body => {
    return axios.post(`${baseUrl}/auth/login`, body);
  },
  refreshToken: body => {
    return axios.post(`${baseUrl}/auth/refresh-tokens`, body);
  },
  logout: body => {
    return axios.delete(`${baseUrl}/auth/logout`, body);
  },
  getAllUsers: () => {
    return axios.get(`${baseUrl}/users?page=1&limit=5`);
  },
  getQuizzes: query => {
    return axios.get(`${baseUrl}/quizzes?${query}`);
  },
  getQuiz: id => {
    return axios.get(`${baseUrl}/quizzes/${id}`);
  },
  getThreadComments: () => {
    return axios.get(
      `${baseUrl}/discussion-threads/60bdae891bcc9948e077bfdf/comments`
    );
  },
  postCompleteQuiz: quizBody => {
    return axios.post(`${baseUrl}/quizzes/complete`, quizBody);
  },
  uploadQuestionImage: (id, body) => {
    return axios.patch(`${baseUrl}/questions/${id}/image`, body);
  },
  getCategories: () => axios.get(`${baseUrl}/categories`),
  subscribeQuiz: quizId => {
    return axios.post(`${baseUrl}/quizzes/${quizId}/subscription/flip`);
  },
  editProfile: body => {
    return axios.patch(`${baseUrl}/users`, body);
  },
  editAvatar: body => {
    return axios.patch(`${baseUrl}/users/avatar`, body);
  },
};

export default api;
