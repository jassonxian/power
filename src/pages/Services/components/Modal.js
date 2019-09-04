import React from 'react';
import FormModal from '@/components/FormModal';

const Modal = props => {
  const { ...params } = props;
  const formFields = [
    {
      type: 'input',
      label: '系统服务名称',
      name: 'name',
      inputProps: {
        placeholder: '请输入系统服务名称',
      },
      decoratorOptions: {
        rules: [
          {
            required: true,
            pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4E00-\u9FA5]{2,30}$/,
            message: '请输入格式有误',
          },
        ],
      },
    },
    {
      type: 'input',
      label: '系统描述',
      name: 'description',
      inputProps: {
        placeholder: '请输入...',
      },
      decoratorOptions: {
        rules: [
          {
            required: true,
            min: 2,
            max: 30,
            message: '请输入2-30个字符',
          },
        ],
      },
    },
    {
      type: 'input',
      label: '系统登录地址',
      name: 'service_url',
      inputProps: {
        placeholder: '以http(s)://开头',
      },
      decoratorOptions: {
        rules: [
          {
            required: true,
            // eslint-disable-next-line
            pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            message: '输入格式有误',
          },
        ],
      },
    },
    {
      type: 'input',
      label: '系统退出地址',
      name: 'logout_url',
      inputProps: {
        placeholder: '以http(s)://开头',
      },
      decoratorOptions: {
        rules: [
          {
            required: true,
            // eslint-disable-next-line
            pattern: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
            message: '输入格式有误',
          },
        ],
      },
    },
  ];
  const modalProps = {
    formFields,
    ...params,
  };
  return <FormModal {...modalProps} />;
};

export default Modal;
