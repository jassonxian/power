import { active } from '@/services/acitve';

export default {
  namespace: 'error',
  state: {
    error: {},
    success: {},
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const params = {
        data: payload,
        errorHandler: error => {
          const { response = {} } = error;
          return response.clone().json();
        },
      };
      const data = yield call(active, params);
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {},
        });
      }
      if (!data.status) {
        yield put({
          type: 'updateState',
          payload: {
            error: data.error,
          },
        });
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
