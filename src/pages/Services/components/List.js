import React from 'react';
import { Table } from 'antd';
import Operation from '@/components/Operation';
import { recoverSort } from '@/pages/_utils/utils';

const List = ({ list, loading, pagination, sort, handleChange, onUpdate, remove }) => {
  const actions = record => {
    const acts = [
      {
        text: '编辑',
        primary: true,
        onAction: () => onUpdate(record),
      },
      {
        text: '删除',
        confirmer: {
          title: '确定删除该服务吗？',
          placement: 'topRight',
          onConfirm: () => remove({ service_id: record.id }),
        },
      },
    ];
    return acts;
  };

  const columns = [
    { title: '系统服务名称', dataIndex: 'name', key: 'name' },
    { title: '系统描述', dataIndex: 'description', key: 'description' },
    { title: '系统登录地址', dataIndex: 'service_url', key: 'service_url' },
    { title: '系统退出地址', dataIndex: 'logout_url', key: 'logout_url' },
    { title: '创建时间', dataIndex: 'create_time', key: 'create_time', align: 'center' },
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
      dataSource={list.map(item => ({ ...item, key: item.id }))}
      pagination={pagination}
      onChange={onChange}
    />
  );
};

export default List;
