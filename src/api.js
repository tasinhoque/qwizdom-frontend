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
  postCompleteQuiz: (quizId, quizBody) => {
    return axios.post(`${baseUrl}/quizzes/${quizId}/complete`, quizBody);
  },
  patchCompleteQuiz: (quizId, quizBody) => {
    return axios.patch(`${baseUrl}/quizzes/${quizId}/complete`, quizBody);
  },
  uploadQuestionImage: (id, body) => {
    return axios.patch(`${baseUrl}/questions/${id}/image`, body);
  },
  getCategories: () => axios.get(`${baseUrl}/categories`),
  postQuiz: requestBody => axios.post(`${baseUrl}/quizzes`, requestBody),
  subscribeQuiz: quizId => {
    return axios.post(`${baseUrl}/quizzes/${quizId}/subscription/flip`);
  },
  editProfile: body => {
    return axios.patch(`${baseUrl}/users`, body);
  },
  editAvatar: body => {
    return axios.patch(`${baseUrl}/users/avatar`, body);
  },
  updateCover: (quizId, body) =>
    axios.post(`${baseUrl}/quizzes/${quizId}/cover`, body),
  //QuizPlayApi
  getCompleteQuiz: qId => {
    return axios.get(`${baseUrl}/quizzes/${qId}/complete`);
  },
  submitQuizPlay: (qId, body) => {
    return axios.post(`${baseUrl}/quizzes/${qId}/responses/complete`, body);
  },
  sumbitReviewRating: (qId, body) => {
    return axios.post(`${baseUrl}/quizzes/${qId}/reviews`, body);
  },

  //QuizResult api
  getQuizResult: qId => {
    return axios.get(`${baseUrl}/quizzes/${qId}/responses/complete`);
  },
  //ManualEvaluation
  getEvaluationScript: (quizId, userId) => {
    return axios.get(
      `${baseUrl}/quizzes/${quizId}/responses/complete/${userId}`
    );
  },
  submitEvaluation: (responseId, body) => {
    return axios.patch(`${baseUrl}/quiz-responses/${responseId}`, body);
  },
  getSubbedQuizzes: () => {
    return axios.get(`${baseUrl}/quizzes/subscribed?page=1&limit=100`);
  },
  getPublishedQuizzes: () => {
    return axios.get(`${baseUrl}/quizzes/published`);
  },
  getDraftQuizzes: () => {
    return axios.get(`${baseUrl}/quizzes/draft`);
  },
  getDoneQuizzes: () => {
    return axios.get(`${baseUrl}/quizzes/participated-in`);
  },
  fetchReviews: (qid, page) => {
    return axios.get(`${baseUrl}/quizzes/${qid}/reviews?page=${page}&limit=4`);
  },
  publishDraft: (qid, body) => {
    return axios.patch(`${baseUrl}/quizzes/${qid}`, body);
  },
  getAllSubs: (qid, query) => {
    return axios.get(
      `${baseUrl}/quizzes/${qid}/responses/complete/all?type=${query}`
    );
  },
  getLeaderboard: quizId =>
    axios.get(`${baseUrl}/quizzes/${quizId}/leaderboard`),
  getNotifications: () => axios.get(`${baseUrl}/notifications`),
  markAsRead: id => axios.post(`${baseUrl}/notifications/${id}/read`),
  getUnreadCount: () => axios.get(`${baseUrl}/notifications/unread/count`),
  getTasksForParticipant: () => axios.get(`${baseUrl}/users/tasks/participant`),
  getTasksForCreator: () => axios.get(`${baseUrl}/users/tasks/creator`),
  // deleteQuestion : (id)=>{
  //   axios.delete
  // },

  //forum APIs
  getAllDiscussionThread: quizId => {
    return axios.get(`${baseUrl}/quizzes/${quizId}/discussion-threads`);
  },
  getSingleDiscussionThread: threadId => {
    return axios.get(`${baseUrl}/discussion-threads/${threadId}`);
  },
  postDiscussionThread: (quizId, body) => {
    return axios.post(`${baseUrl}/quizzes/${quizId}/discussion-threads`, body);
  },
  getThreadComments: threadId => {
    return axios.get(`${baseUrl}/discussion-threads/${threadId}/comments`);
  },
  postComment: (threadId, body) => {
    return axios.post(
      `${baseUrl}/discussion-threads/${threadId}/comments`,
      body
    );
  },
  deleteComment: commentId => {
    return axios.delete(`${baseUrl}/comments/${commentId}`);
  },
  patchDiscussionThread: (threadId, body) => {
    return axios.patch(`${baseUrl}/discussion-threads/${threadId}`, body);
  },
  deleteDiscussionThread: threadId => {
    return axios.delete(`${baseUrl}/discussion-threads/${threadId}`);
  },
  updateComment: (commentId, body) => {
    return axios.patch(`${baseUrl}/comments/${commentId}`, body);
  },
  upVoteFlip: threadId => {
    return axios.post(`${baseUrl}/discussion-threads/${threadId}/upvote/flip`);
  },
  downVoteFlip: threadId => {
    return axios.post(
      `${baseUrl}/discussion-threads/${threadId}/downvote/flip`
    );
  },

  getPieInfo: qid => {
    return axios.get(`${baseUrl}/quizzes/${qid}/pie-chart`);
  },
  patchQuiz: (qid, body) => {
    return axios.patch(`${baseUrl}/quizzes/${qid}`, body);
  },
};

export default api;
