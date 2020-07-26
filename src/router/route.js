
const routes = [
  {
    path: '/',
    component: () => import('../layouts/MyLayouts.vue'),
    children: [
      { path: '', name: 'login', component: () => import('../pages/Auth.vue') },
      { path: 'register', name: 'register', component: () => import('../pages/Auth.vue') },
      { path: 'home', name: 'home', component: () => import('../pages/Index.vue'), props: true },
      { path: 'transaction', name: 'transaction', component: () => import('../pages/Transaction.vue') },
      // { path: 'ships', name: 'ships', component: () => import('../pages/Ships.vue') },
      // { path: 'details', name: 'details', component: () => import('../pages/Details.vue'), props:true },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('../pages/Error404.vue')
  })
}

export default routes
// npm install dotenv
