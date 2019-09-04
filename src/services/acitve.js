import request from '@/utils/request';

export async function fetch(params) {
  const { data, errorHandler } = params;
  return request(`/auth/active`, {
    method: 'PATCH',
    data,
    errorHandler,
  });
}

export async function active(params) {
  const { data, errorHandler } = params;
  return request(`/auth/mail`, {
    method: 'POST',
    data,
    errorHandler,
  });
}

export async function forgetPassword(params) {
  const { data, errorHandler } = params;
  return request(`/auth/password/mail`, {
    method: 'POST',
    data,
    errorHandler,
  });
}

export async function resetPassword(params) {
  const { data, errorHandler } = params;
  return request(`/auth/password/mail`, {
    method: 'POST',
    data,
    errorHandler,
  });
}
