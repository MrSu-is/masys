import React, { useState,useEffect } from 'react'
import { Form,Card,Input,Button, message,Icon,Upload } from 'antd'
import { createApi,getOneById,change } from "../../../service/product"
import { serverUrl } from '../../../utils/config'
// 引入编辑器组件
//import BraftEditor from 'braft-editor'
// 引入编辑器样式
//import 'braft-editor/dist/index.css'

function Edit(props) {
    const { getFieldDecorator }= props.form
    const [currentData,setCurrentData] = useState({})
    const [imageUrl,setImageUrl] = useState('')
    //const [editorState, setEditorState] = useState()
    useEffect(()=>{
        if(props.match.params.id){
            getOneById(props.match.params.id)
                .then(res=>{
                    //console.log(res)
                    setCurrentData(res)
                    setImageUrl(res.coverImg)
                    //console.log(res.content)
                    //setEditorState(BraftEditor.createEditorState(res.content))
                    
                })
        }
    },[])
        /*if(props.match.param.id){
            getOneById(props.match.params.id)
                .then(res=>{
                    console.log(res)
                    setCurrentData(res)
                }) 
        }*/
    
    const priceValidate = (rule,value,callback) => {
        if(value*1<0){
            callback("价格不能小于0")
        } else{
            callback();
        }
    } 
    const handleSubmit = e=>{

        //console.log(editorState.toHTML()) //获取当前富文本的内容
        
        e.preventDefault();
        //验证
        props.form.validateFieldsAndScroll((err,values) => {
            if(!err){
                //console.log(values);
                //console.log('已提交');
                if(props.match.params.id){
                    change(props.match.params.id,
                        {
                            ...values,
                            coverImg: imageUrl,
                            //content: editorState.toHTML()
                        })
                    .then(res=>{
                        //console.log(res);
                        props.history.push('/admin/products')
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }else{
                    createApi({...values, coverImg:imageUrl,
                        //content:editorState.toHTML()
                    })
                    .then(res=>{
                        console.log(res);
                        props.history.push('/admin/products')
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                }
               
            } else{
                message.error('错误');
            }
        });
    };
    
    const [loading,setLoading] = useState(false)
    const handleChange = info => {
        if (info.file.status === 'uploading') {
          setLoading( true );
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          setLoading(false);
          console.log(info);
          setImageUrl(info.file.response.info)
        }
      };
    const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      //富文本编辑器
    
    /*const handleEditorChange = e => {
        setEditorState( e )
    }*/
    return (
        <Card title="修改" extra={
            <Button onClick={() => props.history.push("/admin/products")}>
              返回
            </Button>}
                  >
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
                    initivalValue: currentData.price
                    }
                    )(<Input placeholder="请输入价格"/>)
                }
                </Form.Item>
                <Form.Item label="图片">
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={serverUrl+"/api/v1/common/file_upload"}
                    onChange={info => handleChange(info)}
                >
                    {imageUrl ? <img src={serverUrl + imageUrl} 
                    alt="avatar" 
                    style={{ width: '100%' }} /> : (uploadButton)}
                </Upload>
                </Form.Item>
                <Form.Item lable="商品详情">
                {/*<BraftEditor
                    value={editorState}
                    onChange={e=>handleEditorChange(e)}
                />*/}
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">保存</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

export default Form.create({name:'productEdit'})(Edit) 
