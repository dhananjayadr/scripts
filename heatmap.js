(function(){
  var gL=0,gT=0,gW=window.innerWidth||document.documentElement.clientWidth,
      maxMarkers=50, // Max markers to display
      markerCount=0,
      slowestResponse=0;
  
  performance.getEntries().forEach(function(entry){
    if(entry.responseEnd > slowestResponse) slowestResponse = entry.responseEnd;
  });

  var getOffset=function(o){
    var l=0,t=0,w=0;
    while(o){l+=o.offsetLeft;t+=o.offsetTop;w+=o.offsetWidth;o=o.offsetParent;}
    if(t===0){l+=gL;t+=gT;}
    return {l:l,t:t,w:w};
  };
  
  var heatmap=function(h){
    var scale=h/slowestResponse;
    return scale<.125?"background:#d73c4c;":scale<.25?"background:#f66d3a;":scale<.375?"background:#ffaf59;":scale<.5?"background:#ffe185;":scale<.625?"background:#e6f693;":scale<.75?"background:#aadea2;":scale<.875?"background:#62c3a5;":"background:#2c87bf;";
  };
  
  var placeMarker=function(xy,w,h,e){
    if(markerCount >= maxMarkers) return; // Limit the number of markers
    
    var p=w<170?12:9,s=w<170?12:18,m=document.createElement("div");
    m.style.cssText="position:absolute;box-sizing:border-box;color:#000;padding-left:10px;padding-right:10px;line-height:14px;font-size:"+s+"px;font-weight:800;text-align:center;opacity:0.85;transition:opacity 0.5s ease-in;"+heatmap(e.responseEnd)+"top:"+xy.t+"px;left:"+xy.l+"px;width:"+w+"px;height:"+h+"px;padding-top:"+((h/2)-p)+"px;z-index:4000;";
    m.innerHTML=parseInt(e.responseEnd)+"ms ("+parseInt(e.duration)+"ms)";

    m.title = "URL: " + (e.name || "N/A") + "\nDuration: " + parseInt(e.duration) + "ms";
      
    m.style.opacity = '0';
    document.body.appendChild(m);
    setTimeout(function(){ m.style.opacity = '0.85'; }, 10);

    if(xy.t===0){gL+=m.offsetWidth+10;if(gL+100>gW){gT+=30;gL=0;}}
    markerCount++;
  };
  
  var markElems=function(t){
    var elems=document.getElementsByTagName(t);
    for(var i=0;i<elems.length;i++){
      var e=elems[i];
      if(t==="link"&&e.rel!=="stylesheet")continue;
      var u=e.src||e.href;if(u){
        var ent=performance.getEntriesByName(u)[0];
        if(ent){
          var xy=getOffset(e),wh=e.getBoundingClientRect(),w=wh.width,h=wh.height;
          if(w>20&&h>20)placeMarker(xy,w,h,ent);
        }
      }
    }
  };
  
  var loaded=performance.timing.loadEventEnd-performance.timing.navigationStart;
  markElems("img"); markElements("script"); markElements("link")
  window.addEventListener("error", function(e){
    console.error("Error loading performance marker: ", e.message);
  });
})();
