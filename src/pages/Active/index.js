import React from 'react';
import { Spin } from 'antd';
import style from './style.less';

const Index = () => (
  <div className={style.spin}>
    <Spin />
  </div>
);

export default Index;
