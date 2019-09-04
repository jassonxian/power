import React from 'react';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import router from 'umi/router';
import { parse } from 'qs';
import { Spin } from 'antd';

@connect(({ user, login }) => ({ user, login }))
class RedirectLayout extends React.Component {
  componentDidMount() {
    const { dispatch, location } = this.props;
    const { search } = location;
    const { service, logout } = parse(search, { ignoreQueryPrefix: true });
    if (logout) {
      return dispatch({
        type: 'login/logout',
        payload: {
          action: 'initiative',
        },
      });
    }
    dispatch({
      type: 'user/fetchCurrent',
      payload: {
        service,
        callback: data => {
          if (data.status) {
            if (data.data.redirect) {
              return window.location.assign(data.data.redirect);
            }
            return router.push('/home');
          }
          return router.push('/passport/login');
        },
      },
    });
  }

  render() {
    const styles = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <DocumentTitle title="安全预警通报平台">
        <div style={styles}>
          <Spin size="large" />
        </div>
      </DocumentTitle>
    );
  }
}

export default RedirectLayout;
