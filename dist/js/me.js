/**
 * Created by Jean on 2015/10/19.
 */
$(function () {
    'use strict';
    // ���'refresh'������
    $(document).on('refresh', '.pull-to-refresh-content', function (e) {
        // ģ��2s�ļ��ع���
        setTimeout(function () {
            var cardNumber = $(e.target).find('.card').length + 1;
            var cardHTML = '<div class="card">' +
                '<div id="orderDetail_' + cardNumber + '" class="card-header js-toOrderDetail">card' + cardNumber + '</div>' +
                '<div class="card-content">' +
                '<div class="card-content-inner">' +
                '�����ǵ�' + cardNumber + '��card������ˢ�»���ֵ�' + (cardNumber + 1) + '��card��' +
                '</div>' +
                '</div>' +
                '</div>';

            $(e.target).find('.card-container').prepend(cardHTML);
            // ���������Ҫ����
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
    //�����ҵĶ����б�
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
