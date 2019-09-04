import React from 'react';
import { Icon } from 'antd';
import styles from './UserLayout.less';

const UserLayout = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.content}>{children}</div>
    <div className={styles.footer}>
      Copyright <Icon type="copyright" /> 2016 - 2019 xxx科技有限公司
    </div>
  </div>
);

export default UserLayout;
