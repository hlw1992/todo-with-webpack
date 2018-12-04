// jsx里没有写css的方法 所以在外面新建一个样式文件footer.styl ,并引入
import '../assets/styles/footer.styl'
export default{
    data(){
        return{
            author: 'hlw'
        }
    },
    render(){
        return(
            <div id="footer">
                <span>by {this.author} @2018</span>
            </div>
        )
    }
}