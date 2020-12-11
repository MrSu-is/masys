import React from 'react'
import { Card,Table,Button,Popconfirm } from 'antd'

const data = [{
    ID:278001,
    name: '2077',
    price: 298
},{
    ID:278002,
    name:'Elden Ring',
    price: 358
}]

function list(props) {
    const tablethings = [{
        title:'编号',
        key:'ID',
        width: 80,
        align: 'center',
        render:(txt,record,index)=>index+1
    },{
        title:'命名',
        dataIndex: 'name',

    },{
        title:'价格',
        dataIndex: 'price'
    },{
        title:'操作',
        render: (txt,record,index) => {
            return(
                <div>
                    <Button type="primary" size="small">修改</Button>
                    <Popconfirm title="确定删除此项？" onCancel={() => console.log('取消')} onConfirm={()=>console.log("确定")}>
                    <Button style={{margin:"0 1rem"}} size="small">删除</Button>
                    </Popconfirm>
                </div>
            )
        }
    }]
    return (
        <Card title="列表" extra={<Button type="primary" size="small" onClick={()=>props.history.push("/admin/edit")}>
            新添成员
            </Button>
            }
        >
            <Table rowKey="ID" columns = {tablethings} bordered dataSource={data}/>
        </Card>
    )
}

export default list