import React, { Component, Fragment } from 'react'
import './index.less'
import { Row, Col, Form, Input, Button } from 'antd'
import Store from '../../redux/store'
import Ajax from '../../../Ajax'
import JsCookie from 'js-cookie'
import { connect } from 'react-redux'
const { Item } = Form

class Login extends Component {
  constructor(props) {
    super()
    console.log(props, 'login')
    this.state = {
      loading: false,
    }
  }
  Submit(val) {
    this.setState({
      loading: true,
    })
    // Store.dispatch({ type: 'USERNAME' })
    const { validateFields } = this.refs.form
    validateFields().then((res) => {
      //res 去除form表单里的value 可以直接进行操作
      Ajax.post('login', val).then((res) => {
        const { data } = res
        if (data.token) {
          JsCookie.set('token', data.token)
          this.props.loginIn({ type: 1, value: data.token })
          this.setState({
            loading: false,
          })
        }
      })
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
          className="login_container"
        >
          <Col span={8}>
            <div className="login_form">
              <div className="login_title">GameSystem</div>
              <Form
                ref="form"
                onFinish={(val) => this.Submit(val)}
                initialValues={{ userId: 111 }}
              >
                <Item
                  name="userId"
                  rules={[{ required: true, message: 'please input ur name' }]}
                >
                  <Input placeholder="用户名" />
                </Item>
                <Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      min: 8,
                      message: '最少8位数',
                    },
                  ]}
                >
                  <Input.Password placeholder="密码" />
                </Item>
                <Item>
                  <Row type="flex" align="middle" justify="center">
                    <Button
                      htmlType="submit"
                      type="success"
                      block
                      loading={this.state.loading}
                    >
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

const mapStateToProps = (state) => ({ state })
const mapDispatchToProps = (dispatch) => {
  return {
    loginIn: (actions) => dispatch(actions),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
