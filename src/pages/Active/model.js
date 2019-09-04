import router from 'umi/router';
import { fetch } from '@/services/acitve';

export default {
  namespace: 'active',
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
      const data = yield call(fetch, params);
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {},
        });
        router.push({ pathname: '/result/success', state: { info: data.data } });
      }
      if (!data.status) {
        yield put({
          type: 'updateState',
          payload: {
            error: data.error,
          },
        });
        router.push({ pathname: '/result/error', state: { info: data.error } });
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

  subscriptions: {
    setup(props) {
      const { history, dispatch } = props;
      history.listen(location => {
        const { pathname } = location;
        const index = pathname.lastIndexOf('/');
        const payload = pathname.substring(index + 1, pathname.length);
        const routers = pathname.substring(0, index);
        if (routers === '/auth/active') {
          dispatch({ type: 'fetch', payload: { token: payload } });
        }
      });
    },
  },
};
