import { parse } from 'qs';
import enhancedModelExtend, { advancedList } from '@/utils/extend';
import { fetch } from '@/services/power';

export default enhancedModelExtend(advancedList, {
  namespace: 'power',

  state: {
    clone: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const data = yield call(fetch, payload);
      if (data.status === 0) {
        yield put({
          type: 'listSuccess',
          payload: {
            list: data.data,
            clone: data.data,
          },
        });
      }
    },
  },

  reducers: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const { pathname, search } = location;
        if (pathname === '/power') {
          const payload = parse(search, { ignoreQueryPrefix: true });
          dispatch({ type: 'fetch', payload });
        }
      });
    },
  },
});
