import React, { Component } from 'react';
import styles from './index.less';
import { Form, Card, Button, Input, Table } from 'antd';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'city',
    key: 'city',
  },
];

export default connect(
  //mapStateToProps
  ({ more }) => ({ ...more }),
  //mapDispatchToProps
  {
    getChannelData: () => ({ type: 'more/getChannelData' }),
    getChannelDataBySearch: search => ({ type: 'more/getChannelDataBySearch', payload: search }),
  },
)(
  class More extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
    }
    componentDidMount() {
      this.props.getChannelData();
    }
    render() {
      const { name } = this.state;
      const { data } = this.props;
      return (
        <PageHeaderWrapper>
          <div className={styles.more}>
            <Card>
              <Form>
                <Form.Item>
                  <Input
                    value={name}
                    onChange={event => this.setState({ name: event.target.value })}
                  />
                </Form.Item>
              </Form>
              <Button
                onClick={() => {
                  this.props.getChannelDataBySearch({ ...this.state });
                }}
              >
                搜索
              </Button>
            </Card>

            <Card>
              <Table dataSource={data} columns={columns} rowKey={record => record.id} />
            </Card>
          </div>
        </PageHeaderWrapper>
      );
    }
  },
);
