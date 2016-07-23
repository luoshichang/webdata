/**
 * Created by shichangluo on 2016/7/21.
 */
var H5ComponentBar = function(name,cfg){
    var component = new H5ComponentBase(name,cfg)

    $.each(cfg.data,function(id,item){

        var line =$('<div class="line">')
        var name =$('<div class="name">')
        var rate =$('<div class="rate">')
        var per =$('<div class="per">')
        var bgstyle='';
        if(item[2]){
            bgstyle= 'style="background-color:'+item[2]+'"';
        }
        rate.html('<div class="bg" '+bgstyle+'></div>')
        var width = item[1]*100+'%'
        rate.css('width',width);
        name.text( item[0])
        per.text(width)

        line.append( name).append(rate).append(per)

        component.append(line)
    })

    return component
}