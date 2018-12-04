<template>
    <div id="app">
        <!-- 背景虚化层 -->
        <div id="cover"></div>
        <Header></Header>
        <Todo></Todo>
        <Footer></Footer>
    </div>
</template>

<script>
// 引入组件
import Header from './todo/header.vue'
import Footer from './todo/footer.jsx'
import Todo from './todo/todo.vue'

export default {
    // 声明组件
    components:{
        Header,
        Footer,
        Todo
    }
}
</script>

<style lang="stylus" scoped>
#cover{
    position absolute;
    top 0;
    bottom 0;
    left 0;
    right 0;
    background-color #999;
    opacity 0.8;
    z-index -1;
}
</style>
