import React from 'react';
import { Card, Table, Icon, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Search } = Input;

export default () => {

  const translation = (text) => {
    const numArr = [`0x${text.slice(0,2)}`, `0x${text.slice(2,4)}`];
    console.log(numArr, Number(numArr[0]).toString(10), Number(numArr[1]).toString(10));
    return Number(Number(numArr[0]).toString(10)) + Number(Number(numArr[1]).toString(10))
  };
  const newStr = '02 11 00f0 00a5 20 20 20 003c 80';
  const newArr = newStr.split(' ');
  const newObj = {
    name: Number(newArr[0]),
    floor: Number(Number(`0x${newArr[1]}`).toString(10)),
    v: translation(newArr[2])
  };
  console.log(newArr, newObj);
  const showAlert = v => {
    if (v === 'ing') {
      return (
        <div style={{ color: '#008034' }}>
          <Icon type="alert" style={{ marginRight: 8 }} />
          充电中...
        </div>
      );
    }
    if (v === 'warnning') {
      return (
        <div style={{ color: '#ff4d4f' }}>
          <Icon type="alert" style={{ marginRight: 8 }} />
          异常
        </div>
      );
    }
    if (v === 'free') {
      return (
        <div style={{ color: '#108ee9' }}>
          <Icon type="alert" style={{ marginRight: 8 }} />
          空闲
        </div>
      );
    }
  };
  const columns = [
    {
      title: '架号',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: '位置',
      align: 'center',
      children: [
        {
          title: '层',
          dataIndex: 'floor',
          key: 'floor',
          align: 'center',
        },
        {
          title: '号',
          dataIndex: 'number',
          key: 'number',
          align: 'center',
        },
      ],
    },
    {
      title: '当前温度（℃）',
      align: 'center',
      children: [
        {
          title: 'NTC1',
          dataIndex: 'NTC1',
          key: 'NTC1',
          align: 'center',
        },
        {
          title: 'NTC2',
          dataIndex: 'NTC2',
          key: 'NTC2',
          align: 'center',
        },
        {
          title: 'NTC3',
          dataIndex: 'NTC3',
          key: 'NTC3',
          align: 'center',
        },
      ],
    },
    {
      title: '充电电压',
      align: 'center',
      children: [
        {
          title: 'V',
          dataIndex: 'v',
          key: 'v',
          align: 'center',
        },
      ],
    },
    {
      title: '充电电流',
      align: 'center',
      children: [
        {
          title: 'I',
          dataIndex: 'i',
          key: 'i',
          align: 'center',
        },
      ],
    },
    {
      title: '充电时间',
      align: 'center',
      children: [
        {
          title: 'Hr',
          dataIndex: 'hr',
          key: 'hr',
          align: 'center',
        },
      ],
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: text => {
        return showAlert(text);
      },
    },
  ];
  const data = [];
  for (let i = 0; i < 10; i++) {
    let status = 'ing';
    if (i % 3 === 0) {
      status = 'ing';
    }
    if (i % 3 === 1) {
      status = 'warnning';
    }
    if (i % 3 === 2) {
      status = 'free';
    }
    data.push({
      key: i,
      name: i + 1,
      floor: 'X',
      number: 'X',
      NTC1: 23.2,
      NTC2: 36.1,
      NTC3: 27.4,
      v: 220,
      i: 2000,
      hr: 3.5,
      status,
    });
  }
  return (
    <PageHeaderWrapper title="">
      <Card>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
          <Search
            placeholder=" 请输入..."
            enterButton="搜 索"
            size="large"
            style={{ width: 400, marginBottom: 16 }}
            onSearch={value => console.log(value)}
          />
        </div>
        <Table columns={columns} dataSource={data} bordered />
      </Card>
    </PageHeaderWrapper>
  );
};
