import axiosConfig from './axios-config';

const api = (() => {
  const fetchWithAuth = ({ method, value = {}, url }) => axiosConfig({
    method,
    url,
    data: value,
    headers: { Authorization: `Bearer ${localStorage.getItem('accesstoken')}` },
  });
  const register = (value) => axiosConfig.post('/register', value);
  const login = (value) => axiosConfig.post('/login', value);
  const getOwnProfile = () => fetchWithAuth({ method: 'GET', url: '/users/me' });


  // comment
  const postComment = (id, value) => fetchWithAuth({ method: 'POST', url: `/threads/${id}/comments`, value });

  // threads
  const getAllThreads = () => axiosConfig.get('/threads');
  const getThread = (id) => axiosConfig.get(`/threads/${id}`);
  const postThread = (value) => fetchWithAuth({ method: 'POST', url: '/threads', value });

  // leaderboards
  const getAllLeaderboards = () => axiosConfig.get('/leaderboards');

  // vote
  const postUpVote = (id) => fetchWithAuth({
    method: 'POST',
    url: `/threads/${id}/up-vote
`,
  });
  const postDownVote = (id) => fetchWithAuth({
    method: 'POST',
    url: `/threads/${id}/down-vote
`,
  });
  const postNeutralVote = (id) => fetchWithAuth({
    method: 'POST',
    url: `/threads/${id}/neutral-vote
`,
  });
  const postUpVoteComment = ({ threadId, commentId }) => fetchWithAuth({
    method: 'POST',
    url: `/threads/${threadId}/comments/${commentId}/up-vote
`,
  });
  const postNeutralVoteComment = ({ threadId, commentId }) => fetchWithAuth({
    method: 'POST',
    url: `/threads/${threadId}/comments/${commentId}/neutral-vote
`,
  });
  const postDownVoteComment = ({ threadId, commentId }) => fetchWithAuth({
    method: 'POST',
    url: `/threads/${threadId}/comments/${commentId}/down-vote
`,
  });

  // users
  const getAllUsers = () => axiosConfig.get('/users');

  return {
    fetchWithAuth,
    register,
    login,
    getOwnProfile,
    postDownVoteComment,
    postNeutralVoteComment,
    postUpVoteComment,
    getAllThreads,
    getAllUsers,
    getThread,
    postThread,
    postComment,
    getAllLeaderboards,
    postUpVote,
    postDownVote,
    postNeutralVote,

  };
})();

export default api;
