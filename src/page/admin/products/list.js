import React,{useEffect,useState} from 'react'
import { Card,Table,Button,Popconfirm } from 'antd'
import { listApi,delte,change } from '../../../service/product'
import './list.css'
import { connect } from 'react-redux'
import { loadProduct } from '../../../store/actions/product'
import { serverUrl } from '../../../utils/config'



/*const data = [{
    ID:278001,
    name: '2077',
    price: 298
},{
    ID:278002,
    name:'Elden Ring',
    price: 358
}]*/

function List(props) { 
    //定义局部状态
    //const [data, setData] = useState([])
    const { list,page,total } = props
    useEffect(()=>{
        props.dispatch(loadProduct({
            page:1,
            
        }))
       /* listApi().then(res => {
            console.log(res);
            setData(res.products)
            setTotal(res.totalCount)
        });*/
    },[]);
    
    const loadData = ()=>{
        props.dispatch(loadProduct({
            page:page,
            
        }))
        //console.log(page);
        /*listApi(page).then(res => {
            //console.log(page);
            setData(res.products)
            setTotal(res.totalCount)
            setCurrentPage(page)
        });*/};
    //const [total, setTotal] = useState(0);
    //const [currentPage, setCurrentPage] = useState(1);
    const tablethings = [
    {
        title:'编号',
        key:"_id",
        width: 80,
        align: 'center',
        render:(txt,record,index)=>index+1
    },{
        title:'命名',
        dataIndex: 'name',

    },
    {
        title:'图片',
        dataIndex: 'coverImg',
        render: (txt,record) =>record.coverImg?(
        <img src={serverUrl + record.coverImg} 
        alt={record.name} 
        style={{width:"100px"}}/>
        ):("暂无图片")
    },
    {
        title:'价格',
        dataIndex: 'price'
    },
    {
        title:'是否有货',
        dataIndex: "onSale",
        render: (txt,record)=>(record.onSale?"有货":"缺货")
    },
    {
        title:'操作',
        render: (txt,record,index) => {
            return(
                <div>
                    <Button 
                    type="primary" 
                    size="small" 
                    onClick={()=>{
                        props.history.push(`/admin/edit/${record._id}`);
                        }}>修改</Button>
                    <Popconfirm title="确定删除此项？" onCancel={() => console.log('取消')} 
                    onConfirm={()=>{
                    //console.log("确定")
                    delte(record._id).then(res=>{
                        loadData();
                    })}
                    }>
                    <Button style={{margin:"0 1rem"}} size="small">删除</Button>
                    </Popconfirm>
                    <Button size="small" onClick={()=>{
                        change(record._id,{onSale: !record.onSale}).then(res =>{
                            loadData()
                        })
                    }}>{record.onSale?"下架":"补货"}</Button>
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
            <Table rowKey="_id" rowClassName={record=>(record.onSale?"":"bkgcolr")} pagination={{total,defaultPageSize:5,onChange:p=>{props.dispatch(loadProduct({page:p}))}}} columns = {tablethings} bordered dataSource={list}/>
        </Card>
    ) 
}

export default connect(state=>state.product)(List)