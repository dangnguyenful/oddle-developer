import axios from 'axios';
import api_url from 'config/api'
import paging_config from 'config/paging';

export const getUsers = (userName: string, page: number=1, per_page: number=paging_config.per_page) => {
  return axios.get(api_url.search_user + '?q=' + userName + '+in:username&type=Users' + '&page=' + page + '&per_page=' + per_page);
};

export const getUser = (userName: string) => {
  return axios.get(api_url.get_user + '/' + userName);
};

export const getFollowers = (userName: string, page: number=1, per_page: number=paging_config.per_page) => {
  return axios.get(api_url.get_user + '/' + userName + '/followers?page=' + page + '&per_page=' + per_page);
};

export const getFollowing = (userName: string, page: number=1, per_page: number=paging_config.per_page) => {
  return axios.get(api_url.get_user + '/' + userName + '/following?page=' + page + '&per_page=' + per_page);
};