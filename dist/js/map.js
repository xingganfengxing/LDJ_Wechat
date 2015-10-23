/**
 * Created by peter on 15/10/21.
 */
var mapObj,MGeocoder,MSearch,mapMoveListener;
var firstSearched,poiArr;

//回调函数
function geocoder_CallBack(data) {
    var resultStr = "";
    var poiinfo = "";
    var address;
    //返回地址描述
    address = data.regeocode.formattedAddress;

    //搜索附近的地址
    generatePoisHtml(data.regeocode.pois);
}

function autoPlaceSearch() {
    var keywords = document.getElementById("search").value;
    MSearch.search(keywords, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            keywordSearch_CallBack(result);
        }
    });
}

//从输入提示框中选择关键字并查询
function keywordSearch_CallBack(data) {
    tipArr = data.poiList.pois;
    generatePoisHtml(tipArr, true);

}

function mapInit(){
    mapObj = new AMap.Map("iCenter", {
        //31.2323104171,121.4691603379
        //center:new AMap.LngLat(121.4691603379,31.2323104171), //地图中心点
        level: 14  //地图显示的比例尺级别
    });
    //加载地理编码插件
    AMap.service(["AMap.Geocoder"], function () {

        MGeocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all"
        });
    });
    AMap.service(["AMap.PlaceSearch"], function () {

        MSearch = new AMap.PlaceSearch({ //构造地点查询类
            pageSize: 10,
            pageIndex: 1,
            city: "上海" //城市
        });
        ////判断是否IE浏览器
        if (navigator.userAgent.indexOf("MSIE") > 0) {
            document.getElementById("search").onpropertychange = autoPlaceSearch;
        }
        else {
            document.getElementById("search").oninput = autoPlaceSearch;
        }
    });

    AMap.event.addListener(mapObj, 'dragstart', function (e) {

    });

    mapMoveListener = AMap.event.addListener(mapObj, 'dragend', function (e) {
        setTimeout(function () {
            var mapCenter = mapObj.getCenter();
            var lnglatXY = new AMap.LngLat(mapCenter.getLng(), mapCenter.getLat());
            var lnglatXY = new AMap.LngLat(mapCenter.getLng(), mapCenter.getLat());

            MGeocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    geocoder_CallBack(result);
                }
            });
        }, 500);

    });
}

function generatePoisHtml(data, center) {
    if (data == null || data.length <= 0) {
        return;
    }
    firstSearched = data[0];
    poiArr = data;
    //document.getElementById("keyword").value = firstSearched.name;
    if (center) {
    }
    var markerNumber = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var resultStr = "";
    var firstLngX, firstLatY, isFirst, address;
    for (var i = 0; i < poiArr.length; i++) {
        //只显示6个
        if (i < 6) {
            if (i === 0) {
                resultStr += "<div id='divid_" + (i + 1) + "' class='row no-gutter' onclick='selectPoiResult(this.id);' style=\"font-size: 0.9rem;border-bottom:1px solid #e4e4e4; cursor:pointer;padding:5px 5px 5px 5px; line-height:1.2rem;\">";
                resultStr += '<div class="col-20" style="text-align: center;">';
                //resultStr += '<img src="img/map.png" style="width: 18px;" />';
                resultStr += '</div>';
                resultStr += '<div class="col-80">';
                resultStr += "当前位置:" + poiArr[i].name + "<div style='color:#666666;min-height: 1.2rem;'>" + poiArr[i].address + "</div>";
                resultStr += '</div></div>';
            }
            else {
                resultStr += "<div id='divid_" + (i + 1) + "' onclick='selectPoiResult(this.id);' style=\"font-size: 0.9rem;border-bottom:1px solid #e4e4e4; cursor:pointer;padding:5px 5px 5px 5px; line-height:1.2rem;\">" + poiArr[i].name + "<div style='color:#C1C1C1;min-height: 1.2rem;'>" + poiArr[i].address + "</div></div>";
            }
            var lngLat = poiArr[i].location;

            // var lngLats = lngLat.split(",");
            var lngX = lngLat.lng;
            var latY = lngLat.lat;
            //addmarker(i, lngX, latY);
            if (i == 0) {
                firstLngX = lngX;
                firstLatY = latY;
                address = poiArr[i].name;
                isFirst = true;
            }
        }
    }

    if (isFirst) {
        if (center != null && center != undefined) {
            mapObj.setCenter(new AMap.LngLat(firstLngX, firstLatY));
        }
    }
    if (document.getElementById("result1") != null) {
        document.getElementById("result1").innerHTML = resultStr;
        document.getElementById("result1").style.display = "block";
    }
}