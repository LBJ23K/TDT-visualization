/* globals d3, d3Kit, d3KitTimeline */
'use strict';

$(document).ready(function(){

  //可以多帶參數 也可以設定label上要顯示的方法 url就是自己帶入的參數
  //Date裡的參數依序是年月日時... 設置的比較細 timeline就會自動調整它的範圍
  // var data = [
  //   {time: new Date(2015,11,13,5,10), name: '小英當選', url: 'http://goo.gl/kLLY9Y'},
  //   {time: new Date(2015,11,12,6,11), name: '蔡英文勝選', url: 'http://goo.gl/kLLY9Y'},
  //   {time: new Date(2015,11,15,23,12), name: '小英成為第一個女總統', url: 'http://goo.gl/kLLY9Y'},
  //   {time: new Date(2015,11,11,9,12), name: '蔡英文當選', url: 'http://goo.gl/kLLY9Y'},
  //   {time: new Date(2015,11,12,10,10), name: '台灣第一個女總統', url: 'http://goo.gl/kLLY9Y'},
  //   {time: new Date(2015,11,13,11,1), name: '小英勝選', url: 'http://goo.gl/kLLY9Y'},
  //   {time: new Date(2015,11,18,12,10), name: '蔡英文成為第一個女總統', url: 'http://goo.gl/kLLY9Y'},
  // ];

  //color depend on cluster_id, use global to prevent update color when click other tag
  var colorJson = {}
  //取得GET過來的資訊
  var origin_tag = $_GET("tag");
  origin_tag = decodeURI(origin_tag); //傳過來的時候有encode 所以讀取的時候要decode
  //要傳的tag的陣列
  var tag_arr = [];
  tag_arr.push(origin_tag);


  //第一次load近來 先抓一次tag包含新聞的api
  $.ajax({
    url: 'api/get_news_by_tag.php',
    dataType: "json", //讓回傳的東西直接是js看得懂的jsonObj
    type:'POST',                
    data: {tag_arr: tag_arr},
    error:function(e){
      if(e.responseText.includes("SQL")){
        window.location.href = "error.php";
      }
      else  alert('Ajax request 發生錯誤');
    },
    success: function(jsonObj){
      for(var count in jsonObj){ //將json的date格式轉成d3可以吃的模式
        jsonObj[count]['time'] = new Date(jsonObj[count]['time']);
      }
      renderTimeline(jsonObj, origin_tag); //重印timeline
    }
  });


  //第一次load近來 先抓一次相關tag的API
  get_intersect_tag(tag_arr);




  function checkBoxBhange(){
    //接下來監聽button的動作 每次有動作就觸發 重抓api
    $('#button-group button').click(function() {

      var tag_arr = [];
      tag_arr.push(origin_tag);
      
      //若為取消選取 將class primary轉為default, 避免push in tag_attr
      if($(this).hasClass("btn-primary")){
        $(this).removeClass("btn-primary").addClass("btn btn-default");
      }
      //else push in tag_attr
      else tag_arr.push($(this).text());
      $('#button-group .btn-primary').each(function(){
        tag_arr.push($(this).text());
      });

      //抓完選取的checkbox後 重刷頁面
      $.ajax({
        url: 'api/get_news_by_tag.php',
        dataType: "json", //讓回傳的東西直接是js看得懂的jsonObj
        type:'POST',                
        data: {tag_arr: tag_arr},
        error:function(e){
          if(e.responseText.includes("SQL")){
            window.location.href = "error.php";
          }
          else  alert('Ajax request 發生錯誤');
        },
        success: function(jsonObj){
          for(var count in jsonObj){ //將json的date格式轉成d3可以吃的模式
            jsonObj[count]['time'] = new Date(jsonObj[count]['time']);
          }
          renderTimeline(jsonObj, origin_tag); //重印timeline
          get_intersect_tag(tag_arr);

        }
      });
      
    }); 
  }
  

  function get_intersect_tag(tag_arr){
    $.ajax({
      url: 'api/get_intersect_tags.php',
      dataType: "json", //讓回傳的東西直接是js看得懂的jsonObj
      type:'POST',                
      data: {
              tag_arr: tag_arr,
              origin_tag: origin_tag,
            },
      error:function(e){
        if(e.responseText.includes("SQL")){
          window.location.href = "error.php";
        }
        else  alert('Ajax request 發生錯誤');
      },
      success: function(jsonObj){

        $("#button-group").html("");
        var view = "";
        for(var count in jsonObj){
          var t = jsonObj[count];
          if(tag_arr.indexOf(t) > -1){
            view += ("<button type='button' class='btn btn-primary'>"+t+"</button>")
          }
          else{
            view += ("<button type='button' class='btn btn-default'>"+t+"</button>")
          }
        }
        $("#button-group").html(view).hide().fadeIn();
        checkBoxBhange();
      }
    });
  }




  // //定義顏色
  // var colorScale = d3.scale.category10();
  // function color(d){
  //   return colorScale(d.title); //依據標題分派顏色
  // }

  //解剖url上的get訊息
  function $_GET(param) {
    var vars = {};
    window.location.href.replace(location.hash, '' ).replace( 
      /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
      function( m, key, value ) { // callback
        vars[key] = value !== undefined ? value : '';
      }
    );

    if ( param ) {
      return vars[param] ? vars[param] : null;  
    }
    return vars;
  }

  function renderTimeline(json_data, origin_tag){
    $("#title").text("選取tag：" + origin_tag);
    $("#tl").html("");
    var block="", d="", cluster_id=0;
    for(var count in json_data){ //將json的date格式轉成d3可以吃的模式
        cluster_id = json_data[count]["cluster_id"]
        if( !colorJson.hasOwnProperty(cluster_id)){
          colorJson[cluster_id] = randomColor();
        }
        d = new Date(json_data[count]['time']);
        json_data[count]['time'] = d.getFullYear()-1911 + '/' + (parseInt(d.getMonth())+1) + '/' + d.getDate();
        block+="<div class='cd-timeline-block'>\
                  <div class='cd-timeline-img cd-picture' style='background-color:"+colorJson[cluster_id]+"'>\
                  </div> \
                  <div class='cd-timeline-content'>\
                    <h2>"+json_data[count]['title']+"</h2>\
                    <p>"+json_data[count]['summary'][0]+"</p>\
                    <a href='"+json_data[count]["url"]+"' class='cd-read-more' target='_blank'>Read more</a>\
                    <span class='cd-date'>"+json_data[count]['time']+"</span>\
                  </div> \
                </div>";
      }

    $("#tl").html(block);
  }
  // function renderTimeline2(json_data, origin_tag){
  //   //Start to handle page task
  //   $("#title").text("選取tag：" + origin_tag);

  //   $("#tl").html(""); //先清空時間軸 再重畫

  //   var chart = new d3KitTimeline('#tl', {
  //       direction: 'right',
  //       // initialWidth: screen.width/5*4.5, 
  //       initialHeight: screen.height, //不設定他好像就會自動調整高度？
  //       margin: {left: 100, right: 30, top: 50, bottom: 50},
  //       textFn: function(d){ //定義label上要顯示什麼字
  //         return (d.time.getFullYear()-1911) + '/' + (parseInt(d.time.getMonth())+1) + '/' + d.time.getDate() + ' - ' + d.title;
  //       },
  //       dotColor: color,
  //       labelBgColor: color,
  //       linkColor: color,
  //       labella: {
  //         maxPos: 1000,
  //         algorithm: 'simple'
  //       },
  //       labelPadding: {left: 10, right: 10, top: 12, bottom: 12}, //調整標籤大小的感覺
  //   });

  //   chart.data(json_data).resizeToFit(); //如果是左右顯示 它自動調寬度; 如果是上下顯示法 它自動調高度
  //   //click事件
  //   chart.on("labelClick", function(obj,count){
  //     // console.log(obj); //印出object內容在console上
  //     // alert(obj["content"]);

  //     //跳轉新分頁 開啟新聞的url
  //     // var newwin = window.open();
  //     // newwin.location= obj["url"];
  //   });

  //   // chart.on("labelMouseover", function(){
      
  //   // });
  // }
});

