var pic = document.getElementById("vimage");
var clr = document.getElementById("clear");
var mvr = document.getElementById("move");

var shape = function(x, y) {
  var c = document.createElementNS("http://www.w3.org/2000/svg",
 "circle");
  c.setAttribute( "cx", x );
  c.setAttribute( "cy", y );
  c.setAttribute( "r", "25" );
  c.setAttribute( "fill", "red");
  c.setAttribute( "stroke", "black" );
  c.setAttribute( "xshift", 1 );
  c.setAttribute( "yshift", 1 );
  pic.appendChild( c );


  c.addEventListener("click", function(event){
    event.stopPropagation();
    if (c.getAttribute("fill") == "black"){
      pic.removeChild(c);
      shape(Math.random() * 450 + 25, Math.random() * 450 + 25);
    };
  });
  c.addEventListener("click", function(event){
    event.stopPropagation();
    if (c.getAttribute("fill") == "red"){
      c.setAttribute( "fill", "black" );
    };
  });
};

var atPoint = function(event){
  shape(event.clientX, event.clientY);
};


var intervalID;

var rayshift = function(){
  clearInterval(intervalID);
  var elems = document.getElementsByTagName("circle");
  for (var i=0; i<elems.length; i++) {
    c = elems[i];
    if (c.getAttribute("cx") >= 475){
      c.setAttribute("xshift", -1);
    };
    if (c.getAttribute("cx") <= 25){
      c.setAttribute("xshift", 1);
    };
    if (c.getAttribute("cy") >= 475){
      c.setAttribute("yshift", -1);
    };
    if (c.getAttribute("cy") <= 25){
      c.setAttribute("yshift", 1);
    };

    dx = parseInt(c.getAttribute("xshift"));
    dy = parseInt(c.getAttribute("yshift"));
    c.setAttribute("cx", parseInt(c.getAttribute("cx")) + dx);
    c.setAttribute("cy", parseInt(c.getAttribute("cy")) + dy);
  };
  intervalID = window.setInterval(rayshift, 10);
};

var clear = function() {
  while(pic.childNodes.length > 0)
    pic.removeChild(pic.childNodes[0]);
  clearInterval(intervalID);
};

clr.addEventListener("click", clear);
pic.addEventListener("click", atPoint);
mvr.addEventListener("click", rayshift);

//html tags
//<circle cx="250" cy="250" r="75" fill="yellow"
//stroke="black"/>
//   <rect x="100" y="100" width="300" height="75"
//fill="blue"/>