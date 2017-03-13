var pic = document.getElementById("vimage");
var clr = document.getElementById("clear");
var mvr = document.getElementById("move");

var fract = document.createElementNS("http://www.w3.org/2000/svg",
 "line");
fract.setAttribute("x1", 250);
fract.setAttribute("y1", 0);
fract.setAttribute("x2", 250);
fract.setAttribute("y1", 500);

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
  return c;
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
    if (c.getAttribute("cx") >= (475)){
      c.setAttribute("xshift", -1);
    };
    if (c.getAttribute("cx") <= 25){
      c.setAttribute("xshift", 1);
    };
    if (c.getAttribute("cy") >= (475)){
      c.setAttribute("yshift", -1);
    };
    if (c.getAttribute("cy") <= 25){
      c.setAttribute("yshift", 1);
    };

    dx = parseInt(c.getAttribute("xshift"));
    dy = parseInt(c.getAttribute("yshift"));
    c.setAttribute("cx", parseInt(c.getAttribute("cx")) + dx);
    c.setAttribute("cy", parseInt(c.getAttribute("cy")) + dy);

    if (Math.abs(c.getAttribute("cx") - 250) < 1){
      c.setAttribute("r", c.getAttribute("r")/2);
      var ghost = shape(c.getAttribute("cx"), c.getAttribute("cy"));
      ghost.setAttribute("xshift", c.getAttribute("xshift") * -1);
      ghost.setAttribute("yshift", c.getAttribute("yshift"));
      ghost.setAttribute("r", c.getAttribute("r"));
      ghost.setAttribute("fill", c.getAttribute("fill"));
    };
    if (c.getAttribute("r") <= 2) pic.removeChild(c);
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
