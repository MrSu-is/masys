import React, { useState,useEffect } from 'react'
import { Form,Card,Input,Button, message } from 'antd'
import { createApi,getOneById,change } from "../../../service/product"

function Edit(props) {
    const [currentData,setCurrentData] = useState({})
    /*useEffect(()=>{
        if(props.match.params._id){
            getOneById(props.match.params._id)
                .then(res=>{
                    console.log(res)
                    setCurrentData(res)
                })
        }
    },[])
    if(props.match.param._id){
        getOneById(props.match.params._id)
            .then(res=>{
                console.log(res)
                setCurrentData(res)
            })
    }*/
    const { getFieldDecorator }= props.form
    const priceValidate = (rule,value,callback) => {
        if(value*1<0){
            callback("价格不能小于0")
        } else{
            callback();
        }
    }
    const handleSubmit = e=>{
        console.log(e);
        e.preventDefault();
        //验证
        props.form.validateFieldsAndScroll((err,values) => {
            if(!err){
                //console.log(values);
                //console.log('已提交');
                /*if(props.match.params,id){
                    change(props.match.params.id,values)
                    .then(res=>{
                        console.log(res);
                        props.history.push('/admin/products')
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    createApi(values)
                    .then(res=>{
                        console.log(res);
                        props.history.push('/admin/products')
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }*/
                createApi(values)
                    .then(res=>{
                        console.log(res);
                        props.history.push('/admin/products')
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            } else{
                message.error('错误');
            }
        });
    };
    return (
        <Card title="修改">
            <Form onSubmit = {e=>handleSubmit(e)}>
                <Form.Item label="商品名">{
                    getFieldDecorator('name',{
                        rules: [{
                            required: true,
                            message: '请输入商品名'
                        }],
                        initivalValue: currentData.name
                    }
                    )(<Input placeholder="请输入商品名"/>)
                }
                </Form.Item>
                <Form.Item label="价格">{
                    getFieldDecorator('price',{
                        rules: [{
                            required: true,
                            message: '请输入价格'
                        },
                        {
                            validator: priceValidate
                        }
                        
                    ],
                    initivalValue: currentData.name
                    }
                    )(<Input placeholder="请输入价格"/>)
                }
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Form.create({name:'productEdit'})(Edit) 
