(function ($) {
    $.fn.selecTor = function (ele, option,cb) {
        var defaults = {
            select: '.select',//选择框
            content: '.content',//内容区
            menuList: '.menuList'//列表区
        };
        var setting = $.extend({}, defaults, option)

        // 设置祖级元素的样式
        $(ele).css({
            width: setting.width,
            height: setting.height,
            position: 'relative'
        });
        // 添加选择展示框
        $(ele).append(
            $("<div class='select'></div><i class='el-icon-caret-bottom' style='position: absolute;top: 0px;margin-left:70px;'>").css({
                width: "100%",
                height: setting.height,
                lineHeight: setting.height,
                fontSize: '14px',
                padding: '0 0 0 15px',
                boxSizing: 'border-box',
                cursor: 'pointer'
            })
        );
      // 设置，默认值
      $(ele + ' .select').html(setting.data[0].label);
        // 添加下拉菜单父级元素
        $(ele).append(
            $("<div class='content'></div>").css({
                position: 'absolute',
                top: setting.height,
                width: '100%',
                padding: '5px 0',
                boxSizing: 'border-box',
                background: '#FFF',
                borderRadius: '5px',
                overflow: 'hidden',
                display: 'none'
            })
        );
        //添加列表
        $(ele + ' .content').append(function () {
            let lis = ''
            console.log(lis)
            for (let i = 0; i < setting.data.length; i++){
                lis += "<div class='menuList' data-index=" + setting.data[i].value + ">" + setting.data[i].label + "</div>"
            };
            console.log(lis)
            return lis;
        })
        $(ele + ' .content .menuList').css({
            width: '100%',
            height: setting.height,
            lineHeight: setting.height,
            boxSizing: 'border-box',
            padding: '0 0 0 15px',
            fontSize: '14px',
            color: 'black',
            cursor: 'pointer'
        });

        // 事件
        // 选择框点击事件
        $(ele + ' .select').on('click', function () {
            $(ele + ' .content').toggle('800')
        });
        //列表点击事件
        $(ele + ' .content .menuList').on('click mouseover mouseout', function (event) {
            if (event.type == 'click') {
              event.target.style.background = '#99CCFF'
              event.target.style.color= '#e49831'
                $(ele + ' .select').html(event.target.innerHTML);
                $(ele + ' .content').toggle('800');
                cb(event.target.dataset.index)
            }
            if (event.type == 'mouseover') {
              event.target.style.background = '#CCFF99'
              event.target.style.color= '#e49831'
            }
            if (event.type == 'mouseout') {
              event.target.style.background = ''
              event.target.style.color= 'black'
            }

        })
    }
})(jQuery)
