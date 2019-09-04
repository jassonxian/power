import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { parse } from 'qs';
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import styles from '../index.less';

const { Item: FormItem } = Form;

const Login = ({ form, dispatch, login, location, loading }) => {
  const { search } = location;
  const query = parse(search, { ignoreQueryPrefix: true });
  const { captchaUrl, msg, checked } = login;
  const { getFieldDecorator, validateFields } = form;
  const onValidateForm = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: {
            ...values,
            ...query,
          },
        });
      }
    });
  };

  const reloadCaptcha = () => {
    dispatch({ type: 'login/reloadCaptcha' });
  };

  const onClick = () => {
    dispatch({
      type: 'login/updateState',
      payload: {
        msg: null,
        checked: !checked,
      },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.title}>XXXXXXXX系统</div>
      <div className={styles.loginContent}>
        <div className={styles.left}>
          <div
            onClick={onClick}
            className={styles.logo_checked}
            style={{ borderRadius: '4px 0 0 0' }}
          >
            注&nbsp;&nbsp;&nbsp;&nbsp;册
          </div>
          <div className={styles.left_logo} />
        </div>
        <div className={styles.right}>
          <div className={styles.logo}>登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
          <div className={styles.formWrap}>
            {msg ? (
              <div className={styles.alert}>
                <Alert type="error" message={msg} banner />
              </div>
            ) : null}
            <Form
              onSubmit={onValidateForm}
              className={msg ? styles.login_top0 : styles.login_top24}
            >
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入用户名!' }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码!' }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                    className={styles.col}
                  />
                )}
              </FormItem>
              <FormItem>
                <Row>
                  <Col span={14} className={styles.col}>
                    {getFieldDecorator('captcha', {
                      rules: [{ required: true, message: '请输入验证码!' }],
                    })(
                      <Input
                        size="large"
                        prefix={<Icon type="qrcode" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="验证码"
                      />
                    )}
                  </Col>
                  <Col span={10} className={styles.col}>
                    <div className={styles.captcha}>
                      <img src={captchaUrl} alt="验证码" title="验证码" onClick={reloadCaptcha} />
                    </div>
                  </Col>
                </Row>
              </FormItem>
              <FormItem>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={loading}
                  className={styles.col}
                >
                  立 即 登 录
                </Button>
              </FormItem>
            </Form>
            <div className={styles.formFooter}>
              <Link to="/list">注册</Link>
              <Link to="/passport/password">忘记密码</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ login, loading }) => ({
  login,
  loading: loading.effects['login/register'],
});

export default connect(mapStateToProps)(Form.create()(Login));
