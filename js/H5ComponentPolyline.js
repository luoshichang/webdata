/**
 * Created by shichangluo on 2016/7/21.
 */
var H5ComponentPolyline = function(name,cfg){
    var component = new H5ComponentBase(name,cfg)
    //绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    //加入一个画布
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    //水平网格线
    var step = 10;
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle ='red';

    window.ctx = ctx;

    for(var i = 0;i<step+1;i++){
        var y = ((h/step) * i);
        ctx.moveTo(0,y);
        ctx.lineTo(w,y);

    }
    //垂直网格线
    var text_w = w/(cfg.data.length+1) >>0;
    step = cfg.data.length+1
    for(var i=0;i<step+1;i++){
        var x = ((w/step) * i);
        ctx.moveTo(x,0);
        ctx.lineTo(x,h);
        if(cfg.data[i]){
            var text = $('<div class="text">'+cfg.data[i][0]+'</div>')
            text.css({width:text_w/2,left:x/2+text_w/4})
            component.append(text)
        }
    }
    ctx.stroke()


    //加入新的画布，创建数据层
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    step = cfg.data.length+1
    component.append(cns)
    var drow = function(per){

        ctx.clearRect(0,0,w,h);
           //绘制折线数据
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle ='green';
            var row_w = (w / (cfg.data.length+1))
            //画点
            for(i in cfg.data){
                var item=cfg.data[i];
                x = (row_w * i + row_w)
                y= h-(item[1]*h*per);
                ctx.moveTo(x,y)
                ctx.arc(x,y,5,0,2*Math.PI)
            }
            //连线
              //移动画笔到第一个数据
            ctx.moveTo(row_w , h-(cfg.data[0][1]*h*per))
            for(i in cfg.data){
                var item=cfg.data[i];
                x = row_w * i + row_w
                y= h-(item[1]*h*per);
                ctx.lineTo(x,y)
            }
            ctx.stroke()
            ctx.lineWidth = 1
            /*ctx.strokeStyle = 'rgba(255,255,255,0)'*/
            ctx.lineTo(x,h)
            ctx.lineTo(row_w,h)
            ctx.fillStyle='rgba(255,136,120,0.37)'
            ctx.fill()
            //绘制阴影

            //写数据
            for(i in cfg.data){
                var item=cfg.data[i];
                x = row_w * i + row_w
                y= h-(item[1]*h*per);
                if(item[2]){
                    ctx.fillStyle = item[2] ? item[2] :'#595959'
                }
                ctx.fillText((item[1] * 100 >> 0)+'%',x-10,y-10)
            }
            ctx.stroke()

    }
    component.on('onLoad',function(){
        var s = 0
        for(i=0;i<100;i++){
            setTimeout(function(){
                s+=0.01;
                drow(s)
            },i*10)
        }
    })
    component.on('onLeave',function(){
        var s = 1
        for(i=0;i<100;i++){
            setTimeout(function(){
                s-=0.01;
                drow(s)
            },i*10)
        }
    })
    return component
}