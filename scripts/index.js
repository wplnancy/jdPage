window.onload=function(){

    //公共函数的提取
    //======类数组转数组=======
  function toArray(nodes){
      var array=null;
      try{
          array=Array.prototype.slice.call(nodes,0);
      }catch(e){
          array=[];
          for(var i=0;i<nodes.length;i++){
              array.push(nodes[i]);
          }
      }
      return array;
  }

  //根据id找到对应的对象
    function $$(id){
        return document.getElementById(id);
    }





    //阻止默认事件的兼容性写法
      function preDefault(event){
          if(event || event.preventDefault){
              //w3c浏览器阻止默认的事件
              event.preventDefault();
          }else{
              window.event.returnValue=false;
          }
      }


    //切换城市的状态
    var oCityName=$$("cityName");
    var oDropdownLayer=$$("dropdown-layer");
    var oDropdow=$$("dropdown");
    var oCitys=oDropdownLayer.getElementsByTagName('a');
    //转换为数组
    var aCitys=Array.prototype.slice.call(oCitys,0);
    for(var i=0;i<aCitys.length;i++){
        aCitys[i].onclick=function(event){
            preDefault(event);
            for(var j=0;j<aCitys.length;j++) {
               if(aCitys[j].className=="hasSeleted")
               {
                   aCitys[j].className="none";
                   break;
               }
            }
            this.className="hasSeleted";
            oCityName.innerHTML=this.innerHTML;
        }
    }
    //=============手机京东================
    var  ojdsj=$$("jdsj");
    var oTel=$$("tel");
    ojdsj.onmouseenter=function(){
        oTel.style.backgroundPosition="0 -25px";
    };
    ojdsj.onmouseleave=function(){
        oTel.style.backgroundPosition="0 0";
    };


    //============点击关闭广告===========
    var oClose=$$("close");
    var oTpbanner=$$("tpbanner");
    oClose.onclick=function(){
        oTpbanner.style.display="none";
    };


    //=============搜索框的显示和隐藏================
    var searchInput=$$("txt");
    //页面加载即获得焦点
    searchInput.focus();
    var msg=$$("message");
    //当有输入的时候去除文字    处理ie下的兼容性
    searchInput.oninput=searchInput.onpropertychange=function(){
       if(this.value==''){
           msg.style.display="block";
       }
        else{
           msg.style.display="none";
       }
    };

    //=============遍历京东背景图================
    //1.获取所有的li下的i
    var iis=$$("iconsprite").getElementsByTagName("i");
    var arr=toArray(iis);
    for(var i=0;i<arr.length;i++){
        arr[i].style.backgroundPosition="0 "+(-25*i)+"px";
    }












    //=============轮播图部分============

    //获取ul
    var ul=$$("scroll");
    //因为我们要做无缝滚动，所以要克隆第一张，放到最后面
    ul.appendChild(ul.children[0].cloneNode(true));//克隆完毕

    //创建ol和li
    var ol=document.createElement("ol");
    ol.className="circle";
    var ulLis=toArray(ul.children);
    //这里的长度记得减1
    for(var i=0; i<ulLis.length-1; i++){
        var newLi=document.createElement("li");
        newLi.innerHTML=i+1;
        ol.appendChild(newLi);
    }
    //第一个li是激活的状态
    ol.children[0].className="current";
    /*(18*6+4*6)/2*/
    //保证是居中显示的
    ol.style.marginLeft=""+11*(1-ulLis.length)+"px";
    slider.appendChild(ol);

    //开始动画的部分
    var olLis = ol.children;
    for(var i=0; i<olLis.length;i++)
    {
        olLis[i].index = i;  // 获得当前第几个小li 的索引号
        olLis[i].onmouseover = function() {
            for(var j=0;j<olLis.length;j++)
            {
                olLis[j].className = "";  // 所有的都要清空
            }
            this.className = "current";
            startMove(ul,{left:-this.index*730});
            square = key = this.index;  // 当前的索引号为主
        }
    }
    //  4. 添加定时器
    var timer = null;   // 轮播图的定时器
    var key = 0;  //控制播放张数
    var square = 0; // 控制小方块
    timer = setInterval(autoplay,1000);  // 开始轮播图定时器
    function autoplay() {
        key++;  // 先 ++
        if(key>ulLis.length - 1)  // 后判断
        {
            ul.style.left = 0;  // 迅速调回
            key = 1;  // 因为最后一张就是第一张  最后一张播放 下次播放第2张
        }
        startMove(ul,{left:-key*730});  // 再执行
        // 小方块
        square++;
        if(square > olLis.length -1)
        {
            square = 0;
        }
        for(var i=0;i<olLis.length;i++)   // 先清除所有的
        {
            olLis[i].className = "";
        }
        olLis[square].className = "current";  // 留下当前的
    }
    function reversePlay() {
        key--;
        if(key<0)
        {
            ul.style.left = -730*6+'px';
            key = 5;
        }
        startMove(ul,{left:-key*730});
        // 小方块
        square--;
        if(square <0)
        {
            square = olLis.length-1;
        }
        for(var i=0;i<olLis.length;i++)
        {
            olLis[i].className = "";
        }
        olLis[square].className = "current";
    }
   //移入大盒子开关定时器
    var sliderBox=$$("slider");
    sliderBox.onmouseenter=function(){
        clearInterval(timer);
    };
    sliderBox.onmouseleave=function(){
        timer = setInterval(autoplay,1000);  // 开始轮播图定时器
    };
    var aBtn=toArray(sliderBox.children[1].children);
    aBtn[0].onclick=function(){
        reversePlay();
    };
    aBtn[1].onclick=function(){
        autoplay();
    };



    //图片滑动部分
   var  oScroll=$$("scroll-main");
    var leftbtn=$$("left-btn");
    var rightbtn=$$("right-btn");
    var leftValue=oScroll.offsetLeft;
    leftbtn.onclick=function(){
        leftValue-=1000;
        if(leftValue<-5000){
            oScroll.style.left="-1000px";
           leftValue=-2000;
        }

        startMove(oScroll,{left:leftValue});
    };
    rightbtn.onclick=function(){
        leftValue+=1000;
        if(leftValue>0){
            oScroll.style.left="-4000px";
            leftValue=-3000;
        }

        startMove(oScroll,{left:leftValue});
    };


    /*轮播开始*/
    var timer2=null;
    var swipeBox=$$("swipe");
    var oSwipe=$$("sw");
    var num=0;
    timer2=setInterval(swipeTop,1000);
    function swipeTop(){
            num-=120;
            if(num<-840){
                oSwipe.style.top=-240+'px';
                num=-360;
            }
            startMove(oSwipe,{top:num});
    }
    swipeBox.onmouseenter=function(){
        clearInterval(timer2);
    };
    swipeBox.onmouseleave=function(){
        timer2=setInterval(swipeTop,2000);
    };




    function scroll() {
        if(window.pageYOffset != null)  //  ie9+ 和其他浏览器
        {
            return {
                left: window.pageXOffset,
                top: window.pageYOffset
            }
        }
        else if(document.compatMode != "CSS1Compat")  // 声明的了 DTD
        // 检测是不是怪异模式的浏览器 -- 就是没有 声明<!DOCTYPE html>
        {
            return {
                left: document.documentElement.scrollLeft,
                top: document.documentElement.scrollTop
            }
        }
        return { //  剩下的肯定是怪异模式的
            left: document.body.scrollLeft,
            top: document.body.scrollTop
        }
    }


   /* alert($$("jd-life").offsetTop);
    //返回到顶部的效果*/

    //固定导航栏
    var act=$$("activity");
    var nav=$$("nav");
    var navTop=act.offsetTop;
    var timer3=null;
    var goTop=$$("top");
    var target= 0,leader=0;

        window.onscroll=function(){
            if((scroll().top)>0){
                goTop.style.display="block"
            }else{
                goTop.style.display="none";
            }
            leader=scroll().top;
            console.log(navTop);
            if(scroll().top>=navTop){

                nav.className="header fixed";
                act.style.marginTop="30px";
            }
            else{
                nav.className="header";
            }


            var rightSide=$$("rightSide");

            var t=scroll().top+(document.documentElement.clientHeight-rightSide.offsetHeight)/2;
            startMove(rightSide,{top:parseInt(t)});



           if((scroll().top)>300){
                rightSide.style.display="block";
            }else{
                rightSide.style.display="none";
            }

            //侧边栏的显示和隐藏
            if((scroll().top)>500){
                $$("sidebar").style.display="block";
            }else{
                $$("sidebar").style.display="none";
            }
        };
        goTop.onclick=function() {
            timer3 = setInterval(function () {
                leader = leader + (target - leader) / 10;
                window.scrollTo(0, leader);
                leader=leader>0?Math.ceil(leader):Math.floor(leader);
                if (target == leader) {//这是关闭定时器的条件
                    clearInterval(timer3);
                }
            }, 10);
        };
};



