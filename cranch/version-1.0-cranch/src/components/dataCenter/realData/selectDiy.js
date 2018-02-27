export default function seletT(ele, option,cb){
        // 设置祖级元素的样式
        $(ele).css({
            width: option.width,
            height: option.height,
            position: 'relative'
        });
        // 添加选择展示框
        $(ele).append(
            $("<div class='select'></div><i class='el-icon-caret-bottom' style='position: absolute;top: 0px;margin-left:70px;'>").css({
                width: "100%",
                height: option.height,
                lineHeight: option.height,
                fontSize: '14px',
                padding: '0 0 0 15px',
                boxSizing: 'border-box',
                cursor: 'pointer'
            })
        );
    // 设置，默认值
    $(ele + ' .select').html(option.data[0].label);
        // 添加下拉菜单父级元素
        $(ele).append(
            $("<div class='content'></div>").css({
                position: 'absolute',
                top: option.height,
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
            for (let i = 0; i < option.data.length; i++){
                lis += "<div class='menuList' data-index=" + option.data[i].value + ">" + option.data[i].label + "</div>"
            };
            return lis;
        })
        $(ele + ' .content .menuList').css({
            width: '100%',
            height: option.height,
            lineHeight: option.height,
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
                option.that.store.seleType = $(ele + ' .select').html(event.target.innerHTML);
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
