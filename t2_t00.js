function $(classname) {
    return document.querySelector(classname)
}
// 轮播图盒子的偏移值
var leftVal = 0
// 用来节流防止重复点击
var flag = true
var start = null // 自动执行下一张定的时器
var imgWidth = 308  // 在这里填写你需要的图片宽度
var ition = 0.8 // 设置轮播图过度时间
var imgShow = 0 // 表示当前显示的图片索引
// 这里定义一个鼠标移入移出事件，鼠标悬停时停止自动轮播，鼠标移出则重新执行自动轮播
function MouseFun(type) {// 停止定时器            // 重新执行定时器
    type == '移入' ? clearTimeout(start) : startTimer()
}
startTimer()
// 此为自动轮播定时器
function startTimer() {
    start = setInterval(() => {
        NextFun()
    }, 2500)
}
// 这里通过额外封装的节流函数触发 PrevFun() 和 NextFun(),以达到防止重复点击的效果
function throttle(fun) {
    if (flag) {
        flag = false;
        fun(); // 此为模板中传递进来的PrevFun()或NextFun()函数
        setTimeout(() => {
            flag = true;
        }, 1200); // 节流间隔时间
    }
}
var last = 0
document.querySelector(`.instBox${imgShow}`).classList.add('instActv')

function active() {
    $('.imgBox').style.left = `-${leftVal}px`
    $('.imgBox').style.transition = `${ition}s`
    last = imgShow
}
// 上一张
function PrevFun() {
    if (leftVal == 0) { // 判断显示的图片 是 第一张时执行
        // this.imgList.length是指循环图片数组的图片个数
        ition = 0 // 将过渡时间变成0，瞬间位移到最后一张图
        imgShow = 4 // 将高亮小点改为最后一张图
        leftVal = 5 * imgWidth // 瞬间移动
        setTimeout(() => {  // 通过延时障眼法,归原过渡时间,执行真正的“上一张”函数
            ition = 0.8
            leftVal -= imgWidth
            active()
        }, ition * 1000)
    } else { // 判断显示的图片 不是 第一张时执行
        ition = 0.8
        leftVal -= imgWidth
        imgShow--
        active()
    }
}
// 下一张
function NextFun() {
    if (leftVal >= 3 * imgWidth) { // 判断显示的图片 是 最后一张时执行
        ition = 0.8
        leftVal += imgWidth
        document.querySelector(`.instBox${last}`).classList.remove('instActv')
        imgShow = 0
        document.querySelector(`.instBox${imgShow}`).classList.add('instActv')
        active()
        setTimeout(() => {
            ition = 0
            leftVal = 0
            active()
        }, 800)
    } else { // 判断显示的图片 不是 最后一张时执行
        ition = 0.8
        leftVal += imgWidth
        document.querySelector(`.instBox${last}`).classList.remove('instActv')
        imgShow++
        document.querySelector(`.instBox${imgShow}`).classList.add('instActv')
        active()
    }
}

// 点击小圆点
function instFun(index) {
    ition = 0.8
    leftVal = index * imgWidth
    imgShow = index
    document.querySelector(`.instBox${last}`).classList.remove('instActv')
    document.querySelector(`.instBox${imgShow}`).classList.add('instActv')
    active()
}

var timer = null
var topVal = 0
var textwidth = 110
var second = 3

function startTimer1() {
    timer = setInterval(() => {
        NextText()
    }, 2500)}
startTimer1()
function NextText() {
    if (topVal >=  textwidth) { // 判断显示的图片 是 最后一张时执行
        second = 3
        topVal += textwidth
        active1()
        setTimeout(() => {
            second = 0
            topVal = 0
            active1()
        }, 2000)
    } else { // 判断显示的图片 不是 最后一张时执行
        second = 3
        topVal += textwidth
        active1()
    }
}
function active1() {
    $('.texts').style.top = `-${topVal}px`
    $('.texts').style.transition = `${second}s`
}
