/*
* @Author: Vera
* @Date:   2018-08-28 20:23:50
* @Last Modified by:   Vera
* @Last Modified time: 2018-08-29 11:31:44
*/
//这种写法避免污染window对象
;(function () {
    'use strict';
    var $form_add_task = $('.add-task');
    var $delete_task;
    var task_list = [];
//初始化页面
    init();
    //监听添加新任务提交按钮
    $form_add_task.on("submit", on_add_task_submit);
    function on_add_task_submit(e) {
        var new_task = {}, $input;
        //禁止默认行为
        e.preventDefault();
        //获取新的task
        $input = $(this).find('input[name=content]');
        new_task.content = $input.val();
        //如果输入的task为空就返回
        if (!new_task.content) return;
        //不为空开始渲染列表
        if (add_task(new_task)) {
            //render_task_list();
            $input.val(null);
        }
    }

    //监听任务删除按钮
    function listen_task_delete() {

        $delete_task.on('click', on_delete_task);
        function on_delete_task(){
            var $this = $(this);
            var $item = $this.parent().parent();
            var index = $item.data('index');
            var tmp = confirm('sure?');
            tmp ? delete_task(index) : null;
        }
    }

        //添加新任务函数
    function add_task(new_task) {
        //将新的task推入task_list
        task_list.push(new_task);
        //更新localstorage
        //store.set('task_list', task_list);
        //成功添加进localstorage返回true进行下一步列表渲染
        //render_task_list();
        refresh_task_list();
        return true;
    }

        //初始化函数
    function init() {
            task_list = store.get('task_list') || [];
            if (task_list.length) {
                render_task_list();
            }
        }

        //渲染全部task
    function render_task_list() {
        var $task_list = $('.task-list');
        $task_list.html('');
        console.log('render', task_list);
        for (var i = 0; i < task_list.length; i++) {
            var $task = render_task_tpl(task_list[i], i);
            $task_list.append($task);
        }
        $delete_task = $('.action.delete');
        listen_task_delete();
        }

        //删除一条item
    function delete_task(index) {
        //if (index === undefined || !task_list[index]) return;
        //delete task_list[index];
        task_list.splice(index, 1);
        console.log('task_list',task_list);
            refresh_task_list();
        }

        //刷新localstorage数据并且重新渲染task_list
    function refresh_task_list() {
        store.set('task_list', task_list);
        render_task_list();
        }

        //渲染单条task模板
    function render_task_tpl(data, index) {
            if (!data || index === undefined) return;
            var list_item_tpl =
                '<div class="task-item" data-index=" ' + index + ' " >' +
                '<span><input type="checkbox"></span>' +
                '<span class="task-content">' + data.content + '</span>' +
                '<span class="fr">' +
                '<span class="action delete">删除</span>' +
                '<span class="action"> 详情</span>' +
                '</span>'
            '</div>';
            return $(list_item_tpl);

        }



})();
