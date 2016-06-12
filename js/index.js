csv = d3.dsv(",", "text/csv;charset=big5"); //解決讀csv亂碼的方法 自行定義d3裡面的csv讀取
csv("cluster.csv", function(data) {   //原來適用d3.csv開頭 但要解決亂碼 改方式
  var bleed = 100;
  var width = screen.width; //原來用960
  var height = 1000; //原來用760 圖會被砍掉

  var dataobj = { children: data };
  var pack = d3.layout.pack()
    .sort(null) //不規則排法
    // .sort(function(a,b) { return b.value - a.value; })  // 中間由大到小的排法 逆時針
    .size([width, height + bleed * 2])
    .padding(5);
  
  var color = d3.scale.category20();
  var svg = d3.select("#root")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(0," + -bleed + ")");

  var node = svg.selectAll(".node")
      .data(pack.nodes(dataobj)
      .filter(function(d) { return !d.children; }))
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("circle")
      .attr("class", "circle")             // 新增叫circle的class (css那有對應的hover動作)
      .attr({
        r : function(it) { return it.r-30; }, // 用 r 當半徑
        fill: function(it) { return color(it.topic); },
        stroke: "#444",                    // 邊框畫深灰色
      })
      .on('click', function(it){
        alert("主題:" + it.topic + ", 篇數:" + it.value);
      })
      .transition() //加入放大動畫
      .duration(500)
      .attr({
          r : function(it) { return it.r; }, // 用 r 當半徑
      });

  node.append("text")
      .text(function(it)  { return (it.value>30 ? it.topic : ""); }) // 篇數如果大於一定程度，會顯示標題
      .style("font-size", function(d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
      .attr("dy", ".35em");
  });

  // var nodes = pack.nodes(dataobj);
  // nodes = nodes.filter(function(it) { return it.parent; });
  // svg.selectAll("circle")                 // 建立 circle 的 Selection
  //   .data(nodes)                         // 綁定 selection 與資料
  //   .enter()                             // 對於任何沒被對應而落單的資料 ...
  //   .append("circle")                    // 新增一個 circle 的html tag
  //   .attr("class", "circle")             // 新增叫circle的class (css那有對應的hover動作)
  //   .attr({
  //     cx: function(it) { return it.x; }, // 用 x,y 當圓心
  //     cy: function(it) { return it.y; },
  //     r : function(it) { return it.r; }, // 用 r 當半徑
  //     fill: function(it) { return color(it.topic); },
  //     stroke: "#444",                    // 邊框畫深灰色
  //   })
  //   .on('click', function(it){
  //       alert("主題:" + it.topic + ", 篇數:" + it.value);
  //   });
  // // alert("中文測試");
  // d3.select("svg").selectAll("text").data(nodes).enter()
  //   .append("text")
  //   // .style("font-size", function(d) { return d.r/4 + "px"; })
  //   .attr({
  //     x: function(it) { return it.x; },
  //     y: function(it) { return it.y; },
  //     "text-anchor": "middle",                    // 文字水平置中
  //   }).text(function(it)  { return (it.value>30 ? it.topic : ""); }); // 篇數如果大於一定程度，會顯示標題

  // });
