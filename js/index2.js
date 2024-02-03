/**
 * zepto 和 jQuery 的区别？
 *  zepto 专门为移动端开发准备的，所以没有考虑 pc 端 ie 的兼容问题，所以 zepto 要比 jQuery 小的多
 * 而且还有一方面，也导致了 zepto 比 jQuery 小：zepto 只是先了 jquery 中最常用的方法（例如slideDown/slideUp/slideToggle 等快捷动画，在 zepto 中都没有）；
 * 1. jQ 中设置样式和实现动画的时候，不支持 css3 中某些样式属性的设置，例如：transform，但是 zp 中支持了这样的处理
 * 2、zp 中单独提供了一些移动端常用的事件方法：tap/singleTap/doubleTap/longTap/swipe/swipeLeft/swipeRight/swipeUp/swipeDown/pinchOut...而这些 jq 中都没有
 * 
 * 移动端能用 click 事件行为吗？
 * pc 端 click 是点击事件，移动端的 click 是单击事件（所以在移动端使用 click 会存在 300ms 延迟的问题，在第一次触发后，会等待 300ms，看是否有第二次触发，存在则为双击，不存在才是单机）移动端的所有操作基本上都是基于 touch/gesture事件模型模拟出来的
 * 
 * 移动端常用的事件库
 * - zepto
 * - fastclick:解决移动端 click 的 300ms 延迟问题的
 * - hammer.js :国际通用的移动端手势事件库
 * 移动端键盘事件和 pc 端的区别
 * 移动端是虚拟键盘，所以对 keydown/keyup/keypress兼容很差，想实现类似的需求，需要用 input 事件完成（input 事件：移动端文本内容输入事件）
 * userInp.addEventListener('input',function(ev){});
 */
// $(document.body).tap(function(ev){
//     console.log('zp:我是点击');
// })
document.body.addEventListener('touchstart',function(ev){
    //TouchEvent
    //touches vs changedTouches:存储每根手指的操作信息（它是一个集合，对于 touch 单手指事件来说，集合中只有一项），changedTOuches 存储的是手指发生改变操作的信息，但是最开始按下的时候和 touches 一样的，但是它可以在手机离开的事件中获取到手指离开瞬间的信息，而 touches 在离开的时候则没有，真是项目中一般用 changedTouches
    let point = ev.changedTouches[0];
    this.startX = point.clientX;
    this.startY = point.clientY;
    this.isMove = false;
})
document.body.addEventListener('touchmove',function(ev){
    let point = ev.changedTouches[0],
        changeX = point.clientX - this.startX,
        changeY = point.clientY - this.startY;
    if(Math.abs(changeX)>=30 || Math.abs(changeY) >= 30){
        this.isMove = true
    }
})
document.body.addEventListener('touchend',function(ev){
    if(this.isMove){
        console.log('这是移动操作～');
        return
    }
    console.log('这是点击操作');
})
