export const Types = {
  GET_REPOS: 'GET_REPOS',
  GET_REPOS_SUCCESS: 'GET_REPOS_SUCCESS'
};

export const getRepos = () => ({
  type: Types.GET_REPOS
});

export const getReposSuccess = (data: any) => ({
  type: Types.GET_REPOS_SUCCESS,
  payload: { data }
});
