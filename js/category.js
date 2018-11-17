window.addEventListener("load",function(){
    // 初始化左侧的swiper内容滚动插件
    var swiper = new Swiper('.category-left .swiper-container', {
      direction: 'vertical',
      //auto'则自动根据slides的宽度来设定同时显示的slides数量
      slidesPerView: 'auto',
      
      // freeMode:false 普通模式：slide滑动时只滑动一格，并自动贴合wrapper;
      // freeMode:true free模式：slide会根据惯性滑动且不会自动贴合
      freeMode: false,

      // 滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },

      // 开启鼠标滚轮控制Swiper切换
      mousewheel: true,
    });

    // 初始化右边区域的swiper内容滚动插件
    var swiper2 = new Swiper('.category-right .swiper-container', {
      direction: 'vertical',
      slidesPerView: 'auto',
      freeMode: true,
      scrollbar: {
        el: '.swiper-scrollbar',
        hide: true,//自动隐藏滚动条
        draggable:true, // 支持拖动滚动条
      },
      mousewheel: true,
    });

    //分类左侧的点击吸顶效果
    /*
    思路:
    1 给所有li设置一个索引
    2 给所有li注册点击事件
    3 获取当前li的索引,计算移动距离=li索引*li高度
    4 获取子盒子(即ul)的高度
    5 获取父盒子category-left高度
    6 计算最大移动距离=绝对值(子盒子高度-父盒子高度)
    7 判断移动距离是否大于于最大移动距离,如果大于,就设置移动距离为最大值
    8 将移动距离赋值给容器swiper-wrapper
    9 移除所有li的active类名,当前li添加active类名
    */
   var lis = document.querySelectorAll("#main .category-left ul li");
   //获取父盒子高度
   var parentHeight = document.querySelector("#main .category-left").offsetHeight;
   //获取子盒子高度
   var childrenHeight = document.querySelector("#main .category-left ul").offsetHeight;
   //计算最大移动距离
   var maxTranslate = Math.abs(childrenHeight - parentHeight);
   //获取滑动容器
   var swiperWrapper = document.querySelector("#main .category-left .swiper-wrapper");

   for(var i=0;i<lis.length;i++){
     //添加索引
      lis[i].index = i;
      //注册点击事件
      lis[i].addEventListener("click",function(){
        //计算移动距离
        var translateY = this.index*this.offsetHeight;

        //判断移动距离是否大于最大距离,大于就设置为最大移动距离
        if(translateY>maxTranslate){
          translateY = maxTranslate;
        }

        //容器设置移动距离
        swiperWrapper.style.transform="translate3d(0px, "+(-translateY)+"px, 0px)";

        //容器添加过渡效果
        swiperWrapper.style.transition="all .5s";

        // 移除所有li的active类名
        for(var j=0;j<lis.length;j++){
          lis[j].classList.remove("active");
        }

        //当前li添加active类名
        this.classList.add("active");
      });
   }
});