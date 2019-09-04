import { parse } from 'qs';
import enhancedModelExtend, { advancedList } from '@/utils/extend';
import { fetch, create, remove, update } from '@/services/services';

export default enhancedModelExtend(advancedList, {
  namespace: 'services',

  state: {
    modalVisible: false,
    modalType: 'create',
    currentItem: {},
    submitting: false,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { page, size, sort, filter } = payload;
      const data = yield call(fetch, {
        ...payload,
        fields: ['name', 'description', 'service_url', 'logout_url', 'create_time', 'id'],
      });
      if (data.status) {
        yield put({
          type: 'listSuccess',
          payload: {
            list: data.data.records,
            pagination: {
              current: Number(page) || 1,
              pageSize: Number(size) || 10,
              total: data.data.filter_count,
            },
            filter: filter || {},
            sort: sort || '',
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { submitting: true },
      });
      const data = yield call(create, payload);
      yield put({
        type: 'updateState',
        payload: { submitting: false },
      });
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false,
          },
        });
        yield put({
          type: 'refreshPage',
          next: 'fetch',
        });
      }
    },
    *update({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { submitting: true },
      });
      const { currentItem } = yield select(({ services }) => services);
      const { id } = currentItem;
      const data = yield call(update, { ...payload, service_id: id });
      yield put({
        type: 'updateState',
        payload: { submitting: false },
      });
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {
            modalVisible: false,
          },
        });
        yield put({
          type: 'refreshPage',
          next: 'fetch',
        });
      }
    },
    *remove({ payload }, { call, put, select }) {
      const {
        pagination: { total },
      } = yield select(({ services }) => services);
      yield call(remove, payload);
      yield put({
        type: 'refreshPage',
        total,
        next: 'fetch',
      });
    },
  },

  reducers: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const { pathname, search } = location;
        if (pathname === '/services') {
          const payload = parse(search, { ignoreQueryPrefix: true });
          dispatch({ type: 'fetch', payload });
        }
      });
    },
  },
});
