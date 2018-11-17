window.addEventListener("load",function(){

    // 轮播图区域
    // 初始化swiper
    var swiper = new Swiper('.swiper-container', {
        // loop:true,//循环模式
        // 自动滑动
        autoplay: {
            delay: 1000,//播放延迟时间
            stopOnLastSlide:true,//如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
            disableOnInteraction:true,//用户操作轮播图之后是否停止自动切换
        },
        // 分页器
        pagination: {
            el: '.swiper-pagination',
        },
        //过渡效果
        effect: 'fade',
    });


    //顶部栏渐变色
    /* 
    思路:
    1 获取轮播图高度
    2 获取滚动条距离顶部的高度
    3 计算透明度= 滚动条距离顶部的高度/轮播图高度
    4 修改顶部区域的背景色rgba
    */
   //获取轮播图高度
   var slideHeight = this.document.querySelector("#slide").offsetHeight;
   // 注册滚动事件
   window.addEventListener("scroll",setHeaderBackgroundColor);
    
   function setHeaderBackgroundColor(){
        // 获取滚动条距离顶部的高度
        var scrollHeight = document.body.scrollTop||document.documentElement.scrollTop;
        var opacity = scrollHeight/slideHeight;
        var header = document.getElementById('header');
        if(opacity<=1){
        //   滚动条的距离 < 轮播图高度
        header.style.backgroundColor = "rgba(222, 24, 27,"+opacity+")";
        }else{
        // 滚动条的距离 > 轮播图高度
        header.style.backgroundColor = "rgba(222, 24, 27,1)";
        } 
    }
    setHeaderBackgroundColor();//页面加载就调用一次,避免头部在其它位置无效的情况

    //倒计时功能
    /*
    1 获取未来时间
    2 获取当前时间
    3 获取时间差=未来时间-当前时间
    4 取出时,分,秒
    5 显示
    */
    //传递参数获取指定时间对象 2018,10,14,16,00,00 =>年 月 日 时分秒
    //未来时间 月份从0-11计算
    // var futureTime = new Date(2018,10,14,17,00,00);
    var futureTime = new Date(2018,10,14,15,43,00);
    //当前时间
    var nowTime = new Date();
    //时间差的秒数
    var time = Math.floor((futureTime - nowTime)/1000);
    // console.log(time);
    //获取显示时间的span
    var spans = document.querySelectorAll(".skill-time span");

    //定义定时器,每隔一秒减一
    var timerID = setInterval(function(){
        time--;
        if(time<0){
            // 清除定时器
            clearInterval(timerID);
            return;
        }
        //获取小时 总时间/3600 1小时等于3600秒
        var hour = Math.floor(time/3600);
        //获取分钟 总时间/60 如果是90分,时间大于60分钟 去掉小时,留下分钟30分钟
        var minute = Math.floor(time/60%60);
        //获取秒 总时间%60  70%60等于10s
        var second = Math.floor(time%60);

        
        //修改页面的倒计时
        //获取小时的十位
        spans[0].innerHTML = Math.floor(hour/10);
         //获取小时的个位
        spans[1].innerHTML = Math.floor(hour%10);
        spans[3].innerHTML = Math.floor(minute/10);
        spans[4].innerHTML = Math.floor(minute%10);
        spans[6].innerHTML = Math.floor(second/10);
        spans[7].innerHTML = Math.floor(second%10);
    },1000);


});