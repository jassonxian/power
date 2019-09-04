import { query as queryUsers, queryCurrent } from '@/services/user';
import { fetch } from '@/services/services';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    servicesList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent({ payload }, { call, put }) {
      const { callback, ...params } = payload;
      const data = yield call(queryCurrent, params);
      if (callback) {
        callback(data);
      }
      if (data && data.status) {
        yield put({
          type: 'saveCurrentUser',
          payload: data.data,
        });
      }
    },
    *fetchServices({ payload }, { call, put }) {
      const data = yield call(fetch, {
        ...payload,
        fields: ['name', 'service_url', 'id'],
      });
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {
            servicesList: data.data.records,
          },
        });
      }
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
