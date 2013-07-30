var avb=avb||{};
avb.chart=function(){var a,e;initialize=function(d){void 0!==a&&a.remove();a=d3.select(d).append("svg");a.width=$(d).width();a.height=$(d).height();a.xmargin=50;a.ymargin=20;a.linestack=[];a.showLegend=!1;$("#info-wrap").click(toggleLegend);a.attr("height",a.height).attr("width",a.width);a.xscale=d3.scale.linear().domain([avb.firstYear,avb.lastYear]).range([a.xmargin,a.width-15]);a.layersWidth=a.xscale(avb.thisYear);addActions(a)};legend=function(d,c){a.legendLayers=d||a.legendLayers;a.legendParent=
c||a.legendParent;var b=[];a.legendLayers.each(function(d){b.push({key:d.key,color:d3.select(this).select("path").style("fill"),percentage:100*d.values[yearIndex].val/a.legendParent.values[yearIndex].val})});d3.selectAll("#legend tr").remove();var f=d3.select("#legend tbody").selectAll("tr").data(b.reverse()).enter().append("tr");f.append("td").append("div").classed("legend-label",!0).style("background-color",function(a){return a.color});f.append("td").text(function(b){return b.key+" ("+b.percentage.toFixed(2)+
"% of "+a.legendParent.key+")"});$("#legend").center()};initializeLayers=function(){setDatapointsVisibility();ie()||jQuery.browser.mobile||a.layersInitialized||(a.sideShadow=a.layerWindow.append("foreignObject").attr("width",10).attr("x",a.xscale.range()[1]-10).attr("height",a.yscale.range()[0]-10).attr("y",10).attr("class","foreignobj"),a.sideShadow.append("xhtml:div").style("width",(2).px()).style("height",(a.yscale.range()[0]-10).px()).classed("sideShadow",!0),a.layersInitialized=!0)};update=function(d,
c){d=d||avb.currentNode.data;c=c||avb.currentNode.color;void 0===a.axes&&(a.grids=a.append("g"),a.areagroup=a.append("g"),a.layers=a.append("g"),a.linegroup=a.append("g"),a.axes=a.append("g"),a.layerWindow=a.append("g"));d3.selectAll(a.grids.node().childNodes).remove();d3.selectAll(a.axes.node().childNodes).remove();a.yscale=d3.scale.linear().domain([0,1.2*d3.max(d.values,function(a){return a.val})]).range([a.height-a.ymargin,10]);var b=d3.svg.axis().scale(a.xscale).orient("bottom").tickSize(-a.yscale.range()[0]+
10,0,0).ticks(6).tickFormat(function(a){return""});a.grids.append("g").attr("class","multigrid").attr("transform","translate(0,"+a.yscale.range()[0]+")").call(b);b=d3.svg.axis().scale(a.yscale).orient("left").ticks(5).tickSize(-a.width+15+a.xmargin,0,0).tickFormat(function(a){return""});a.grids.append("g").attr("class","multigrid").attr("transform","translate("+a.xmargin+",0)").call(b);var b=d3.svg.line().interpolate("monotone").x(function(b){return a.xscale(b.year)}).y(function(b){return a.yscale(b.val)}),
f=d3.svg.area().interpolate("monotone").x(function(b,k){return a.xscale(b.year)}).y0(function(b){return a.height-a.ymargin}).y1(function(b){return a.yscale(b.val)}),h=avb.currentYear-avb.firstYear,g=0;if(void 0===a.visuals){a.visuals=[];for(i=0;2>i;i++)a.visuals.push(a.areagroup.append("svg:path"));for(i=0;2>i;i++)a.visuals.push(a.linegroup.append("svg:path"))}g=0;d3.selectAll("#areaclip").remove();a.append("g").append("clipPath").attr("id","areaclip").append("svg:path").attr("fill","none").attr("d",
f(d.values.slice(0,d.values.length)));a.visuals[0].classed("area",!0).transition().duration(g).attr("d",f(d.values.slice(0,d.values.length))).attr("fill","black");a.visuals[1].classed("area",!0).classed("projection",!0).transition().duration(g).attr("d",f(d.values.slice(h,d.values.length))).attr("color",c);a.visuals[0].style("fill",c);a.visuals[1].style("fill",c);a.visuals[2].classed("line",!0).transition().duration(g).attr("d",b(d.values.slice(0,h+1))).style("stroke",c);a.visuals[3].classed("line",
!0).classed("projection",!0).transition().duration(g).attr("d",b(d.values.slice(h,d.values.length))).style("stroke",c);b=d3.svg.axis().scale(a.xscale).orient("bottom").tickSize(0,0,0).tickPadding(10).tickFormat(function(a){return a});f=d3.svg.axis().scale(a.yscale).ticks(4).orient("left").tickSize(0,0,0).tickPadding(5).tickFormat(function(a){return formatcurrency(a)});void 0!==a.xAxisSocket&&(a.xAxisSocket.remove(),a.yAxisSocket.remove());void 0===a.circles&&(a.circles=a.linegroup.append("svg:g"),
a.circles.selectAll("circle").data(d.values).enter().append("circle"));a.circles.attr("data-name",d.key).selectAll("circle").data(d.values).attr("cx",function(b){return a.xscale(b.year)}).attr("cy",function(b){return a.yscale(b.val)}).attr("r",3).attr("stroke",c).attr("fill",c);a.circles.attr("data-name",d.key).selectAll("circle").data(d.values).enter().append("circle");h=a.axes.append("g").classed("overflows",!0);h.append("rect").attr("width",a.xmargin).attr("height",a.height);h.append("rect").attr("width",
a.width).attr("height",a.ymargin).attr("y",a.height-a.ymargin);h.append("rect").attr("width",10).attr("height",a.height).attr("x",a.xscale(avb.lastYear));a.xAxisSocket=a.axes.append("g").classed("axis",!0).classed("xAxis",!0).attr("transform","translate(0,"+(a.height-a.ymargin)+")").call(b);a.yAxisSocket=a.axes.append("g").attr("class","axis").attr("transform","translate( "+a.xmargin+",0)").call(f);$(".xAxis .tick:odd").each(function(){d3.select(this).classed("odd",!0)});d3.select(".xAxis g:nth-child("+
(yearIndex+1)+")").classed("thisYear",!0);initializeLayers();void 0!==e&&e.remove();drawLayers(d)};setDatapointsVisibility=function(){a.circles.selectAll("circle").attr("opacity",function(){var d=d3.select(this);parseFloat(d.attr("cx"))<a.layersWidth?d.style("opacity",0):d.style("opacity",1)})};toggleLegend=function(){a.showLegend=!a.showLegend;$("#legend-wrap, #cards").stop();a.showLegend?($("#legend-wrap").animate({left:"0"},350),$("#cards").animate({left:"100%"},350)):($("#legend-wrap").animate({left:"-100%"},
350),$("#cards").animate({left:"0"},350))};slideLayers=function(d){var c=Math.round(a.xscale.invert(d)),c=Math.max(c-avb.firstYear,0);yearIndex!==c&&(yearIndex=c,avb.cards.update(avb.currentNode.data),legend());d=Math.min(d,a.xscale.range()[1]);d=Math.max(d,a.xscale.range()[0]);a.layersWidth=d;a.layers.svg.attr("width",d);setDatapointsVisibility();ie()||jQuery.browser.mobile||a.layerLine.attr("x",d-10)};addActions=function(a){var c,b;function f(k){k=d3.event;k.preventDefault();l=!0;k="touchstart"===
k.type?k.touches[0].pageX:k.offsetX||d3.mouse(this)[0];slideLayers(k);b=a.layersWidth}function h(a){a=d3.event;a.preventDefault();l&&(dragging=!0,c=("touchmove"===a.type?a.touches[0].pageX:a.offsetX||d3.mouse(this)[0])-b,slideLayers(b+c))}function g(a){a=d3.event;a.preventDefault();l=!1}c=b=void 0;var l=!1;a.on("mousedown",f);a.on("mousemove",h);a.on("mouseup",g);a.on("touchstart",f);a.on("touchmove",h);a.on("touchend",g)};drawLayers=function(d,c){function b(b){ie()||jQuery.browser.mobile||(a.sideShadow.attr("clip-path",
"url(#areaclip)"),a.layerLine=b.append("foreignObject").attr("x",a.layersWidth-10).attr("width",10).attr("y",10).attr("height",a.yscale.range()[0]-10).attr("class","foreignobj"),a.layerLine.append("xhtml:div").style("width",(3).px()).style("height",(a.yscale.range()[0]-10).px()).classed("layerLine",!0))}e=a.layers.append("svg").attr("height",a.height).attr("width",a.width).classed("layers",!0);e.attr("clip-path","url(#areaclip)");a.layers.svg=e;a.layers.classed("layers",!0);e.width=a.width;e.height=
a.height;if(0===d.sub.length){b(e);var f=a.areagroup.datum(d);legend(f,f.datum())}else{var h=a.yscale,g=a.xscale;e.xscale=g;d3.scale.category20();var l=d3.svg.area().interpolate("monotone").x(function(a){return g(a.year)}).y0(function(a){return h(a.y0)}).y1(function(a){return h(a.y0+a.val)}),k=d3.svg.line().interpolate("monotone").x(function(a){return g(a.year)}).y(function(a){return h(a.y0+a.val)}),f=d3.layout.stack().values(function(a){return a.values}).x(function(a){return a.year}).y(function(a){return a.val})(d.sub),
f=e.selectAll(".browser").data(f).enter().append("g").attr("class","browser");e.areas=f.append("path").attr("class","multiarea").attr("d",function(a){return l(a.values)}).style("fill",function(a,b){return d3.scale.category20().range()[b%20]});e.lines=f.append("path").attr("class","multiline").attr("d",function(a){return k(a.values)}).style("stroke",function(a,b){return d3.scale.category20().range()[b%20]});legend(f,d);$(".layers g:last .multiline").remove();b(e);setTimeout(function(){slideLayers(a.layersWidth)},
10)}};return{chart:a,initialize:initialize,update:update}}();avb=avb||{};
avb.treemap=function(){var a,e,d={r:255,b:255,g:255},c=function(b){a.selectAll("g").remove();var d=function(a){a.sub&&(c.nodes({values:a.values,children:a.sub}),a.sub.forEach(function(b){b.x=a.x+b.x*a.dx;b.y=a.y+b.y*a.dy;b.dx*=a.dx;b.dy*=a.dy;b.parent=a;d(b)}))},c=d3.layout.treemap().children(function(a,b){return b?null:a.children}).value(function(a){return a.values[yearIndex].val}).sort(function(a,b){return a.values[yearIndex].val-b.values[yearIndex].val}).ratio(0.5*(a.h/a.w)*(1+Math.sqrt(5))).round(!1);a.grandparent=
a.append("g").attr("class","grandparent");(function(b){b.x=b.y=0;b.dx=a.w;b.dy=a.h;b.depth=0})(b);d(b);e=display(b)};display=function(b){function d(a,b){b.selectAll(".child").data(function(a){return a.sub||[a]}).enter().append("g").attr("class","child").each(function(){var b=d3.select(this);void 0!==a.sub&&$.each(a.sub,function(){d(this,b)})}).append("rect").call(rect)}$(".no-value").popover("destroy");d3.format(",d");var c=a.insert("g",".grandparent").datum(b).attr("class","depth").on("click",function(a){zoneClick.call(this,
d3.select(this).datum(),!0)}).selectAll("g").data(0===b.sub.length?[b]:b.sub).enter().append("g");a.grandparent.datum(void 0===b.parent?b:b.parent).attr("nodeid",void 0===b.parent?b.hash:b.parent.hash).on("click",function(a){zoneClick.call(this,d3.select(this).datum(),!0)});updateTitle(b);c.filter(function(a){return a.sub}).classed("children",!0).on("click",function(a){zoneClick.call(this,d3.select(this).datum(),!0)}).each(function(){var a=d3.select(this);a.attr("nodeid",function(){return a.datum().hash})});
0!==b.sub.length&&void 0===b.color&&(b.color=a.color(0));for(var g=0;g<b.sub.length;g++)b.sub[g].color=a.color(g);c.append("rect").attr("class","parent").call(rect).style("fill",function(a){return zoneColor(a.color,0.8)});d(b,c);if(ie())return a.on("mouseout",function(){d3.select("#ie-popover").style("display","none")}),c;c.each(function(){d3.select(this).append("foreignObject").call(rect).attr("class","foreignobj").append("xhtml:div").html(function(a){var b='<div class="titleLabel">'+a.key+"</div>";
a='<div class="valueLabel">'+formatcurrency(a.values[yearIndex].val)+"</div>";return b+a}).attr("class","textdiv");textLabels.call(this)});return c};ieLabels=function(b){d3.select(this).append("text").call(rect).attr("dy","1.5em").attr("dx","0.5em").text(function(a){return a.key});textLabels.call(this);b=d3.select(this).datum();var d=a.y(b.y+b.dy)-a.y(b.y),c=a.x(b.x+b.dx)-a.x(b.x);if(40>d||150>c)d3.select(this).classed("no-label",!0),popover=!0;(function(a,b,d){d3.select(a).on("mouseover",function(){var a=
d3.select(this).select(".parent"),d=[parseFloat(a.attr("x")),parseFloat(a.attr("y"))],a=d[0]+parseFloat(a.attr("width"))/2-75;d3.select("#ie-popover").select(".text").text(b);d3.select("#ie-popover").style("display","block").style("left",a.px()).style("top",d[1].px())})})(this,b.key,b.descr)};textLabels=function(b){function d(a,c,k){$(a).find("div").first().popover({container:"body",trigger:"hover",placement:function(a,b){return 110>$(b).position().top?"left":"top"},title:""!==k&&""!==b.title?b.key:
"",content:""!==k?k:b.key,html:!0})}b=d3.select(this).datum();var c=a.y(b.y+b.dy)-a.y(b.y),g=a.x(b.x+b.dx)-a.x(b.x),e=$(this).find(".titleLabel").first(),k=$(this).find(".textdiv").first();$(this).find("div").first().popover("destroy");d3.select(this).classed("no-label",!1);d3.select(this).classed("no-value",!1);k.height(Math.max(0,c-16));var n=!1,m;m=null!=avb.userContribution&&"expenses"==avb.section?"<div>"+b.descr+'</div> <div class="contribution"> Your contribution is '+stats.individual.value(b)+
"</div>":b.descr;if(c<e.outerHeight()||40>c||60>g)d3.select(this).classed("no-label",!0),n=!0;(c<k.height()||80>c||90>g)&&d3.select(this).classed("no-value",!0);(n||""!==m||80>g)&&d(this,b.key,m)};updateTitle=function(a){var d=$(".title-head .text"),c=$("#zoombutton"),g=d3.select(".grandparent").node();c.unbind();d.text(a.key);d.textfill(48,$(".title-head").width()-120);inArray(avb.sections,a.key.toLowerCase())&&$('<div class="description">  </div>').appendTo(d).text(a.descr);avb.currentNode.data===
avb.root?c.addClass("disabled"):c.removeClass("disabled");c.click(function(){zoneClick.call(g,d3.select(g).datum(),!0)})};open=function(a,d){var c=d3.select('g[nodeid*="'+a+'"]');zoneClick.call(c.node(),c.datum())};zoneClick=function(b,d){var c=window.event||c;stopPropagation(c);!a.transitioning&&(b&&avb.currentNode)&&(b!==avb.root&&b===avb.currentNode.data?$("#zoombutton").trigger("click"):(!0===d&&pushUrl(avb.section,avb.thisYear,avb.mode,b.hash),yearIndex=avb.thisYear-avb.firstYear,a.selectAll("text").remove(),
avb.currentNode.data=b,avb.currentNode.year=yearIndex,avb.chart.update(b,b.color),avb.cards.update(b),a.transitioning=!0,c=display(b),t1=e.transition().duration(750),t2=c.transition().duration(750),a.x.domain([b.x,b.x+b.dx]),a.y.domain([b.y,b.y+b.dy]),a.style("shape-rendering",null),a.selectAll(".depth").sort(function(a,b){return a.depth-b.depth}),c.selectAll(".foreignobj").style("fill-opacity",0),t1.style("opacity",0),t1.selectAll(".foreignobj").call(rect),t2.selectAll(".foreignobj").call(rect),
t1.selectAll("rect").call(rect),t2.selectAll("rect").call(rect),t2.each(function(){ie()||textLabels.call(this)}),t2.each("end",function(){ie()?ieLabels.call(this):textLabels.call(this)}),t1.remove().each("end",function(){a.style("shape-rendering","crispEdges");a.transitioning=!1}),e=c))};rect=function(b){b.attr("x",function(b){return a.x(b.x)}).attr("y",function(b){return a.y(b.y)}).attr("width",function(b){return a.x(b.x+b.dx)-a.x(b.x)}).attr("height",function(b){return a.y(b.y+b.dy)-a.y(b.y)})};
zoneColor=function(a,c){var e=mixrgb(hexToRgb(a),d,c);return"rgba("+e.r+","+e.g+","+e.b+",1)"};return{initialize:function(b){var d=$("#navigation").width(),e=$("#navigation").height();d3.format(",d");a=d3.select("#navigation").append("svg").attr("width",d).attr("height",e).append("g").style("shape-rendering","crispEdges");a.x=d3.scale.linear().domain([0,d]).range([0,d]);a.y=d3.scale.linear().domain([0,e]).range([0,e]);a.h=e;a.w=d;a.color=d3.scale.category20();$("#zoombutton").center();avb.chart.initialize("#chart");
c(b)},update:c,open:open,updateTitle:updateTitle}}();avb=avb||{};
avb.cards=function(){var a=[],e=[];initialize=function(){e=[];$("#cards");a=decks[avb.section];draw()};draw=function(){for(var d,c=0;c<a.length;c++){0===c%2&&(d=$('<div class="row-fluid card-row separator"> </div>').appendTo("#cards"));var b=drawCard(d,a[c]);e.push(b)}};drawCard=function(a,c){return $("<div></div>").appendTo(a).html(Mustache.render($("#card-template").html(),c))};update=function(d){for(var c=0;c<a.length;c++)e[c].html(Mustache.render($("#card-template").html(),a[c])),e[c].find(".card-value").html(a[c].value(d)),
"function"===typeof a[c].link&&(e[c].attr("onclick","window.location='"+a[c].link(d)+"'"),e[c].click(function(a){stopPropagation(window.event||a)})),e[c].find(".card-desc").html("string"===typeof a[c].side?a[c].side:a[c].side(d))};clear=function(){e.length=0};return{update:update,clear:clear,initialize:initialize}}();avb=avb||{};
avb.navbar=function(){var a=function(a){var c=[];$.each(avb.sections,function(){var b=this,f=e(a,avb.data[this],avb.data);$.each(f,function(){this.section=capitalize(b)});c=c.concat(f)});return c},e=function(a,c,b){var f=c.key.toLowerCase().indexOf(a.toLowerCase());0!==f&&" "!==c.key[f-1]&&(f=-1);-1!=f&&(c.parent=b.key);b=-1!==f?[c]:[];if(void 0!==c.sub)for(f=0;f<c.sub.length;f++)b=b.concat(e(a,c.sub[f],c));return b};return{initialize:function(){$dropdown=$("#yeardrop-container");$dropdownLabel=$("#yeardrop-label");
$dropdownList=$("#yeardrop-list");$selector=$("#yeardrop-container-mobile");if(jQuery.browser.mobile){$selector.html("");for(a=avb.firstYear;a<=avb.lastYear;a++)c="<option"+(a==avb.thisYear?' selected="selected"':" ")+'value="'+a+'">'+a+"</option>",$selector.append(c);$selector.change(function(){changeYear(parseInt($selector.val()))});$selector.show();$("#yeardrop").css({"vertical-align":"top"})}else{$dropdownList.html("");for(var a=avb.firstYear;a<=avb.lastYear;a++){var c='<li role="presentation"><a role="menuitem" tabindex="-1" href="#">'+
a+"</a></li>";$dropdownList.append(c);$dropdownList.find("li :last").click(function(a){a.preventDefault();a=parseInt($(this).text());$dropdownLabel.html(a+' <b class="caret"></b>');changeYear(a);$dropdown.removeClass("open")})}$dropdownLabel.html(avb.thisYear+' <b class="caret"></b>');$dropdown.show()}jQuery.browser.mobile&&($("#navbar-map").text("Map"),$("#navbar-table").text("Table"),$("#navbar-funds").text("Funds"));$("#searchbox").bind("click touchstart",function(){$("#avb-home").is(":visible")&&
avb.home.hide()})},searchChange:function(){var d=$(this).val();clearTimeout(timer);timer=setTimeout(function(){avb.navigation!==avb.table&&setMode("l");pushUrl(avb.section,avb.thisYear,"l",avb.root.hash);avb.navigation.initialize(a(d))},300)},minimize:function(){log($("#navbar-links .entry").last().remove())}}}();avb=avb||{};
avb.table=function(){var a=[],e=d3.scale.linear().clamp(!0).domain([-10,10]).range(["rgb(29,118,162)","rgb(167, 103, 108)"]),d=d3.scale.linear().clamp(!0).range(["#aaa","#333"]),c=d3.scale.linear().clamp(!0).domain([0,100]).range(["#aaa","#333"]),b=function(b){var c=$('<div class="tablerow" id="table-header" > <div class="bullet"> </div>').appendTo(b).data("level",0);$.each(a,function(){$('<div class="'+this.cellClass+' head"> </div>').appendTo(c).text(this.title)})},f=function(){var a=0;$(".tablerow").each(function(){$(this).data("level")>
a&&(a=$(this).data("level"))});$(".tablerow").each(function(){$(this).find(".name").animate({"margin-right":25*(a-$(this).data("level"))},250)})},h=function(a,b){var c=$("#row-template");b.append(Mustache.render(c.html())).children().last().css({"text-align":"center"}).text(a)},g=function(){var a=$(this),b=a.data();if(!a.hasClass("atomic"))if(a.hasClass("expanded"))a.data("childDiv").slideUp(250,function(){$(this).remove();f()}),a.find(".expand-icon").animate({"-webkit-transform":"rotate(90deg)"}),
a.removeClass("expanded");else{for(var c=$('<div class="group"></div>').insertAfter(a),d=0;d<b.sub.length;d++)l(b.sub[d],a.data("level")+1,c),a.data("childDiv",c);a.addClass("expanded");f();c.slideDown(250)}},l=function(b,c,d){var e=$("#row-template"),f=d.append(Mustache.render(e.html(),b)).children().last();f.addClass(void 0===b.sub||0===b.sub.length?"atomic":"");f.data(b);f.data("level",c);f.css({"padding-left":25*c});$.each(a,function(){var a=$('<div class="'+this.cellClass+'"> </div>').appendTo(f);
this.cellFunction?this.cellFunction(b,a.get(0)):a.text(this.value(b))});0!==b.descr.length&&f.find(".long").popover({trigger:"manual",placement:function(a,b){return 150>$(b).position().top?"bottom":"top"},content:b.descr});f.mouseenter(function(){f.find(".long").popover("show")});f.mouseleave(function(){f.find(".long").popover("hide")});f.click(g);return f};renderAmount=function(b,c){var e=b.values[yearIndex].val;a!==tables.search&&$(c).css({color:d(e)});$(c).text(formatCurrencyExact(e))};renderImpact=
function(a,b){var d=stats.impact.value(a);$(b).css({color:c(d)});$(b).text(d)};open=function(){};update=function(b){$(".tablerow").each(function(){var b=$(this);if(!b.is("#table-header"))for(var c=0;c<a.length;c++){var d=$($(b).find(".value").get(c));a[c].cellFunction?a[c].cellFunction(b.data(),d.get(0)):d.text(a[c].value(b))}})};return{initialize:function(c){var e=$("#table-container");$(".tablerow").remove();c instanceof Array?(a=tables.search,0===c.length?h("No results found.",e):(b(e),$.each(c,
function(){l(this,0,e)}))):(a=tables[avb.section],b(e),d.domain([0,0.5*c.values[yearIndex].val]),l(c,0,e).trigger("click"))},renderSparkline:function(a,b){var c=$(b).width(),d=$(b).parent().height();d3.select(b).select("svg").remove();var e=d3.select(b).append("svg").attr("width",c).attr("height",d),g=d3.scale.linear().range([0,c]).domain([avb.firstYear,avb.lastYear]),f=d3.scale.linear().range([d-2,2]).domain([0,d3.max(a.values,function(a){return a.val})]),c=d3.svg.line().interpolate("monotone").x(function(a){return g(a.year)}).y(function(a){return f(a.val)});
e.append("g").append("svg:path").classed("line",!0).attr("d",c(a.values)).style("stroke","black");e.append("g").append("svg:circle").attr("r",2).attr("cx",g(a.values[yearIndex].year)).attr("cy",f(a.values[yearIndex].val))},renderGrowth:function(a,b){var c=a.values[yearIndex-1]?a.values[yearIndex-1].val:0;perc=0===a.values[yearIndex].val?0===c?0:100:Math.round(1E4*(a.values[yearIndex].val-c)/a.values[yearIndex].val)/100;$(b).css({color:e(perc)});$(b).text(formatPercentage(perc))},renderAmount:renderAmount,
renderImpact:renderImpact,open:open,update:update}}();stats={amount:{title:"Amount","class":"span6 top",value:function(a){return formatcurrency(a.values[yearIndex].val)},side:function(){return" in "+(avb.firstYear+yearIndex).toString()+"."},cellClass:"value sum ",cellFunction:function(a,e){avb.table.renderAmount(a,e)}},impact:{title:"Impact","class":"span6 ",value:function(a){return Math.max(0.01,Math.round(1E4*a.values[yearIndex].val/avb.root.values[yearIndex].val)/100).toString()+"%"},side:function(){return" of total "+avb.section+"."},cellClass:"value sum",
cellFunction:function(a,e){avb.table.renderImpact(a,e)}},individual:{title:"Individual","class":"span6 individual",value:function(a){return"$"+d3.round(avb.userContribution*(a.values[yearIndex].val/avb.root.values[yearIndex].val),2)},side:"your yearly contribution.",cellClass:"value sum",cellFunction:function(a,e){avb.table.renderImpact(a,e)}},growth:{title:"Growth","class":"span6 top",value:function(a){return growth(a)},side:" compared to previous year.",cellFunction:function(a,e){avb.table.renderGrowth(a,
e)},cellClass:"value"},source:{title:"Source","class":"span6 card-source ",value:function(a){return""===a.src?"Town of Arlington":a.src},link:function(a){return""===a.url?"http://www.town.arlington.ma.us/":a.url},side:"is the data source for this entry."},mean:{title:"Average","class":"span6 ",value:function(a){return formatcurrency(d3.mean(a.values,function(a){return a.val}))},side:"on average."},filler:{title:"","class":"span6 ",value:function(a){return""},side:""},name:{title:"Name",cellClass:"value name long textleft",
value:function(a){return a.key}},sparkline:{title:"Change",cellClass:"value sparkline",cellFunction:function(a,e){avb.table.renderSparkline(a,e)}},section:{title:"Type",cellClass:"value",value:function(a){return a.section}},parent:{title:"From",cellClass:"value",value:function(a){return"string"===typeof a.parent?a.parent:""}}};
decks={revenues:[stats.amount,stats.growth,stats.impact,stats.mean,stats.source],expenses:[stats.amount,stats.growth,stats.impact,stats.mean,stats.source],funds:[stats.amount,stats.growth,stats.impact,stats.mean,stats.source]};
tables={revenues:[stats.name,stats.growth,stats.sparkline,stats.impact,stats.amount],expenses:[stats.name,stats.growth,stats.sparkline,stats.impact,stats.amount],funds:[stats.name,stats.growth,stats.sparkline,stats.impact,stats.amount],search:[stats.name,stats.growth,stats.sparkline,stats.amount,stats.parent,stats.section]};
function formatcurrency(a){return void 0===a?"N/A":1E6<=a?"$"+Math.round(a/1E6).toString()+" M":1E6>a&&1E3<=a?"$"+Math.round(a/1E3).toString()+" K":1>a&&0!=a?"\u00a2"+Math.round(100*a).toString():"$ "+a.toString()}function formatCurrencyExact(a){return"$ "+d3.format(",.0f")(a)}function formatPercentage(a){return 0<a?"+ "+a.toString()+"%":0>a?"- "+Math.abs(a).toString()+"%":Math.abs(a).toString()+"%"}
function growth(a){a=Math.round(1E4*(a.values[yearIndex].val-(void 0!==a.values[yearIndex-1]?a.values[yearIndex-1].val:0))/a.values[yearIndex].val)/100;return formatPercentage(a)};avb=avb||{};
avb.home=function(){var a={},e,d=[{selector:"#information-cards",text:"See the basic financial summary and high level data story.",position:"right"},{selector:"#chart-wrap",text:"Explore how the town revenues changed over time.",position:"right"},{selector:"#navigation",text:"The xray of the financials... Zoom into the data details by touching a block. How cool was that?",position:"left"},{selector:"#yeardrop",text:"Interested in seeing budget history or projections? Use this menu.",position:"left",before:function(){setTimeout(function(){$("#yeardrop-container").addClass("open")},
800)}}],c=[{selector:".individual",text:"Here is your yearly contribution.",position:"right"},{selector:"#navigation",text:"See how much you pay for these services.",position:"left"}],b=[{selector:"#fire",text:"The fire department accounts for one of the greatest town department expenses.",position:"left",before:function(){$('g[nodeid="bd2b7e5f"]').find("div").first().attr("id","fire")}},{selector:"#cards",text:"Here is the basic information you need to know about the department.",position:"down",
before:function(){avb.navigation.open("bd2b7e5f")}},{selector:"#zoombutton",text:"Go back and explore more.",position:"left"}],f=[{selector:"#snow",text:"Snow removal has a relatively small cost compared to other departments",position:"top",before:function(){$('g[nodeid="c61196eb"]').find("div").first().attr("id","snow")}},{selector:"#chart",text:"Check how the snow removal costs oscillate over the years.",position:"right",before:function(){avb.navigation.open("c61196eb")}},{selector:"#cards",text:"Here is the basic information about snow removal over the current year.",
position:"right"},{selector:"#zoombutton",text:"Go back and explore more.",position:"left"}],h=[{selector:"#school",text:"School play an important role in the town expenses.",position:"bottom",before:function(){$('g[nodeid="b5fe5259"]').find("div").first().attr("id","school")}},{selector:"#cards",text:"They constitute about 40% of the yearly expenses.",position:"right",before:function(){avb.navigation.open("b5fe5259")}},{selector:"#zoombutton",text:"Go back and explore more.",position:"left"}];init=
function(d){function e(a,b){sectionClick.call(this);setTimeout(function(){void 0!==b?(setTimeout(function(){b()},1E3),setTimeout(function(){starttour(a)},2500)):starttour(a)},500)}a.content=$("#avb-home");a.overlay=$("#overlay");a.map=$("#home-map-svg");a.menubar=$("#avb-menubar");a.overlay.click(function(a){a.stopPropagation();$($(".section").get(2)).addClass("selected");hide()});$(".section").removeAttr("onclick");$("#tax-input").val(getContribution());$("#tax-input-start").click(function(){setContribution();
e.call(this,c)});$("#tax-input").keypress(function(a){13==a.which&&(setContribution(),e.call(this,c))});$("#q1").click(function(){e.call(this,b,function(){avb.navigation.open("dc313bc5");b[0].before()})});$("#q2").click(function(){sectionClick.call(this);setTimeout(function(){h[0].before();starttour(h)},1200)});$("#q3").click(function(){e.call(this,f,function(){avb.navigation.open("dc313bc5");f[0].before()})})};sectionClick=function(){initialize({section:$(this).attr("data-section").toLowerCase()});
setTimeout(function(){hide()},100)};getContribution=function(){var a=jQuery.cookie("contribution")||null;null!==a&&decks.expenses[0].title!==stats.individual.title&&decks.expenses.unshift(stats.individual);return a};setContribution=function(){var a=parseFloat($("#tax-input").val());isNaN(a)||(avb.userContribution=a,jQuery.cookie("contribution",avb.userContribution,{expires:14}))};validate=function(a){a=a||window.event;var b=a.keyCode||a.which,b=String.fromCharCode(b);/[0-9]|\./.test(b)||(a.returnValue=
!1,a.preventDefault&&a.preventDefault())};showGraph=function(b){var c=a.data.sub,d=d3.scale.linear().clamp(!0).range([30,160]).domain([0,d3.max(c,function(a){return a.values[yearIndex].val})]);$("#revenues-node").animate({height:d(c[0].values[yearIndex].val)},b).find(".node-value").text(formatcurrency(c[0].values[yearIndex].val));$("#expenses-node").animate({height:d(c[1].values[yearIndex].val)},b).find(".node-value").text(formatcurrency(c[1].values[yearIndex].val));$("#funds-node").animate({height:d(c[2].values[yearIndex].val)},
b).find(".node-value").text(formatcurrency(c[2].values[yearIndex].val));$(".node-value").fadeIn(b);$(".node").click(sectionClick)};show=function(){a.menubar.removeClass("purple-border");a.content.show();a.overlay.show();var b=JSON.parse($("#data-home").html());setTimeout(function(){a.data=b;showGraph(1E3)},1E3);initialize({section:"funds"});$(".section").removeClass("selected")};hide=function(b){a.content.slideUp(function(){a.menubar.addClass("purple-border")});a.overlay.fadeOut(function(){(b||isFirstVisit())&&
starttour()})};isFirstVisit=function(){var a=jQuery.cookie("visited");jQuery.cookie("visited","y",{expires:14});return"y"!==a};starttour=function(b){b=b||d;(function(b){for(var c=0;c<b.length;c++)$(b[c].selector).attr("data-intro",b[c].text).attr("data-step",c+1).attr("data-position",b[c].position);a.selectedTour=b})(b);e=introJs();e.onchange(function(a){a=parseInt($(a).attr("data-step"))-1;a===b.length-1&&$(".introjs-nextbutton, .introjs-prevbutton").hide();"function"===typeof b[a].before&&b[a].before()});
e.setOption("showStepNumbers",!1);e.setOption("skipLabel","Exit");e.start()};return{initialize:init,show:show,showGraph:showGraph,hide:hide,validate:validate,getContribution:getContribution,setContribution:setContribution}}();
