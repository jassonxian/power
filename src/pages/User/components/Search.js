import React from 'react';
import AdvancedSearch from '@/components/AdvancedSearch';

const Search = ({ filter, ...rest }) => {
  const advancedSearchProps = {
    filter,
    ...rest,
    searchFields: [
      {
        type: 'input',
        label: '姓名',
        name: 'name',
        inputProps: {
          placeholder: '请输入姓名',
        },
      },
      {
        type: 'input',
        label: '手机',
        name: 'phone',
        inputProps: {
          placeholder: '请输入手机号码',
        },
      },
      {
        type: 'input',
        label: '邮箱',
        name: 'email',
        inputProps: {
          placeholder: '请输入邮箱',
        },
      },
      // {
      //   label: '创建时间',
      //   type: 'range',
      //   name: 'create_time',
      //   inputProps: {
      //     format: 'YYYY-MM-DD HH:mm',
      //     placeholder: ['开始时间', '结束时间'],
      //   },
      // },
    ],
  };
  return <AdvancedSearch {...advancedSearchProps} />;
};

export default Search;
