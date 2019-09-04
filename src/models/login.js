import { routerRedux } from 'dva/router';
import router from 'umi/router';
import { parse } from 'qs';
import { fakeAccountLogin, register, logout } from '@/services/login';
import { forgetPassword } from '@/services/acitve';
import { resetPassword } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    checked: true,
    visible: false,
    errorVisible: false,
    loading: false,
    error: {
      message: '',
    },
    msg: null,
    captchaUrl: `/v1/captchas?stamp=${new Date().getTime()}`,
    forgetPasswordStatus: false,
    resetPasswordStatus: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          loading: true,
        },
      });
      const params = {
        data: payload,
        errorHandler: error => {
          const { response = {} } = error;
          return response.clone().json();
        },
      };
      const { service } = parse(window.location.search, { ignoreQueryPrefix: true });
      const response = yield call(fakeAccountLogin, { ...params, service });
      // Login successfully
      if (!response.error) {
        if (response.data.redirect) {
          return window.location.assign(response.data.redirect);
        }
        yield put({
          type: 'changeLoginStatus',
          payload: response,
        });
        reloadAuthorized();
        yield put(routerRedux.replace('/home'));
      }
      yield put({
        type: 'updateState',
        payload: {
          loading: false,
          msg: response.error ? response.error.message : null,
        },
      });
      yield put({
        type: 'reloadCaptcha',
      });
    },
    // 注册
    *register({ payload }, { call, put }) {
      const params = {
        data: payload,
        errorHandler: error => {
          const { response = {} } = error;
          return response.clone().json();
        },
      };
      const data = yield call(register, params);
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {
            visible: true,
          },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            errorVisible: true,
            error: data.error,
          },
        });
      }
    },
    *forgetPassword({ payload }, { put, call }) {
      const params = {
        data: payload,
        errorHandler: error => {
          const { response = {} } = error;
          return response.clone().json();
        },
      };
      const data = yield call(forgetPassword, params);
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {
            forgetPasswordStatus: true,
            errorVisible: false,
            error: { massage: '' },
          },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            forgetPasswordStatus: true,
            errorVisible: true,
            error: data.error,
          },
        });
      }
    },
    *resetPassword({ payload }, { put, call }) {
      const params = {
        data: payload,
        errorHandler: error => {
          const { response = {} } = error;
          return response.clone().json();
        },
      };
      const data = yield call(resetPassword, params);
      if (data.status) {
        yield put({
          type: 'updateState',
          payload: {
            resetPasswordStatus: true,
            errorVisible: false,
            error: { massage: '' },
          },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            resetPasswordStatus: true,
            errorVisible: true,
            error: data.error,
          },
        });
      }
    },
    *logout({ payload }, { put, call }) {
      const { action, params } = payload;
      if (action !== 'auto') {
        yield call(logout);
      }
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      if (params) {
        return router.push(`/passport/login?service=${params}`);
      }
      return router.push('/passport/login');
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
      };
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    reloadCaptcha(state) {
      return {
        ...state,
        captchaUrl: `/v1/captchas?stamp=${new Date().getTime()}`,
      };
    },
  },
  subscriptions: {
    setup(props) {
      const { history, dispatch } = props;
      history.listen(location => {
        const { pathname } = location;
        if (pathname === '/passport/login') {
          dispatch({ type: 'updateState', payload: { errorVisible: false, err: { message: '' } } });
        }
      });
    },
  },
};
