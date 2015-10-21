/**
 * Created by Jean on 2015/10/19.
 */
$(function () {
    'use strict';
    $(document).on("pageInit", "#page-datetime-picker", function (e) {
        $("#datetime-picker").datetimePicker({
            toolbarTemplate: '<header class="bar bar-nav">\
      <button class="button button-link pull-right close-picker">确定</button>\
      <h1 class="title">选择日期和时间</h1>\
      </header>'
        });
    });

    $(document).on("pageInit", "#page-city-picker", function (e) {
        $("#city-picker").cityPicker({});
    });

    $(document).on("pageInit", function (e, pageId, $page) {
        if (pageId == "pageIndex") {
        }
    });
    $(document).on("click", "#addFrom", function (e) {
        $("#txtTel").val('');
        $.router.loadPage("#addrForm");
    });
   
    $("#js-ordering").on("click", function () {
        $.router.loadPage("#order");
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
    //加载价目表
    $(".home-price-detail").on("click", function () {
        var id = this.id;
        for (var i = 1; i < 7; i++) {
            $("#tab_" + i).removeClass("active");
            $("#tab" + i).removeClass("active");
        }
        $("#tab_" + id.split('_')[1]).addClass("active");
        $("#tab" + id.split('_')[1]).addClass("active");
        $.router.loadPage("#price");
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
