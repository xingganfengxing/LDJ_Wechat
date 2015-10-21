/**
 * Created by Jean on 2015/10/19.
 */
$(function () {
    'use strict';
    // 添加'refresh'监听器
    $(document).on('refresh', '.pull-to-refresh-content', function (e) {
        // 模拟2s的加载过程
        setTimeout(function () {
            var cardNumber = $(e.target).find('.card').length + 1;
            var cardHTML = '<div class="card">' +
                '<div id="orderDetail_' + cardNumber + '" class="card-header js-toOrderDetail">card' + cardNumber + '</div>' +
                '<div class="card-content">' +
                '<div class="card-content-inner">' +
                '这里是第' + cardNumber + '个card，下拉刷新会出现第' + (cardNumber + 1) + '个card。' +
                '</div>' +
                '</div>' +
                '</div>';

            $(e.target).find('.card-container').prepend(cardHTML);
            // 加载完毕需要重置
            $.pullToRefreshDone('.pull-to-refresh-content');
        }, 1000);
    });

    $(".js-toOrderDetail").on("click", function () {
        var orderId=this.id;
        console.log(orderId);
        $.router.loadPage("#orderDetail");
    });

    $(".js-cancelOrder").on("click", function () {
        $.router.loadPage("#cancelOrder");
    });
    $(".js-control").on("click", function () {
        $("#txtTel").val(this.id);
        $.router.loadPage("#addrForm");
    });
    $(".js-addrFromback").on("click", function () {
        $.router.back("#home");
    });
    $(".js-checkLogin").on("click", function () {
        $.popup(".popup-login");
    });
    $(".js-btnLogin").on("click", function () {
        $.closeModal(".popup-login");
    });
    //加载我的订单列表
    $(".js-ordertab").on("click", function () {
        var id = this.id;
        for (var i = 1; i < 4; i++) {
            $("#tab_" + i).removeClass("active");
        }
        $("#tab_" + id.split('_')[1]).addClass("active");
    });
    //下单日期
    $("#datepicker").picker({
        toolbarTemplate: '<header class="bar bar-nav">\
  <button class="button button-link pull-right close-picker">确定</button>\
  <h1 class="title">请选择上门取件日期</h1>\
  </header>',
        cols: [
            {
                textAlign: 'center',
                values: ['10-21', '10-22', '10-23', '10-24', '10-25', '10-26', '10-27', '10-28'],
                onChange: function (picker, day) {
                    var times = [];
                    if (picker.cols[0].value === '10-21') {
                        times = ['11:00~12:00', '12:00~13:00', '13:00~14:00'];
                    }
                    else {
                        times = ['123123', 'dasdasdfwe', 'eewrwerews'];
                    }
                    if (picker.cols[1].replaceValues != undefined) { ///这里有个坑啊。。
                        picker.cols[1].replaceValues(times, times);
                    }
                }
                //如果你希望显示文案和实际值不同，可以在这里加一个displayValues: [.....]
            },
            {
                textAlign: 'center',
                values: ['11:00~12:00', '12:00~13:00']
            }
        ]
    });
    $("#orderAddr").on("click", function () {
        $.router.loadPage("#addrList");
    });
    $(".btnAddAddr").on("click", function () {
        $.router.loadPage("#addrForm");
    });
    $(".tomap").on("click", function () {
        $.router.loadPage("#map");
    });
    $(".swiper-container").swiper();
    $.init();
});
