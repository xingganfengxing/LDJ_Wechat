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
        $.router.loadPage("#orderDetail");
    });

    $(".js-cancelOrder").on("click", function () {
        $.router.loadPage("#cancelOrder");
    });
    $(".js-payOrder").on("click", function () {
        $.router.loadPage("#payOrder");
    });
    $(".js-couponChangeBack").on("click", function () {
        $.router.back("#payOrder");
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
        for (var i = 1; i < 3; i++) {
            $("#tab_" + i).removeClass("active");
        }
        $("#tab_" + id.split('_')[1]).addClass("active");
    });
     $(".js-couponList").on("click", function () {
        $.router.loadPage("#couponList");
    });

    $.init();
});
