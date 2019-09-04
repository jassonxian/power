import UnAuth from './png/403.png';
import NotFound from './png/404.png';
import ServerError from './png/500.png';

const config = {
  403: {
    img: UnAuth,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: NotFound,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
  500: {
    img: ServerError,
    title: '500',
    desc: '抱歉，服务器出错了',
  },
};

export default config;
