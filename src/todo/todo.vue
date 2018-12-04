<template>
    <section class='real-app'>
        <input 
            type="text"
            class='add-input'
            autofocus='autofocus'
            placeholder="接下去做什么"
            @keyup.enter= "addTodo">
        <item 
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del = "deleteTodo">
        </item>
        <tabs :filter= 'filter' :todos= "todos"
            @toggle= 'toggleFilter'
            @clearAllCompleted= "clearAllCompleted"
        ></tabs>
    </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
    data(){
        return{
            todos:[],
            filter: 'all'
        }
    },
    components:{
        Item,
        Tabs
    },
    computed:{
        filteredTodos(){
            if(this.filter==='all'){
                return this.todos
            }
            const completed= this.filter==='completed'
            return this.todos.filter(todo=>completed===todo.completed)
        }
    },
    methods:{
        //增加item
        addTodo(ev){
            this.todos.unshift({
                id:id++,
                content: ev.target.value.trim(),
                completed:false
            })
            //回车后增加 清空输入框
            ev.target.value = ''
        },
        //删除item
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex( todo => todo.id === id ), 1 )
        },
        //3个状态栏的切换
        toggleFilter(state){
            this.filter=state
        },
        // 清除所有已完成任务
        clearAllCompleted(){
            this.todos= this.todos.filter(todo=>!todo.completed)
        }
    }
}
</script>

<style scoped>
.real-app{
    width:600px;
    margin: 0 auto; 
}
.add-input{
    position: relative;
    margin: 0;
    width:100%;
    font-size: 24px;
    line-height: 24px;
    border:0;
    outline:none;
    padding: 6px;
    box-sizing: border-box;
}
</style>
