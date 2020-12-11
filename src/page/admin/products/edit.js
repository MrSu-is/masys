import React from 'react'
import { Form,Card,Input,Button, message } from 'antd'

function edit(props) {
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
                console.log(values);
                console.log('已提交');
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
                        }]
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
                        
                    ]
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

export default Form.create({name:'productEdit'})(edit) 
