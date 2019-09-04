import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card } from 'antd';
import Result from '@/components/Result';

const Index = ({ location }) => {
  const {
    state: { info },
  } = location;

  const extra = (
    <Fragment>
      <div
        style={{
          fontSize: 16,
          color: 'rgba(0, 0, 0, 0.85)',
          fontWeight: '500',
          marginBottom: 20,
        }}
      >
        注册信息
      </div>
      <Row style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>姓名：</span>
          {info.name}
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>用户名：</span>
          {info.username}
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>邮箱：</span>
          {info.email}
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>电话：</span>
          {info.phone}
        </Col>
      </Row>
    </Fragment>
  );

  return (
    <Card bordered={false}>
      <Result
        type="success"
        title="激活成功"
        description={
          <div>
            恭喜您，以下是您的注册信息，如有问题，请登陆后到个人中心修改！
            <a href="/passport/login">{`前往登录>>`}</a>
          </div>
        }
        extra={extra}
        style={{ marginTop: 48, marginBottom: 16 }}
      />
    </Card>
  );
};

const mapStateToProps = props => props;

export default connect(mapStateToProps)(Index);
