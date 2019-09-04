export default [
  // home
  // {
  //   path: '/home',
  //   component: '../layouts/HomeLayout',
  // },
  // user
  // {
  //   path: '/passport',
  //   component: '../layouts/UserLayout',
  //   routes: [
  //     { path: '/passport', redirect: '/passport/login' },
  //     { path: '/passport/login', component: './Login/Login' },
  //     { path: '/passport/password', component: './Login/Password' },
  //     { path: '/passport/password/:token', component: './Login/Password' },
  //   ],
  // },
  // {
  //   path: '/auth',
  //   routes: [
  //     result
      // {
      //   path: '/auth/active/:token',
      //   component: './Active',
      // },
    // ],
  // },
  // {
  //   path: '/result',
  //   routes: [
  //     result
      // {
      //   path: '/result/success',
      //   name: 'success',
      //   component: './Result/Success',
      // },
      // { path: '/result/error', name: 'error', component: './Result/Error' },
    // ],
  // },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      { path: '/', redirect: '/power' },
      {
        path: '/power',
        name: 'power',
        icon: 'power',
        component: './Power',
      },
      {
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
        ],
      },
    ],
  },
];
