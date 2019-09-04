import React from 'react';
import { connect } from 'dva';
import { Card, Button } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { isActionsAllowable } from '../../utils/authority';
import { handleRefresh } from '@/pages/_utils/utils';
import Search from './components/Search';
import List from './components/List';
import Modal from './components/Modal';

const Services = ({ location, dispatch, services, fetching }) => {
  const { list, pagination, filter, sort, modalVisible, modalType, currentItem } = services;
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
    isActionsAllowable,
    list,
    loading: fetching,
    pagination,
    sort,
    handleChange(query) {
      handleRefresh(dispatch, location, { type: 'list', query });
    },
    onUpdate(item) {
      dispatch({
        type: 'services/updateState',
        payload: {
          currentItem: item,
          modalVisible: true,
          modalType: 'update',
        },
      });
    },
    remove(value) {
      dispatch({
        type: 'services/remove',
        payload: value,
      });
    },
  };
  const modalProps = {
    type: modalType,
    visible: modalVisible,
    title: `${modalType === 'create' ? '新建系统服务' : '编辑系统服务'}`,
    currentItem: modalType === 'create' ? {} : currentItem,
    onOk(values) {
      dispatch({
        type: `services/${modalType}`,
        payload: values,
      });
    },
    onCancel() {
      dispatch({
        type: 'services/updateState',
        payload: {
          modalVisible: false,
        },
      });
    },
  };
  const onCreate = () => {
    dispatch({
      type: 'services/updateState',
      payload: {
        currentItem: {},
        modalVisible: true,
        modalType: 'create',
      },
    });
  };
  return (
    <PageHeaderWrapper title="系统服务管理">
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
    </PageHeaderWrapper>
  );
};

const mapStateToProps = ({ services, loading, global }) => ({
  services,
  global,
  fetching: loading.effects['services/fetch'],
});

export default connect(mapStateToProps)(Services);
