import React from 'react';
import { Form, Icon, Input, Button, Row, Col, Alert, Modal } from 'antd';
import styles from '../index.less';

const { Item: FormItem } = Form;

const Register = ({ form, dispatch, login, loading }) => {
  const { msg, checked, visible, error, errorVisible } = login;
  const { getFieldDecorator, validateFields } = form;
  const onValidateForm = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/register',
          payload: {
            password: values.password1,
            name: values.name,
            email: values.email,
            phone: values.phone,
            username: values.usernames,
          },
        });
      }
    });
  };
  const onClick = () => {
    dispatch({
      type: 'login/updateState',
      payload: {
        checked: !checked,
      },
    });
  };
  const handleCancel = () => {
    dispatch({
      type: 'login/updateState',
      payload: {
        visible: !visible,
        checked: !checked,
      },
    });
  };
  const handleErrorCancel = () => {
    dispatch({
      type: 'login/updateState',
      payload: {
        errorVisible: !errorVisible,
      },
    });
  };
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password1')) {
      callback('两次密码不一致！');
    } else {
      callback();
    }
  };
  return (
    <div className={styles.main}>
      <div className={styles.title}>XXXXXXXX系统</div>
      <div>
        <div className={styles.logo} style={{ float: 'left', width: '50%' }}>
          注&nbsp;&nbsp;&nbsp;&nbsp;册
        </div>
        <div
          onClick={onClick}
          className={styles.logo_checked}
          style={{ float: 'right', width: '50%', borderRadius: '0 4px 0 0' }}
        >
          登&nbsp;&nbsp;&nbsp;&nbsp;录
        </div>
      </div>
      {msg ? (
        <div className={styles.alert}>
          <Alert type="error" message={msg} banner />
        </div>
      ) : null}
      <Form onSubmit={onValidateForm} style={{ padding: 24 }}>
        <Row gutter={16} style={{ marginTop: 40 }}>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('usernames', {
                rules: [
                  { required: true, message: '请输入用户名!' },
                  {
                    min: 2,
                    max: 20,
                    message: '请输入2-20个字符！',
                  },
                  {
                    pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_]{2,20}$/,
                    message: '不能使用中文或特殊字符！',
                  },
                ],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请输入昵称!' },
                  {
                    min: 2,
                    max: 30,
                    message: '请输入2-30个字符',
                  },
                  {
                    pattern: /^\s{0}$|^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                    min: 6,
                    message: '请输入正确格式昵称',
                  },
                ],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="昵称"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12} className={styles.col}>
            <FormItem>
              {getFieldDecorator('password1', {
                rules: [
                  { required: true, message: '请输入密码!' },
                  {
                    pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
                    min: 6,
                    message:
                      '请输入长度至少为6位的密码，并包含大小写字母，数字及特殊字符，如 !@#$%^&*?',
                  },
                  {
                    max: 20,
                    message: '密码长度不能超过20个字符',
                  },
                ],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </FormItem>
          </Col>
          <Col span={12} className={styles.col}>
            <FormItem>
              {getFieldDecorator('password2', {
                rules: [
                  { required: true, message: '请再次输入密码!' },
                  {
                    pattern: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
                    min: 6,
                    message:
                      '请输入长度至少为6位的密码，并包含大小写字母，数字及特殊字符，如 !@#$%^&*?',
                  },
                  {
                    max: 20,
                    message: '密码长度不能超过20个字符',
                  },
                  {
                    validator: compareToFirstPassword,
                  },
                ],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="确认密码"
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12} className={styles.col}>
            <FormItem>
              {getFieldDecorator('phone', {
                rules: [
                  { required: true, message: '请输入手机号!' },
                  {
                    pattern: /^(13\d|15[^4,\D]|16\d|17[135678]|18\d)\d{8}|170[^346,\D]\d{7}$/,
                    message: '请输入正确的手机号码!',
                  },
                ],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="手机号"
                />
              )}
            </FormItem>
          </Col>
          <Col span={12} className={styles.col}>
            <FormItem>
              {getFieldDecorator('email', {
                rules: [
                  { required: true, message: '请输入邮箱!' },
                  {
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: '请输入正确的电子邮箱!',
                  },
                ],
              })(
                <Input
                  size="large"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="email"
                  placeholder="邮箱"
                />
              )}
            </FormItem>
          </Col>
        </Row>

        <FormItem style={{ textAlign: 'center' }} className={styles.col}>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            style={{ width: '50%' }}
            loading={loading}
          >
            完成注册
          </Button>
        </FormItem>
      </Form>
      <Modal
        title=" "
        visible={visible}
        onCancel={handleCancel}
        style={{ textAlign: 'center' }}
        footer={null}
      >
        <h2 style={{ marginBottom: 4, fontWeight: 600 }}>注册成功！</h2>
        <p>请前往邮箱查看并激活验证</p>
      </Modal>
      <Modal
        title=" "
        visible={errorVisible}
        onCancel={handleErrorCancel}
        style={{ textAlign: 'center' }}
        footer={null}
      >
        <h2 style={{ marginBottom: 4, fontWeight: 600 }}>注册失败！</h2>
        <p>{error.message}</p>
      </Modal>
    </div>
  );
};

export default Register;
