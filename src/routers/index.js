import NOTFOUND from "../page/404";
import index from "../page/admin/darshboard";
import edit from "../page/admin/products/edit";
import list from "../page/admin/products/list";
import login from "../page/login";
import Index from "../page/admin/notice/index"

export const logRout = [{
    path: '/login',
    component: login
},{
    path: '/404',
    component: NOTFOUND
}];

export  const adminRoute = [{
    path: '/admin/dashboard',
    component: index,
    isShow: true,
    title: '看板',
    icom: "area-chart"
},{
    path: '/admin/products',
    component:list,
    isShow: true,
    title: '管理',
    icom: 'shop',
    exact: true 
},{
    path:'/admin/edit/:_id?',
    component: edit,
    isShow: false
},
{
    path:'/admin/notice',
    component: Index,
    isShow: false
},
]