import { parse } from 'qs';
import { notification } from 'antd';
import enhancedModelExtend, { advancedList } from '@/utils/extend';
import {
  fetch,
  create,
  remove,
  update,
  activate,
  reset,
  authority,
  servicesSelection,
} from '@/services/user';

export default enhancedModelExtend(advancedList, {
  namespace: 'users',

  state: {
    modalVisible: false,
    authModalVisible: false,
    user_id: '',
    modalType: 'create',
    currentItem: {},
    submitting: false,
    serviceData: [],
    targetKeys: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const { page, size, sort, ...filter } = payload;
      const data = yield call(fetch, payload);
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
            filter,
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
      const { currentItem } = yield select(({ users }) => users);
      const { user_id } = currentItem;
      const data = yield call(update, { ...payload, user_id });
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
    *activate({ payload }, { call, put }) {
      const data = yield call(activate, payload);
      if (data.status) {
        yield put({
          type: 'refreshPage',
          next: 'fetch',
        });
      }
    },
    *remove({ payload }, { call, put, select }) {
      const {
        pagination: { total },
      } = yield select(({ users }) => users);
      yield call(remove, payload);
      yield put({
        type: 'refreshPage',
        total,
        next: 'fetch',
      });
    },
    *reset({ payload }, { call }) {
      const data = yield call(reset, payload);
      if (data.status) {
        notification.success({
          message: '密码重置成功',
          description: `新密码：${data.data}`,
          duration: 0,
        });
      }
    },
    *service(_, { call, put }) {
      const data = yield call(servicesSelection);
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {
            serviceData: data.data.record,
          },
        });
      }
    },
    *authority({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { submitting: true },
      });
      const data = yield call(authority, payload);
      yield put({
        type: 'updateState',
        payload: { submitting: false },
      });
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {
            authModalVisible: false,
          },
        });
        yield put({
          type: 'refreshPage',
          next: 'fetch',
        });
      }
    },
  },

  reducers: {},

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const { pathname, search } = location;
        if (pathname === '/users') {
          const payload = parse(search, { ignoreQueryPrefix: true });
          dispatch({ type: 'fetch', payload });
          dispatch({ type: 'service' });
        }
      });
    },
  },
});
