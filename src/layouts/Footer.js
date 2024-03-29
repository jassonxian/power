import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import { GlobalFooter } from 'ant-design-pro';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2016 - 2019 天宝电子科技有限公司
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
