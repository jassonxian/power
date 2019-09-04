import request from '@/utils/request';

export async function fetch(params) {
  return request('/services/list', {
    method: 'POST',
    data: params,
  });
}

export async function create(params) {
  return request('/services', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params) {
  return request('/services', {
    method: 'DELETE',
    data: params,
  });
}

export async function update(params) {
  return request('/services', {
    method: 'PUT',
    data: params,
  });
}

export async function servicesSelection() {
  return request('/services', {
    method: 'GET',
  });
}
