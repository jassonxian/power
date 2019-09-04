import React from 'react';
import { Modal, Form, Transfer } from 'antd';
import { filterEmpty } from '@/utils/utils';
import { formItemLayout } from './const';

const { Item } = Form;

const UserModal = ({
  dispatch,
  type,
  currentItem,
  targetKeys,
  onRoleChange,
  onOk,
  serviceData,
  form: { getFieldDecorator, validateFields },
  ...rest
}) => {
  const handleOk = () => {
    validateFields((error, values) => {
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

  const handleChange = targetKey => {
    dispatch({
      type: 'users/updateState',
      payload: {
        targetKeys: targetKey,
      },
    });
  };

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <Item {...formItemLayout} label="系统服务">
          {getFieldDecorator('services', {
            rules: [{ required: true, message: '请选择系统服务' }],
          })(
            <Transfer
              dataSource={serviceData.map(item => ({ ...item, key: item.uuid, title: item.name }))}
              showSearch
              targetKeys={targetKeys}
              onChange={handleChange}
              render={item => item.title}
            />
          )}
        </Item>
      </Form>
    </Modal>
  );
};

export default Form.create()(UserModal);
