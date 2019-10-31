import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        member:null,
        data:'',
        addlist:0,
        time:0,
        reloads:0
    },
    mutations: {
        setMember(state,member) {
            state.member = member;
            sessionStorage.setItem('MEMBER', JSON.stringify(member));
        },

        setAdd(state,addlist){
            state.addlist = addlist;
            sessionStorage.setItem('addlist', JSON.stringify(addlist));
        },
        lessAdd(state,addlist){
            state.addlist = addlist;
            sessionStorage.setItem('addlist', JSON.stringify(addlist));
        },
        setTime(state,time){
            state.time = time;
            sessionStorage.setItem('time', JSON.stringify(time));
        }
    },
    getters: {
        isLogin(state){
            sessionStorage.setItem("token",sessionStorage.token);
               return sessionStorage.token
        }, 
         
        member(state) {
            return JSON.parse(sessionStorage.MEMBER)
        }
        
    }
});