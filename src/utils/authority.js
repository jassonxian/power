// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('antd-pro-authority') || ['admin', 'user'];
  const authorityString =
    typeof str === 'undefined' ? localStorage.getItem('antd-pro-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority || ['admin'];
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  return localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
}

export function isActionsAllowable(targets) {
  const allowableActions = getAuthority();

  // Handle String type actions
  if (typeof targets === 'string') {
    return allowableActions.indexOf(targets) >= 0;
  }

  // Handle Array type actions
  if (Array.isArray(targets)) {
    const allowableStatus = {};
    targets.forEach(action => {
      if (allowableActions.indexOf('*') >= 0) {
        allowableStatus[action] = true;
      } else {
        allowableStatus[action] = allowableActions.indexOf(action) >= 0;
      }
    });
    return allowableStatus;
  }
  return false;
}
