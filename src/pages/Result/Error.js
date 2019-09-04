import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Input, Icon, Card, Form } from 'antd';
import Result from '@/components/Result';

const { Item } = Form;

const Index = ({ form, dispatch, location }) => {
  const {
    state: { info },
  } = location;
  const { getFieldDecorator, validateFields } = form;

  const onAuth = () => {
    validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'error/fetch',
          payload: values,
        });
      }
    });
  };

  const extra = (
    <Fragment>
      <div
        style={{
          fontSize: 16,
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: '500',
          marginBottom: 16,
        }}
      >
        失败信息
      </div>
      <div style={{ marginBottom: 16 }}>
        <Icon style={{ color: '#f5222d', marginRight: 8 }} type="close-circle-o" />
        {info.message}
        <span style={{ marginLeft: 8 }}>请输入邮箱后重新激活</span>
        <Form layout="inline" style={{ margin: '16px 0' }}>
          <Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                  message: '请输入邮箱!',
                },
              ],
            })(<Input />)}
          </Item>
          <a style={{ marginLeft: 16, lineHeight: '40px' }} onClick={onAuth}>
            {`重新激活>>`}
          </a>
        </Form>
      </div>
    </Fragment>
  );

  return (
    <Card bordered={false}>
      <Result
        type="error"
        title="激活失败"
        description="很抱歉，请查看失败原因后重新激活"
        extra={extra}
        // actions={actions}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  );
};

const mapStateToProps = props => props;

export default connect(mapStateToProps)(Form.create()(Index));
