/**
 * Created by shichangluo on 2016/7/21.
 */
var H5ComponentPic = function(name,cfg){
    var component = new H5ComponentBase(name,cfg)
    //绘制网格线
    var w = cfg.width;
    var h = cfg.height;
    //加入一个画布 背景层
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    $(cns).css('zIndex',1)
    component.append(cns)
    var r = w/2
    var step = cfg.data.length
    ctx.beginPath();
    ctx.fillStyle = '#eee';
    ctx.strokeStyle ='#eee'
    ctx.lineWidth = 1
    ctx.arc(r,r,r,0,2*Math.PI)
    ctx.fill();
    ctx.stroke()
    //绘制数据层
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    $(cns).css('zIndex',2)
    component.append(cns)
    var pop =['red','green','blue','orange','gray']//备用颜色
    var sAngel = 1.5 * Math.PI;
    var eAngel = 0;
    var aAngel = Math.PI*2;
    for(var i=0;i<step;i++){
        var item = cfg.data[i];
        var color = item[2] || (item[2] = pop[i])
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle =color;
        eAngel = sAngel + aAngel* item[1];

        ctx.lineWidth = 1
        ctx.moveTo(r,r)
        ctx.arc(r,r,r,sAngel,eAngel)
        ctx.fill();
        ctx.stroke()
        sAngel = eAngel
        
        //加入项目数据
        var text = $('<div class="text">'+cfg.data[i][0]+'</div>')
        var per = $('<div class="per">'+cfg.data[i][1]*100+'%'+'</div>')
        text.append(per)
        var x = r+Math.sin(.5 * Math.PI-sAngel) * r;
        var y = r+Math.cos(.5 * Math.PI-sAngel) * r;
        if(x > w/2 ){
            text.css('left',x/2)
        }else{
            text.css('right',(w-x)/2)
        }
        if(y > h/2 ){
            text.css('top',y/2)
        }else{
            text.css('bottom',(h-y)/2)
        }
        component.append(text )
    }
    //加入一个蒙版层
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    $(cns).css('zIndex',3)
    component.append(cns)
    var r = w/2
    var step = cfg.data.length

    ctx.fillStyle = '#eee';
    ctx.strokeStyle ='#eee'
    ctx.lineWidth = 1

    var drow = function(per){
        ctx.clearRect(0,0,w,h)
        ctx.beginPath();
        ctx.moveTo(r,r)
        if(per <= 0){
            ctx.arc(r,r,r+1,0,2*Math.PI)
        }
        else{
        ctx.arc(r,r,r+1,sAngel,sAngel+2*Math.PI*per,true)
        }
        ctx.fill();
        ctx.stroke();
        if( per >= 1){
            if(component.find('.text').length <=1){
            component.find('.text').css('opacity',1);}
            ctx.clearRect(0,0,w,h);
        }
    }
    drow(0)
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