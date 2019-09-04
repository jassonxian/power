import React from 'react';
import AdvancedSearch from '@/components/AdvancedSearch';

const Search = ({ filter, ...rest }) => {
  const advancedSearchProps = {
    filter,
    ...rest,
    searchFields: [
      {
        type: 'input',
        label: '系统服务名称',
        name: 'name',
        inputProps: {
          placeholder: '请输入姓名',
        },
      },
      {
        type: 'input',
        label: '系统描述',
        name: 'description',
        inputProps: {
          placeholder: '请输入系统描述',
        },
      },
      {
        type: 'input',
        label: '系统登录地址',
        name: 'service_url',
        inputProps: {
          placeholder: '请输入系统登录地址',
        },
      },
      {
        type: 'input',
        label: '系统退出地址',
        name: 'logout_url',
        inputProps: {
          placeholder: '请输入系统退出地址',
        },
      },
      {
        label: '创建时间',
        type: 'range',
        name: 'create_time',
        inputProps: {
          format: 'YYYY-MM-DD HH:mm',
          placeholder: ['开始时间', '结束时间'],
        },
      },
    ],
  };
  return <AdvancedSearch {...advancedSearchProps} />;
};

export default Search;
