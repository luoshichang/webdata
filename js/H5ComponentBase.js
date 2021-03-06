/**
 * Created by shichangluo on 2016/7/20.
 */
var H5ComponentBase = function(name,cfg){
    var cfg = cfg || {};
    var id = ('h5_c_'+Math.random()).replace('.','_')
    var cls = 'h5_component_name'+name;
    var component = $('<div class="h5_component '+cls+' h5_component_' + cfg.type+'" id="'+id+'">')
    cfg.text && component.text(cfg.text)
    cfg.width && component.width(cfg.width/2)
    cfg.height && component.height(cfg.height/2) 
    cfg.css && component.css(cfg.css)

    cfg.bg && component.css('backgroundImage','url('+cfg.bg+')')
    if( cfg.center === true){
        component.css({
            marginLeft : (cfg.width/4 * -1) + 'px',
            left:'50%',
            position : 'absolute'
        })
    }
    if(typeof cfg.onclick === 'function'){
        component.on('click',cfg.onclick)
    }
    if(cfg.relativeTo){
        var parent = $('body').find('.h5_component_name_'+cfg.relativeTo);
        var position = {
            left:$(parent)[0].offsetLeft,
            top:$(parent)[0].offsetTop,
        };
        if(cfg.center === true){
            position.left=0;
        }
        component.css('transform','translate('+position.left+'px,'+position.top+'px)');
    }
    component.on('onLoad',function(){
      setTimeout(function(){
          component.addClass(cls+'_load').removeClass(cls+'_leave')
          cfg.animateIn && component.animate(cfg.animateIn)
      },cfg.delay || 0)
        return false;
    })
    component.on('onLeave',function(){
        setTimeout(function(){
            component.addClass(cls+'_leave').removeClass(cls+'_load')
            cfg.animateOut && component.animate(cfg.animateOut)
        },cfg.delay || 0)

        return false;
    })
    return component
}
