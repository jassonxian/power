import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/auth/login', {
    method: 'post',
    ...params,
  });
}

export async function register(params) {
  const { data, errorHandler } = params;
  return request(`/auth/register`, {
    method: 'POST',
    data,
    errorHandler,
  });
}

export async function logout() {
  return request(`/auth/logout`, {
    method: 'GET',
  });
}
