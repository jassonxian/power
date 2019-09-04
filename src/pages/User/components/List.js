import React from 'react';
import { Table } from 'antd';
import Operation from '@/components/Operation';
import { recoverSort } from '@/pages/_utils/utils';

const List = ({
  list,
  loading,
  pagination,
  sort,
  handleChange,
  onUpdate,
  activate,
  remove,
  onAuthority,
  reset,
}) => {
  const actions = record => {
    const acts = [];
    if (record.active) {
      acts.push({
        text: '编辑',
        primary: true,
        onAction: () => onUpdate(record),
      });
      acts.push({
        text: '服务权限',
        primary: true,
        onAction: () => onAuthority(record),
      });
    }
    if (!record.active) {
      acts.push({
        text: '激活',
        confirmer: {
          title: '确定激活该用户吗？',
          placement: 'topRight',
          onConfirm: () => activate({ user_id: record.user_id }),
        },
      });
    }
    acts.push({
      text: '重置密码',
      confirmer: {
        title: '确定重置该用户密码？',
        placement: 'topRight',
        onConfirm: () => reset({ user_id: record.user_id }),
      },
    });
    acts.push({
      text: '删除',
      confirmer: {
        title: '确定删除该用户吗？',
        placement: 'topRight',
        onConfirm: () => remove({ user_id: record.user_id }),
      },
    });
    return acts;
  };

  const columns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: text => (text ? '普通用户' : '管理员'),
    },
    { title: '手机', dataIndex: 'phone', key: 'phone', align: 'center' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    {
      title: '操作',
      key: 'operations',
      width: 128,
      align: 'center',
      render: (text, record) => {
        return <Operation actions={actions(record)} />;
      },
    },
  ];

  const onChange = (tablePagination, tableFilter, tableSort) => {
    const tableState = {
      page: tablePagination.current,
      size: tablePagination.pageSize,
    };
    if (tableSort.order) {
      tableState.sort = tableSort.order === 'ascend' ? tableSort.field : `-${tableSort.field}`;
    }
    handleChange(tableState);
  };

  return (
    <Table
      columns={recoverSort(columns, sort)}
      loading={loading}
      dataSource={list.map(item => ({ ...item, key: item.user_id }))}
      pagination={pagination}
      onChange={onChange}
    />
  );
};

export default List;
