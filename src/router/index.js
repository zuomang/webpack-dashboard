import Vue from 'vue'
import Router from 'vue-router'
import Default from '@/components/Default'
import Zabbix from '@/components/Zabbix'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: Default },
        { path: '/zabbix/:landscape', component: Zabbix }
    ]
})
