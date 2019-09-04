import React from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import Register from './components/register';
import Login from './components/login';

const Index = ({ form, dispatch, login, location, loading }) => {
  const { checked } = login;

  const registerPros = {
    form,
    dispatch,
    login,
    location,
    loading,
  };
  const loginPros = {
    form,
    dispatch,
    login,
    location,
    loading,
  };

  return <div>{checked ? <Login {...loginPros} /> : <Register {...registerPros} />}</div>;
};

const mapStateToProps = ({ login, loading }) => ({
  login,
  loading: loading.effects['login/register'],
});

export default connect(mapStateToProps)(Form.create()(Index));
