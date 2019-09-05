import request from '@/utils/request';

export async function fetch(params) {
  return request('/datainfo', {
    method: 'GET',
    params,
  });
}

export async function create(params) {
  return request('/services', {
    method: 'POST',
    data: params,
  });
}
