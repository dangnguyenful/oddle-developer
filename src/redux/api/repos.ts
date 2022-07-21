import axios from 'axios';
import api_url from 'config/api'
import paging_config from 'config/paging';

export const getRepos = (userName: string, page: number=1, per_page: number=paging_config.per_page) => {
  return axios.get(api_url.get_user + '/' + userName + '/repos?page=' + page + '&per_page=' + per_page);
};