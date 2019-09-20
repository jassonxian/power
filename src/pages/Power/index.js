import React from 'react';
import { connect } from 'dva';
import { Card, Table, Icon, Input, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

const { Search } = Input;

class Power extends React.Component {
  state = {
    // eslint-disable-next-line
    timer: null
  }

  componentDidMount() {
    const  { dispatch } = this.props;
    this.setState({
      // eslint-disable-next-line
      timer: setInterval(() => {
        dispatch({
          type: 'power/fetch'
        })
      }, 3000)
    })
  }

  componentWillUnmount() {
    this.setState({
      // eslint-disable-next-line
      timer: null
    })
  }

  render() {
    const { dispatch, power, fetching } = this.props;
    const { list, clone } = power;
    const translation = text => {
      const numArr = [`0x${text.slice(0, 2)}`, `0x${text.slice(2, 4)}`];
      return Number(Number(numArr[0]).toString(10)) + Number(Number(numArr[1]).toString(10));
    };

    const hex_to_bin = str => {
      const hex_array = [
        { key: '0', val: '0000' },
        { key: '1', val: '0001' },
        { key: '2', val: '0010' },
        { key: '3', val: '0011' },
        { key: '4', val: '0100' },
        { key: '5', val: '0101' },
        { key: '6', val: '0110' },
        { key: '7', val: '0111' },
        { key: '8', val: '1000' },
        { key: '9', val: '1001' },
        { key: 'a', val: '1010' },
        { key: 'b', val: '1011' },
        { key: 'c', val: '1100' },
        { key: 'd', val: '1101' },
        { key: 'e', val: '1110' },
        { key: 'f', val: '1111' },
      ];

      let value = '';
      for (let j = 0; j < hex_array.length; j++) {
        if (str === hex_array[j].key) {
          value = value.concat(hex_array[j].val);
          break;
        }
      }
      return value;
    };
    const data = list.map(item => {
      if (item.code) {
        const newArr = [
          item.code.slice(0, 2),
          item.code.slice(2, 4),
          item.code.slice(4, 8),
          item.code.slice(8, 12),
          item.code.slice(12, 14),
          item.code.slice(14, 16),
          item.code.slice(16, 18),
          item.code.slice(18, 22),
          item.code.slice(22, 24),
        ];
        const statusArr = newArr[8].split('');
        const newObj = {
          key: item.id,
          name: Number(Number(`0x${newArr[0]}`).toString(10)),
          number: Number(Number(`0x${newArr[1]}`).toString(10)),
          v: Number((translation(newArr[2]) * 3.4) / 100).toFixed(2),
          i: Number((translation(newArr[3]) * 1.1) / 1000).toFixed(4),
          NTC1: Number(Number(`0x${newArr[4]}`).toString(10)) - 23,
          NTC2: Number(Number(`0x${newArr[5]}`).toString(10)) - 23,
          NTC3: Number(Number(`0x${newArr[6]}`).toString(10)) - 23,
          hr: Number(translation(newArr[7]) / 60).toFixed(1),
          status: `${hex_to_bin(statusArr[0])}${hex_to_bin(statusArr[1])}`,
        };
        return newObj;
      }
      return undefined;
    });
    // 008034 redff4d4f blue108ee9
    const showAlert = v => {
      if (v[0] === '0') {
        return (
          <div style={{ color: '#ff4d4f' }}>
            <Icon type="alert" style={{ marginRight: 8 }} />
            无电池
          </div>
        );
      }

      if (v[1] === '1') {
        return (
          <div style={{ color: '#008034' }}>
            <Icon type="alert" style={{ marginRight: 8 }} />
            满电
          </div>
        );
      }
      if (v[1] === '0') {
        return (
          <div style={{ color: '#008034' }}>
            <Icon type="alert" style={{ marginRight: 8 }} />
            充电中...
          </div>
        );
      }
      if (v[2] === '1') {
        return (
          <div style={{ color: '#108ee9' }}>
            <Icon type="alert" style={{ marginRight: 8 }} />
            充电结束
          </div>
        );
      }
      if (v[3] === '1') {
        return (
          <div style={{ color: '#ff4d4f' }}>
            <Icon type="alert" style={{ marginRight: 8 }} />
            过温
          </div>
        );
      }
      if (v[4] === '1') {
        return (
          <div style={{ color: '#ff4d4f' }}>
            <Icon type="alert" style={{ marginRight: 8 }} />
            过流
          </div>
        );
      }
      if (v[5] === '1') {
        return (
          <div style={{ color: '#ff4d4f' }}>
            <Icon type="alert" style={{ marginRight: 8 }} />
            电压低
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
    return (
      <PageHeaderWrapper title="">
        <Card>
          <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Search
              placeholder=" 请输入..."
              enterButton="搜 索"
              size="large"
              style={{ width: 400, marginBottom: 16 }}
              onSearch={value => {
                if (value >= 1 && value <= 5) {
                  const filterData = clone.filter(item => item.code.slice(0, 2) === `0${value}`);
                  return dispatch({
                    type: 'power/updateState',
                    payload: {
                      list: filterData,
                    },
                  });
                }
                message.warning('请输入1-5以内的数字');
              }}
            />
          </div>
          <Table columns={columns} dataSource={data} bordered loading={fetching} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

const mapStateToProps = ({ power, loading }) => ({
  power,
  fetching: loading.effects['power/fetch'],
});

export default connect(mapStateToProps)(Power);
