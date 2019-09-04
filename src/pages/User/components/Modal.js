import React from 'react';
import { Modal, Form, Input, Tooltip } from 'antd';
import { filterEmpty } from '@/utils/utils';
import { USER_RULES, formItemLayout } from './const';

const { Item } = Form;

const UserModal = ({
  type,
  currentItem,
  onRoleChange,
  onOk,
  form: { getFieldDecorator, validateFields },
  ...rest
}) => {
  const handleOk = () => {
    const fields = ['username', 'name', 'phone', 'telephone', 'email', 'role_id'];
    if (type === 'create') fields.push('password');
    validateFields(fields, (error, values) => {
      if (!error) {
        const filtered = filterEmpty(values);
        onOk(filtered);
      }
    });
  };

  const modalOpts = {
    ...rest,
    destroyOnClose: true,
    style: { top: 40 },
    onOk: handleOk,
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Item {...formItemLayout} label="用户名">
          <Tooltip
            trigger={['focus']}
            title="2~30个字符，可使用字母、数字、下划线，需以字母或数字开头"
            placement="topLeft"
          >
            {getFieldDecorator('username', {
              initialValue: currentItem.username,
              rules: USER_RULES.username,
            })(<Input placeholder="请输入用户名" />)}
          </Tooltip>
        </Item>
        {type === 'create' && (
          <Item {...formItemLayout} label="密码">
            <Tooltip
              trigger={['focus']}
              title="请包含大小写字母，数字及特殊字符，如 !@#$%^&*?"
              placement="topLeft"
            >
              {getFieldDecorator('password', {
                rules: USER_RULES.password,
              })(<Input type="password" placeholder="请输入密码" />)}
            </Tooltip>
          </Item>
        )}
        <Item {...formItemLayout} label="姓名">
          {getFieldDecorator('name', {
            initialValue: currentItem.name,
            rules: USER_RULES.name,
          })(<Input placeholder="请输入姓名" />)}
        </Item>
        <Item {...formItemLayout} label="手机">
          {getFieldDecorator('phone', {
            initialValue: currentItem.phone,
            rules: USER_RULES.phone,
          })(<Input placeholder="请输入手机号码" />)}
        </Item>
        <Item {...formItemLayout} label="电话">
          {getFieldDecorator('telephone', {
            initialValue: currentItem.telephone,
            rules: USER_RULES.telephone,
          })(<Input placeholder="016-19911212" />)}
        </Item>
        <Item {...formItemLayout} label="邮箱">
          {getFieldDecorator('email', {
            initialValue: currentItem.email,
            rules: USER_RULES.email,
          })(<Input placeholder="请输入电子邮箱" />)}
        </Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(UserModal);
