/* globals d3, d3Kit, d3KitTimeline */
'use strict';

$(document).ready(function(){

  //可以多帶參數 也可以設定label上要顯示的方法 url就是自己帶入的參數
  //Date裡的參數依序是年月日時... 設置的比較細 timeline就會自動調整它的範圍
  var data = [
    {time: new Date(2015,11,13,5,10), name: '小英當選', url: 'http://goo.gl/kLLY9Y'},
    {time: new Date(2015,11,12,6,11), name: '蔡英文勝選', url: 'http://goo.gl/kLLY9Y'},
    {time: new Date(2015,11,15,23,12), name: '小英成為第一個女總統', url: 'http://goo.gl/kLLY9Y'},
    {time: new Date(2015,11,11,9,12), name: '蔡英文當選', url: 'http://goo.gl/kLLY9Y'},
    {time: new Date(2015,11,12,10,10), name: '台灣第一個女總統', url: 'http://goo.gl/kLLY9Y'},
    {time: new Date(2015,11,13,11,1), name: '小英勝選', url: 'http://goo.gl/kLLY9Y'},
    {time: new Date(2015,11,18,12,10), name: '蔡英文成為第一個女總統', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,13,5,10), name: '小英當選', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,12,6,11), name: '蔡英文勝選', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,15,23,12), name: '小英成為第一個女總統', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,11,9,12), name: '蔡英文當選', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,12,10,10), name: '台灣第一個女總統', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,13,11,1), name: '小英勝選', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,18,12,10), name: '蔡英文成為第一個女總統', url: 'http://goo.gl/kLLY9Y'},{time: new Date(2015,11,13,5,10), name: '小英當選', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,12,6,11), name: '蔡英文勝選', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,15,23,12), name: '小英成為第一個女總統', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,11,9,12), name: '蔡英文當選', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,12,10,10), name: '台灣第一個女總統', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,13,11,1), name: '小英勝選', url: 'http://goo.gl/kLLY9Y'},
    // {time: new Date(2015,11,18,12,10), name: '蔡英文成為第一個女總統', url: 'http://goo.gl/kLLY9Y'},
  ];


  //取得GET過來的資訊
  var tag = $_GET("tag");
  tag = decodeURI(tag); //傳過來的時候有encode 所以讀取的時候要decode

  //要傳的tag的陣列
  var tag_arr = [];
  // tag_arr.push("蔡英文");
  tag_arr.push(tag);
    // tag_arr.push("寵物");


  $.ajax({
    url: 'api/get_news_by_tag.php',
    dataType: "json", //讓回傳的東西直接是js看得懂的jsonObj
    type:'POST',                
    data: {tag_arr: tag_arr},
    error:function(e){
      alert('Ajax request 發生錯誤');
    },
    success: function(jsonObj){
      // alert('Ajax success!');
      // alert(jsonObj);
      for(var count in jsonObj){ //將json的date格式轉成d3可以吃的模式
        jsonObj[count]['time'] = new Date(jsonObj[count]['time']);
        // alert(jsonObj[count]['time']);
      }
      renderTimeline(jsonObj, tag); //重印timeline
    }
  });



  //定義顏色
  var colorScale = d3.scale.category10();
  function color(d){
    return colorScale(d.title); //依據標題分派顏色
  }

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


  function renderTimeline(json_data, tag){
    //Start to handle page task
    $("#title").text("選取tag：" + tag);

    var chart = new d3KitTimeline('#tl', {
        direction: 'right',
        // initialWidth: screen.width/5*4.5, 
        initialHeight: screen.height, //不設定他好像就會自動調整高度？
        margin: {left: 100, right: 30, top: 50, bottom: 50},
        textFn: function(d){ //定義label上要顯示什麼字
          return (d.time.getFullYear()-1911) + '/' + (parseInt(d.time.getMonth())+1) + '/' + d.time.getDate() + ' - ' + d.title;
          // return d.title;
        },
        dotColor: color,
        labelBgColor: color,
        linkColor: color,
        labella: {
          maxPos: 1000,
          algorithm: 'simple'
        },
        labelPadding: {left: 10, right: 10, top: 12, bottom: 12}, //調整標籤大小的感覺
    });

    chart.data(json_data).resizeToFit(); //如果是左右顯示 它自動調寬度; 如果是上下顯示法 它自動調高度
    //click事件
    chart.on("labelClick", function(obj,count){
      console.log(obj); //印出object內容在console上
      alert(obj["content"]);

      //跳轉新分頁 開啟新聞的url
      // var newwin = window.open();
      // newwin.location= obj["url"];
    });

    // chart.on("labelMouseover", function(){
      
    // });
  }

});

