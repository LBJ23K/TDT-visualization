csv = d3.dsv(",", "text/csv;charset=big5"); //解決讀csv亂碼的方法 自行定義d3裡面的csv讀取
csv("cluster.csv", function(data) {   //原來適用d3.csv開頭 但要解決亂碼 改方式
  var dataobj = { children: data };
  var pack = d3.layout.pack();
  pack = pack.padding(5).size([800,600]).sort(function(a,b) { return b.value - a.value; });
  var nodes = pack.nodes(dataobj);
  // nodes = nodes.filter(function(it) { return it.parent; });
  var color = d3.scale.category20();
  d3.select("svg")
    .selectAll("circle")                 // 建立 circle 的 Selection
    .data(nodes)                         // 綁定 selection 與資料
    .enter()                             // 對於任何沒被對應而落單的資料 ...
    .append("circle")                    // 新增一個 circle 的html tag
    .attr("class", "circle")             // 新增叫circle的class (css那有對應的hover動作)
    .attr({
      cx: function(it) { return it.x; }, // 用 x,y 當圓心
      cy: function(it) { return it.y; },
      r : function(it) { return it.r; }, // 用 r 當半徑
      fill: function(it) { return color(it.topic); },
      stroke: "#444",                    // 邊框畫深灰色
    })
    .on('click', function(it){
        alert("主題:" + it.topic + ", 篇數:" + it.value);
    });
  // alert("中文測試");
  d3.select("svg").selectAll("text").data(nodes).enter()
    .append("text")
    // .style("font-size", function(d) { return d.r/4 + "px"; })
    .attr({
      x: function(it) { return it.x; },
      y: function(it) { return it.y; },
      "text-anchor": "middle",                    // 文字水平置中
    }).text(function(it)  { return (it.value>30 ? it.topic : ""); }); // 篇數如果大於一定程度，會顯示標題

  });