/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import { parse } from 'qs';
import { notification } from 'antd';
import router from 'umi/router';

/**
 * 异常处理程序
 */
const errorHandler = error => {
  const { response = {} } = error;
  // const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  if (status === 401) {
    response
      .clone()
      .json()
      .then(() => {
        notification.error({
          message: '未登录或登录已过期，请重新登录。',
        });
        // @HACK
        /* eslint-disable no-underscore-dangle */
        const { service } = parse(window.location.search, { ignoreQueryPrefix: true });
        window.g_app._store.dispatch({
          type: 'login/logout',
          payload: {
            action: 'auto',
            params: service,
          },
        });
      });

    return;
  }
  response
    .clone()
    .json()
    .then(res => {
      const errortext = res.error.message;
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errortext,
      });
    });

  // environment should not be used
  if (status === 403) {
    router.push('/exception/403');
    return;
  }
  if (status === 404) {
    router.push('/exception/404');
    return;
  }
  if (status <= 504 && status >= 500) {
    router.push('/exception/500');
    return;
  }
  return response.clone().json();
};

/**
 * 配置request请求时的默认参数
 */
/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: '/v1',
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

export default request;
