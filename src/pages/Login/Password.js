import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Input, Button, Alert, Icon } from 'antd';
import styles from './password.less';

const { Item } = Form;

class Password extends React.Component {
  state = {
    confirmDirty: false,
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('new_password')) {
      callback('密码输入不一致');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const RegExp = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
    if (value && !RegExp.test(value)) {
      callback('格式有误！');
    }
    const { form } = this.props;
    const { confirmDirty } = this.state;
    if (value && confirmDirty) {
      form.validateFields(['check_password'], { force: true });
    }
    callback();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState(prevState => ({ confirmDirty: prevState.confirmDirty || !!value }));
  };

  render() {
    const { form, dispatch, login, loading, match, resetLoading } = this.props;
    const { token } = match.params;
    const { getFieldDecorator } = form;
    const { errorVisible, forgetPasswordStatus, error, resetPasswordStatus } = login;
    const handleSubmit = e => {
      e.preventDefault();
      form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: 'login/forgetPassword',
            payload: {
              ...values,
            },
          });
        }
      });
    };

    const resetHandleSubmit = e => {
      e.preventDefault();
      form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          dispatch({
            type: 'login/resetPassword',
            payload: {
              new_password: values.new_password,
              check_password: values.check_password,
              token,
            },
          });
        }
      });
    };

    const renderForm = () => {
      if (token && !resetPasswordStatus) {
        return (
          <div className={styles.form}>
            <Form onSubmit={resetHandleSubmit}>
              <Item label="新密码">
                {getFieldDecorator('new_password', {
                  rules: [
                    {
                      required: true,
                      message: '请填写新密码！',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                })(
                  <Input
                    type="password"
                    placeholder="请包含大小写字母，数字及特殊字符，如 !@#$%^&*?"
                  />
                )}
              </Item>
              <Item label="确认密码">
                {getFieldDecorator('check_password', {
                  rules: [
                    {
                      required: true,
                      message: '请再次输入密码！',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
              </Item>
              <Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit" loading={resetLoading}>
                  重置
                </Button>
              </Item>
            </Form>
          </div>
        );
      }
      if ((token && resetPasswordStatus) || forgetPasswordStatus) {
        return (
          <div>
            <div className={styles.icon}>
              {errorVisible ? (
                <div>
                  <Icon className={styles.error} type="close-circle" theme="filled" />
                  <p>{error.message}</p>
                  <Button
                    onClick={() => {
                      dispatch({
                        type: 'login/updateState',
                        payload: {
                          forgetPasswordStatus: false,
                          resetPasswordStatus: false,
                        },
                      });
                    }}
                  >
                    返回上层
                  </Button>
                </div>
              ) : (
                <div>
                  <Icon className={styles.success} type="check-circle" theme="filled" />
                  {token ? <p>密码修改成功，请前往登录</p> : <p>邮件发送成功请前往邮箱验证修改</p>}
                  <Button
                    onClick={() => {
                      dispatch({
                        type: 'login/updateState',
                        payload: {
                          forgetPasswordStatus: false,
                        },
                      });
                    }}
                  >
                    返回上层
                  </Button>
                  {token ? (
                    <Button
                      onClick={() => {
                        router.push('/passport/login');
                      }}
                    >
                      前往登录
                    </Button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        );
      }
      if (!token && !forgetPasswordStatus) {
        return (
          <div className={styles.form}>
            <Alert type="warning" message="请填写您的邮箱" banner />
            <Form layout="inline" style={{ margin: '16px 0' }} onSubmit={handleSubmit}>
              <Item label="邮箱">
                {getFieldDecorator('email', {
                  rules: [
                    {
                      required: true,
                      message: '请输入邮箱!',
                    },
                    {
                      pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                      message: '邮箱格式有误!',
                    },
                  ],
                })(<Input />)}
              </Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }
    };

    return (
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div className={styles.title}>{token ? '重置密码' : '忘记密码'}</div>
          {renderForm()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ login, loading }) => ({
  login,
  loading: loading.effects['login/forgetPassword'],
  resetLoading: loading.effects['login/resetPassword'],
});

export default connect(mapStateToProps)(Form.create()(Password));
