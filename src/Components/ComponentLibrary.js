import React from 'react'
import * as element from "antd";
import * as Icon  from "@ant-design/icons";
const { UserOutlined } = Icon;

// {elementType:'div',isRouter:true,path:'xxx/xxx/xxx',text:'xxxx',title:'xxxx',}

export default () => {
  



  return (
    <div>
      <div>
        <div>
          <element.Input></element.Input>
        </div>
        <div>输入框</div>
      </div>
      <div>
        <div>
          <element.InputNumber></element.InputNumber>
        </div>
        <div>数字输入框</div>
      </div>
      <div>
        <div>
          <element.Avatar size={64} icon={<UserOutlined />} />
          {/* <element.Avatar size="large" icon={<element.UserOutlined />} />
          <element.Avatar icon={<element.UserOutlined />} />
          <element.Avatar size="small" icon={<element.UserOutlined />} /> */}
        </div>
        <div>头像</div>
      </div>
      <div>
        <div>
          <element.Avatar></element.Avatar>
        </div>
        <div>头像</div>
      </div>
    </div>
  );
}