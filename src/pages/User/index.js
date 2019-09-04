import React from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { handleRefresh } from '@/pages/_utils/utils';
import Search from './components/Search';
import List from './components/List';
import Modal from './components/Modal';
import AuthModal from './components/AuthModal';

const Users = ({ location, dispatch, users, fetching }) => {
  const {
    list,
    pagination,
    filter,
    sort,
    modalVisible,
    modalType,
    serviceData,
    currentItem,
    authModalVisible,
    user_id,
    submitting,
    targetKeys,
  } = users;

  const searchProps = {
    filter,
    onOk(query) {
      handleRefresh(dispatch, location, { type: 'search', query });
    },
    onReset() {
      handleRefresh(dispatch, location, { type: 'search' });
    },
  };

  const listProps = {
    list,
    loading: fetching,
    pagination,
    sort,
    handleChange(query) {
      handleRefresh(dispatch, location, { type: 'list', query });
    },
    onUpdate(item) {
      dispatch({
        type: 'users/updateState',
        payload: {
          currentItem: item,
          modalVisible: true,
          modalType: 'update',
        },
      });
    },
    onAuthority(item) {
      dispatch({
        type: 'users/updateState',
        payload: {
          user_id: item.user_id,
          targetKeys: item.services,
          authModalVisible: true,
        },
      });
    },
    activate(value) {
      dispatch({
        type: 'users/activate',
        payload: {
          ...value,
          active: true,
        },
      });
    },
    remove(value) {
      dispatch({
        type: 'users/remove',
        payload: value,
      });
    },
    reset(value) {
      dispatch({
        type: 'users/reset',
        payload: value,
      });
    },
  };
  const modalProps = {
    type: modalType,
    visible: modalVisible,
    title: `${modalType === 'create' ? '新建用户' : '编辑用户'}`,
    currentItem: modalType === 'create' ? {} : currentItem,
    confirmLoading: submitting,
    onOk(values) {
      dispatch({
        type: `users/${modalType}`,
        payload: values,
      });
    },
    onCancel() {
      dispatch({
        type: 'users/updateState',
        payload: {
          modalVisible: false,
        },
      });
    },
  };
  const serviceModalProps = {
    dispatch,
    targetKeys,
    visible: authModalVisible,
    title: '编辑权限',
    confirmLoading: submitting,
    serviceData,
    width: 640,
    onOk(values) {
      dispatch({
        type: 'users/authority',
        payload: {
          user_id,
          ...values,
        },
      });
    },
    onCancel() {
      dispatch({
        type: 'users/updateState',
        payload: {
          authModalVisible: false,
        },
      });
    },
  };
  const onCreate = () => {
    dispatch({
      type: 'users/updateState',
      payload: {
        modalVisible: true,
        modalType: 'create',
      },
    });
  };
  return (
    <PageHeaderWrapper title="用户管理">
      <Card bordered={false}>
        <div className="tableListPage">
          <div className="tableSearchForm">
            <Search {...searchProps} />
          </div>
          <div className="tableListOperator">
            <Button icon="plus" type="primary" onClick={onCreate}>
              新建
            </Button>
          </div>
          <List {...listProps} />
        </div>
      </Card>
      <Modal {...modalProps} />
      <AuthModal {...serviceModalProps} />
    </PageHeaderWrapper>
  );
};

const mapStateToProps = ({ users, loading, global }) => ({
  users,
  global,
  fetching: loading.effects['users/fetch'],
});

export default connect(mapStateToProps)(Users);
