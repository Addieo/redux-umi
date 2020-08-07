import React, { Component } from 'react';
import { Form, Card, Input, Button, Table } from 'antd';
import styles from './index.less';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';

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
  ({ channel }) => {
    return { ...channel };
  },
  {
    getChannelData: () => {
      return { type: 'channel/getChannelData' };
    },
    getChannelDataBySearch: search => {
      return { type: 'channel/getChannelDataBySearch', payload: search };
    },
  },
)(
  class Channel extends Component {
    constructor(props) {
      super(props);
      this.state = { name: '' };
    }
    componentDidMount() {
      this.props.getChannelData();
    }
    submit = () => {
      this.props.getChannelDataBySearch({ ...this.state });
    };
    render() {
      const { name } = this.state;
      const { data } = this.props;
      return (
        <div className={styles.channel}>
          <h3>Channel</h3>
          <PageHeaderWrapper>
            <Card>
              <Form>
                <Form.Item>
                  <Input
                    value={name}
                    onChange={event => this.setState({ name: event.target.value })}
                  />
                </Form.Item>
                <Button type="primary" onClick={this.submit}>
                  提交
                </Button>
              </Form>
            </Card>

            <Card>
              <Table dataSource={data} columns={columns} rowKey={record => record.id} />
            </Card>
          </PageHeaderWrapper>
        </div>
      );
    }
  },
);
