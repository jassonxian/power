import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(params) {
  return request('/users/current', {
    params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function fetch(params) {
  return request('/users/list', {
    method: 'POST',
    data: params,
  });
}

export async function create(params) {
  return request('/users', {
    method: 'POST',
    data: params,
  });
}

export async function remove(params) {
  return request('/users', {
    method: 'DELETE',
    data: params,
  });
}

export async function update(params) {
  return request('/profiles', {
    method: 'PUT',
    data: params,
  });
}

export async function activate(params) {
  return request('/users/active', {
    method: 'PATCH',
    data: params,
  });
}

export async function resetPassword(params) {
  const { data, errorHandler } = params;
  return request(`/users/forgot/password`, {
    method: 'PATCH',
    data,
    errorHandler,
  });
}

export async function reset(params) {
  return request('/users/reset/password', {
    method: 'PATCH',
    data: params,
  });
}

export async function servicesSelection() {
  return request('/services/selection', {
    method: 'GET',
  });
}

export async function authority(params) {
  return request('/users/service', {
    method: 'PATCH',
    data: params,
  });
}

export async function password(params) {
  return request('/users/password', {
    method: 'PATCH',
    data: params,
  });
}
