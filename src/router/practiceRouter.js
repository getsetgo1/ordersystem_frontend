import VuetifyComponent from '@/components/practice/VuetifyComponent'
import ModelingComponent from "@/components/practice/ModelingComponent.vue";
import ConditionalComponent from "@/components/practice/ConditionalComponent.vue";
import HookComponent from "@/components/practice/HookComponent.vue";
import AxiosTestComponent from "@/components/practice/AxiosTestComponet.vue"
import WatchUpdateComponent from "@/components/practice/WatchUpdateComponent.vue"
import RouterTestComponent from "@/components/practice/RouterTestComponent.vue"
export const practiceRouter=[
    {
        path:'/practice/vuetify',
        name:'VuetifyComponent',
        component:VuetifyComponent
    },
    {
        path:'/practice/modeling',
        name:'ModelingComponent',
        component:ModelingComponent
    },
    {
        path:'/practice/conditional',
        name:'ConditionalComponent',
        component:ConditionalComponent
    },
    {
        path:'/practice/hooks',
        name:'HookComponent',
        component:HookComponent
    },    {
        path:'/practice/hooks-watch-update',
        name:'WatchUpdateComponent',
        component:WatchUpdateComponent
    },
    {
        path:'/practice/axiostest',
        name:'AxiosTestComponent',
        component:AxiosTestComponent
    },
    {
        path:'/practice/routertest',
        name:'RouterTestComponent',
        component:RouterTestComponent
    },

]