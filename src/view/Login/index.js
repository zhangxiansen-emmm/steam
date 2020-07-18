import React, { Component, Fragment, createRef } from 'react'
import './index.less'
import { Row, Col, Form, Input, Button } from 'antd'
import Ajax from '../../../Ajax'
const { Item } = Form
class Login extends Component {
  constructor(props) {
    super()
    this.formRef = React.createRef()
  }
  componentDidMount() {
    console.log(this.formRef)
  }
  Submit(val) {
    Ajax.post('login', val).then((res) => {
      console.log(res)
    })
  }
  render() {
    return (
      <Fragment>
        <Row
          tyle="flex"
          align="middle"
          justify="center"
          style={{ height: '100%' }}
        >
          <Col span={5}>
            <div className="login_container">
              <Form ref={this.formRef} onFinish={this.Submit}>
                <Item label="账号" name="userId">
                  <Input />
                </Item>
                <Item label="密码" name="passWord">
                  <Input.Password />
                </Item>
                <Item>
                  <Row type="flex" align="middle" justify="center">
                    <Button htmlType="submit" type="primary">
                      登录
                    </Button>
                  </Row>
                </Item>
              </Form>
            </div>
          </Col>
        </Row>
      </Fragment>
    )
  }
}
export default Login
