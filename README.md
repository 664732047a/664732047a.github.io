### 技术栈
1. 响应式布局开发
    - viewport
    - rem
    - @media

2. 结构样式
    - HTML5标签
    - CSS3样式
        + 常用样式
        + CSS3 中的3D 和 2D变形动画
    - 基于 LESS进行样式编写

3. JS 功能
    - zepto.js作为操作 DOM的类库（PC端用 JQ，移动端用ZP）
    - swiper.min.js 作为滑屏处理插件
    - makisu.min.js 作为下拉3D菜单的插件
...

### less
> https://lesscss.cn

> less是 css的预编译语言，和其类似的预编译器还有：sass、stylus等；而所谓的预编译，其实是把css这种标记语言，按照(面相对象)编程语言的方式进行编写(有变量、函数、判断等操作),但是这种写法浏览器不能直接的识别，需要我们把其再编译为正常的css 代码才可以；
> xxx.less:创建 less 文件

less的编译常用的分为两种
1. 开发环境下（开发项目的时候）
    - 我们基于less-2.5.3.min.js进行编译：基于 link把 less文件导入，但是rel的值必须是stylesheet/less，这样导入的 js会找到这些 less文件，把 less 编译为 css 即可
2. 生产环境下（项目部署上线的时候）
    - 我们需要把 less 编译为 css，然后让页面中导入的都是编译后的 css需要基于 node 环境，并且基于less 模块进行编译（命令操作方式）
        + 安装node（安装npm）
        + npm install less -g (MAC电脑上最好 sudo 设置安装)
        + 在对应的less 文件目录，在目录中：lessc xxx.less xxx.css -x (设置-x 是为了把代码进行压缩)
```javascript
//生产环境下用这种方式
<link rel="stylesheet/less" href="test1.less">
<script src="../js/less.min.js"></script> 
//上线环境下用这种方式
<link rel="stylesheet" href="test2.css">
```
嵌套(减少前缀)
- 每一个大括号都是一个私有的作用域，在里面用到的变量，先看是否为私有的（是否在当前作用域中声明过和形参变量），不是私有的，找上级作用域中的 =>"类似于JS 作用域链这套机制"
- unit:less中内置的函数，用来设置或去除单位的
- 函数：
    1. 每一个样式类都能被充当一个函数，直接在其它的作用域中调去执行（执行特点：不需要传参，可以不加小括号），这种函数的调用是把原有的代码都原封不动的拿过来一份一模一样的（包括其所有的后代样式）
- 继承：
    1. 基于继承也能实现样式的公用（原理：两个样式类公用一套代码，但是后代样式不能被继承）
```javascript
.box{
    @W: 100;
    width: unit(@W,px);
    @H:100px;
    height: @H;
    // &嵌套中的链接符，让后面的选择器紧挨着父选择器 .box1>img
    &>img{
        //让图片旋转 45 度
        tranform:skew(45deg);
    }
    //box:hover
    &:hover{

    }
}
.box1{};
.box2{
    //相当于 js 中的函数，这是 less 中的函数，把 box1 中的样式都放到 box2 中
    .box1();
}

```
less 内置函数
- unit
- darken
- lighten