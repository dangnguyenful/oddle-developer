import paging_config from 'config/paging';
import { call, put } from 'redux-saga/effects';
import * as actions from 'redux/actions/users';
import * as actionsRepos from 'redux/actions/repos';
import * as api from 'redux/api/users';
import * as apiRepos from 'redux/api/repos';

export function* getUsers(userName: string, page: number=1, per_page: number=paging_config.per_page): any {
  try {
    const result = yield call(api.getUsers, userName, page, per_page);
    yield put(actions.getUsersSuccess({
      items: result.data.items,
      total_count: result.data.total_count
    }));
  } catch (error) {
    console.error(error);
  }
}

export function* getUser(userName: string): any {
  try {
    const result = yield call(api.getUser, userName);
    yield put(actions.getUserSuccess(result));
  } catch (error) {
    console.error(error);
  }
}

export function* getRepos(userName: string, page: number=1, per_page: number=paging_config.per_page): any {
  try {
    const result = yield call(apiRepos.getRepos, userName, page, per_page);
    yield put(actionsRepos.getReposSuccess(result));
  } catch (error) {
    console.error(error);
  }
}

export function* getFollowers(userName: string, page: number=1, per_page: number=paging_config.per_page): any {
  try {
    const result = yield call(api.getFollowers, userName, page, per_page);
    yield put(actions.getFollowersSuccess(result.data));
  } catch (error) {
    console.error(error);
  }
}

export function* getFollowing(userName: string, page: number=1, per_page: number=paging_config.per_page): any {
  try {
    const result = yield call(api.getFollowing, userName, page, per_page);
    yield put(actions.getFollowingSuccess(result.data));
  } catch (error) {
    console.error(error);
  }
}