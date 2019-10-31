import Vue from 'vue'
import Layout from '../public/layout'

export default [
     {
        path: '/',
        component: resolve => { require(['../pages/index.vue'], resolve); }
     },
    {
        path: '/index',
        name:'index',
        component: resolve => { require(['../pages/index.vue'], resolve); }
    },  
    {
        path: '/newsInfo',
        component: resolve => { require(['@/components/uc/newDetail.vue'], resolve); }
    }, 
      {
        path: '/newsmore',
        component: resolve => { require(['@/components/uc/newsMore.vue'], resolve); }
    }, 
    {
        path: '/shop',
        component: resolve => { require(['@/components/uc/shopList.vue'], resolve); }
    },   
    {
        path: '/shopdetail',
       
        component: resolve => { require(['@/components/uc/shopDetail.vue'], resolve); }
    },    
    {
        path: '/orders',
        component: resolve => { require(['@/components/uc/orderDetail.vue'], resolve); }
    },    
    {
        path: '/productlist',
        component: resolve => { require(['@/components/uc/productList.vue'], resolve); }
    },    
    {
        path: '/helpCenter',
        component: resolve => { require(['@/components/uc/helpCenter.vue'], resolve); }
    },  
    {
        path: '/buyCenter',
        meta: {
            requireAuth: true, 
        },
        component: resolve => { require(['../pages/uc/buyCenter.vue'], resolve); },
        children: [
            {
                path: '/',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/userInfomation.vue'], resolve); }
            },{
                path: '/buyCenter/userinfomation',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/userInfomation.vue'], resolve); }
            },
            {
                path: '/buyCenter/localtions',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/localtion.vue'], resolve); }
            },
            {
                path: '/buyCenter/safe',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/safeSetting.vue'], resolve); }
            },
            {
                path: '/buyCenter/allorders',
                meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/AllOrder.vue'], resolve); }
            },
            {
                path: '/buyCenter/payOrder',
                name:'0',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/payOrder.vue'], resolve); }
            },
            {
                path: '/buyCenter/paySend',
                name:'1',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/payOrder.vue'], resolve); }
            },
            {
                path: '/buyCenter/payGet',
                name:'2',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/payOrder.vue'], resolve); }
            },
            {
                path: '/buyCenter/payEvaluate',
                name:'3',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/payOrder.vue'], resolve); }
            },
            {
                path: '/buyCenter/invoices',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/invoice.vue'], resolve); }
            },{
                path: '/buyCenter/addinvoices',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/addInvioce.vue'], resolve); }
            },
            {
                path: '/buyCenter/invoicesList',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/billList.vue'], resolve); }
            },
            {
                path: '/buyCenter/evaluate',meta: {
                    requireAuth: true, 
                },
                component: resolve => { require(['@/components/uc/evaluate.vue'], resolve); }
            }  ,                 
			{
				path: '/buyCenter/Bemerchant',meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/components/uc/Bemerchant.vue'], resolve); }
            },
            {
				path: '/buyCenter/collections',meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/components/uc/collection.vue'], resolve); }
			}
            ,
            {
				path: '/buyCenter/shopcollection',meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/components/uc/shopCollent.vue'], resolve); }
			}
        ]
    },
    {
        path: '/password',
        component: resolve => { require(['../components/uc/forgetPass.vue'], resolve); }
    },
    {
        path: '/about',
        component: resolve => { require(['../pages/static/about.vue'], resolve); }
    },
    {
        path: '/pay',
        name:"pay",
        component: resolve => { require(['@/components/uc/modal/payMoney.vue'], resolve); }
    },
    {
        path: '/paySuccess',
        component: resolve => { require(['@/components/uc/modal/paySuccess.vue'], resolve); }
    },
    {
        path: '/money',
        component: resolve => { require(['@/components/uc/modal/pay.vue'], resolve); }
    },
    {
        path: '/qualifications',
        component: resolve => { require(['../pages/static/qualifications.vue'], resolve); }
    },
    {
        path: '/contact',
        component: resolve => { require(['../pages/static/contact.vue'], resolve); }
    },
    {
        path: '/privacy',
        component: resolve => { require(['../pages/static/privacy.vue'], resolve); }
    },
    {
        path: '/invoice',
        component: resolve => { require(['../pages/static/invoice.vue'], resolve); }
    },
    {
        path: '/agreement',
        component: resolve => { require(['../pages/static/agreement.vue'], resolve); }
    },
   
    {
        path: '/login',
        component: resolve => { require(['../pages/uc/Login.vue'], resolve); }
    },
    {
        path: '/register',
        component: resolve => { require(['../pages/uc/Register.vue'], resolve); }
    },
    {
        path: '/salerInfo',
        component: resolve => { require(['../pages/saler/salerInfo.vue'], resolve); },
		children: [{
			path: '/salerInfo/RManage',  meta: {
                requireAuth: true, 
            },
			component: resolve => { require(['@/pages/saler/components/RManage.vue'], resolve); }
		},
			{
				path:'/salerInfo/RQuality', meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RQuality.vue'], resolve)}
			},
			{
				path:'/salerInfo/RModel',  meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RModel.vue'], resolve)}
			},
			{
				path:'/salerInfo/RWallet',  meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RWallet.vue'], resolve)}
            },
            {
				path:'/salerInfo/withdraw', meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/withdow.vue'], resolve)}
			},
			{
				path:'/salerInfo/RProduct', meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RProduct.vue'], resolve)}
			},
			{
				path:'/salerInfo/RRelease',
				name:'/salerInfo/RRelease', meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RRelease.vue'], resolve)}
			},
			{
				path:'/salerInfo/RUpDate',  meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RUpDate.vue'], resolve)}
			},
			{
				path:'/salerInfo/RHotList', meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RHotList.vue'], resolve)}
			},
			{
				path:'/salerInfo/ROrder',  meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/ROrder.vue'], resolve)}
			},
			{
				path:'/salerInfo/RPayment',  meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RPayment.vue'], resolve)}
			},
			{
				path:'/salerInfo/RConfirm',meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RConfirm.vue'], resolve)}
			},
			{
				path:'/salerInfo/REvaluation', meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/REvaluation.vue'], resolve)}
			},
			{
				path:'/salerInfo/RReplay',
				name:'RReplay',
				meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RReplay.vue'], resolve)}
			},
			{
				path:'/salerInfo/RBills', meta: {
                    requireAuth: true, 
                },
				component: resolve => { require(['@/pages/saler/components/RBills.vue'], resolve)}
			}
		]
    },
	{
		path: '/orderInfo',
		name:'/orderInfo',
		component: resolve => { require(['../pages/saler/orderInfo.vue'], resolve); }
    },
    {
		path: '/myorderInfo',
		name:'/myorderInfo',
		component: resolve => { require(['../pages/saler/myorderInfo.vue'], resolve); }
	},
	{
		path: '/shopGoods',
		name:'/shopGoods',
		component: resolve => { require(['../pages/saler/shopGoods.vue'], resolve); }
	},
	{
		path: '/allFactories',
		name:'/allFactories',
		component: resolve => { require(['@/components/uc/allFactories.vue'], resolve); }
	},
];
