/**
 * @author miaov
 * 缓冲运动的封装
 */

//获取当前的样式
function getStyle(obj, attr)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[attr];
    }
    else
    {
        return getComputedStyle(obj, false)[attr];
    }
}

//缓冲运动的封装
function startMove(obj, json, fn)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;		//这一次运动就结束了——所有的值都到达了
        for(var attr in json)
        {
            //1.取当前的值
            var iCur=0;

            if(attr=='opacity')
            {
                iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
            }
            else
            {
                iCur=parseInt(getStyle(obj, attr));
            }

            //2.算速度
            var iSpeed=(json[attr]-iCur)/8;
            iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

            //3.检测停止
            if(iCur!=json[attr])
            {
                bStop=false;
            }

            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
                obj.style.opacity=(iCur+iSpeed)/80;
            }else if(attr=='zIndex'){
                obj.style.zIndex=json[attr];
            }
            else
            {
                obj.style[attr]=iCur+iSpeed+'px';
            }
        }

        if(bStop)
        {
            clearInterval(obj.timer);
            if(fn)
            {
                fn();
            }
        }
    }, 20);
}

