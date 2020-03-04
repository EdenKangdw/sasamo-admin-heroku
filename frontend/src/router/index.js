import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
        path: '/login',
        name: 'Login',
        index: 1,
        component: () => import('../views/components/Login.vue')
    },
    {
    // ======================
    // Full Layout
    // ======================
			path: '',
            component: () => import('../layout/full/MainContainer.vue'),
            // ======================
            // Theme routes / pages
            // ======================


            children: [
                {
                    path: '/',
                    redirect: '/login'
                },
                {
                    path: '/Main',
                    name: 'Main',
                    index: 1,
                    component: () => import('../views/StarterPage.vue')
                },
                {
                    path: '/user',
                    name: 'User',
                    index: 2,
                    component: () => import('../views/components/module/User/User.vue')
                },
                {
                    path: '/team',
                    name: 'Team',
                    index: 3,
                    component: () => import('../views/components/module/Team/Team.vue')
                },
                {
                    path: '/team/create',
                    name: 'Team_Create',
                    index: 4,
                    component: () => import('../views/components/module/Team/Create_Team.vue')
                },
                {
                    path: '/team/arrange',
                    name: 'Team_Arrange',
                    index: 4,
                    component: () => import('../views/components/module/Team/Arrange_Team.vue')
                },
                {
                    path: '/event',
                    name: 'Event',
                    index: 5,
                    component: () => import('../views/components/module/Event/Event.vue')
                },
                {
                    path: '/event/create',
                    name: 'Event_Create',
                    index: 6,
                    component: () => import('../views/components/module/Event/Create_Event.vue')
                },
                {
                    path: '/count',
                    name: 'Count',
                    index: 7,
                    component: () => import('../views/components/module/Count/Count.vue')
                },

            ]
		},
    // Redirect to starterkit page, if no match found
        {
            path: '*',
            redirect: '/main'
        }
	]
})
