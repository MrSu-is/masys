import React from 'react';
import {withRouter} from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Dropdown,Icon, Avatar, message,Badge } from 'antd';
import 'antd/dist/antd.css';
import {adminRoute} from '../../routers';
import '../../App.css';
import './frame.css';
import { clearToken } from "../../utils/auth"
import { connect } from "react-redux"



const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const routers = adminRoute.filter(route=>route.isShow)
function index(props) {
  console.log(props)
  const popMenu = (
    <Menu onClick={p=>{
      if(p.key == 'logOut'){
        clearToken()
        props.history.push('/login')
      }else{
        //message.info(p.key)
        if((p.key == "noti")){
          props.history.push("/admin/notice")
        }
      }
    }}>
      <Menu.Item key="noti">
        通知中心
      </Menu.Item >
      <Menu.Item key="setting">
        设置
      </Menu.Item>
      <Menu.Item key="logOut">
        退出
      </Menu.Item>
    </Menu>
  );
    return (
        <Layout>
<Header className="header">
  <div className="logo" />
  <h2 style={{ left:"50%",color:'white' }}>管理系统</h2>
  <Dropdown overlay={popMenu}>
    <div>
      <Avatar>U</Avatar>
      <Badge dot={!props.isAllRead}>
      <span>超管</span>
      </Badge>
      <Icon type="down"/>
    </div>
  </Dropdown>
</Header>
<Layout>
  <Sider width={200} className="site-layout-background">
    <Menu
      mode="inline"
      defaultSelectedKeys={[props.location.pathname]}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
    >
      {routers.map(route=>{
            return (
            <Menu.Item key={route.path} onClick={p=>props.history.push(p.key)}>
              <Icon type={route.icon} />
              {route.title}
            </Menu.Item>
            )
        })}
    </Menu>
  </Sider>
  <Layout style={{ padding: '0 24px 24px' }}>
    {/*<Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>*/}
    <Content
      
      style={{
        background:"#fff",
        
        margin: 0,
        minHeight: 280,
      }}
    >
      {props.children}
    </Content>
  </Layout>
</Layout>
</Layout>
)
}

const mapStateToProps = state=>state.notice

export default connect(mapStateToProps)(withRouter(index))
