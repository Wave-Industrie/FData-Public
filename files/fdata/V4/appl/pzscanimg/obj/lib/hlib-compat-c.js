// ***********************************
// hlib-compat-b
// gleicht die browserunterschiede aus
// ist z.b superclass von stdlib
// class-name wird am ende NICHT genullt
// ***********************************

// =======================================================================
HlibCompatB = function()
 {

//------------------------------------------------------------------------
 this.getEvent = function(e)
  {
  if (e) return(e);
  return(window.event);
  }

//------------------------------------------------------------------------
 this.cancelEvent = function(evnt)
  {
//  if (evnt.stopPropagation) evnt.stopPropagation(); //geht nicht (ff)
//  if (evnt.preventBubble) evnt.preventBubble(true); //geht nicht (ff)
  evnt.cancelBubble = true;
  evnt.returnValue = false;
  return(false);
  }

//------------------------------------------------------------------------
 this.getSource = function(e)
  {
  e = this.getEvent(e);
  var s = e.srcElement;
  if (!s) s = e.target;
  return(s);
  }

//------------------------------------------------------------------------
 this.getKeyCode = function(e)
  {
  var kc = e.which;
  if (!kc) kc = e.keyCode;
  return(kc);
  }

//------------------------------------------------------------------------
 this.getButton = function(e) // ie noch machen
  {
  var kc = e.which;
//  if (!kc) kc = e.keyCode;
  return(kc);
  }


//------------------------------------------------------------------------
 this.getOffsetX = function(e) // vom mouse event
  {
  var x = e.layerX;
  if (!x) x = e.offsetX;
  return(x);
  }

//------------------------------------------------------------------------
 this.getOffsetY = function(e) // vom mouse event
  {
  var y = e.layerY;
  if (!y) y = e.offsetY;
  return(y);
  }

//------------------------------------------------------------------------
 this.getEventXYonBody = function(evnt) // vom mouse event IE noch machen
  {
  evnt = this.getEvent(evnt);
/*
  var x = evnt.clientX;
  var y = evnt.clientY;
  var src = evnt.currentTarget;
  var o = this.getLocationOnBody(src);
  o.X = x;
  o.Y = y;
  return(o);
*/
  var o = {};
  o.X = evnt.clientX;
  o.Y = evnt.clientY;
  return(o);
  }

//------------------------------------------------------------------------
 this.getLocationX = function(c) // vom component für IE noch machen
  {
  return(c.offsetLeft);
  }
//------------------------------------------------------------------------
 this.getLocationY = function(c)
  {
  return(c.offsetTop);
  }

//------------------------------------------------------------------------
 this.getChildDocument = function(f)
  {
  if (f.contentDocument) return(f.contentDocument);
  return(f.contentWindow.document);
  }

//--------------------------------------------------------------------
 this.toFront = function(e)
  {
  e.style.zIndex = "2";
  var e1 = e;
  while(e1.previousSibling)
   {
   e1 = e1.previousSibling;
   if (e1.style) e1.style.zIndex = "1";
   }
  e1 = e;
  while(e1.nextSibling)
   {
   e1 = e1.nextSibling;
   if (e1.style) e1.style.zIndex = "1";
   }
  return(this);
  }

//--------------------------------------------------------------------
 this.popUp = function(e)
  {
  e.style.zIndex = 0;
  var zi = 0;
  var cc = e.parentNode.childNodes;
  for (var i = 0; i < cc.length; i++)
   {
   var c = cc[i];
   if (c.style && c.style.zIndex) zi = Math.max(zi,c.style.zIndex);
   }
  e.style.zIndex = zi+1;
  };

//------------------------------------------------------------------------
 this.getWindowSize = function()
  {
  var w = window.innerWidth;
  var h = window.innerHeight;
  if (!h)
   {
   var b = document.body;
   var w = b.clientWidth-b.leftMargin-b.rightMargin;
   var h = b.clientHeight-b.topMargin-b.bottomMargin;
   }
  var o = {};
  o.W = 0+w;
  o.H = 0+h;
  return(o);
  }

//------------------------------------------------------------------------
 this.getComponentSize = function(c) // mit border für IE noch machen
  {
  var w = c.offsetWidth;
  var h = c.offsetHeight;
  var o = {};
  o.W = 0+w;
  o.H = 0+h;
  return(o);
  }

//------------------------------------------------------------------------
 this.getBorderSize = function(c) // mit border für IE noch machen
  {
  var w = c.offsetWidth-c.clientWidth;
  var h = c.offsetHeight-c.clientHeight;
  var o = {};
  o.W = 0+w;
  o.H = 0+h;
  return(o);
  }

/*
//------------------------------------------------------------------------
 this.getLocationOnScreen = function(c) // geht nicht
  {
  var x = this.getLocationX(c);
  var y = this.getLocationY(c);
  while(true)
   {
   var p = c.parentNode;
   if (p == document) break;
//   if (p == this.getBody()) break;
   x += this.getLocationX(p);
   y += this.getLocationY(p);
   c = p;
   }

var o = this.getBody().getBoundingClientRect();
log("o="+o);
//log(this.getProps(this.getBody().parentNode,true));
log(this.getProps(o,true));

  var dx = window.outerWidth-window.innerWidth;
  var dy = window.outerHeight-window.innerHeight;

  x += window.screenX; //+dx;
  y += window.screenY+dy;
  var o = {};
  o.X = 0+x;
  o.Y = 0+y;
  return(o);
  }
*/

//------------------------------------------------------------------------
 this.getLocationOnBody = function(c)
  {
  var bdy = this.getBody();
  var o = {};
  o.X = 0;
  o.Y = 0;
  while(c != bdy)
   {
   o.X += this.getLocationX(c);
   o.Y += this.getLocationY(c);
   c = c.parentNode;
   }
  return(o);
  }

//------------------------------------------------------------------------
 this.disableMouse = function(c)
  {
  var f = function(evnt)
   {
//log("disableMouse: mouse.type="+evnt.type+" w="+evnt.which+" b="+evnt.button+" "+evnt.cancelBubble+" "+evnt.UUU);

   var l = HlibCompatB.disableMouse3;
   evnt = l.getEvent(evnt);
   var src = l.getSource(evnt);
   while(src)
    {
    if (src["disable-os-mouse-handler"] == true) return(l.cancelEvent(evnt));
    src = src.parentNode;
    }
   };

  for (var i = 0; i < arguments.length; i++) arguments[i]["disable-os-mouse-handler"] = true;

  var c = document;
  c.onmousedown = f;
  c.onmouseup = f;
  c.onclick = f;
  c.ondblclick = f;

  HlibCompatB.disableMouse3 = this;
  return(this);
  };

//------------------------------------
 this.newXMLHttpRequest = function()
  {
  if (typeof XMLHttpRequest == "function") return(new XMLHttpRequest());
  if (typeof XMLHttpRequest == "object") return(new XMLHttpRequest()); // safari
  if (typeof ActiveXObject == "function")
   {
   try
    {
    return(new ActiveXObject("Msxml2.XMLHTTP"));
    }
   catch(e)
    {
    alert("e0="+e);
    }
   try
    {
    return(new ActiveXObject("Microsoft.XMLHTTP"));
    }
   catch(e)
    {
    alert("e1="+e);
    }
   }
  return(null);
  }

//------------------------------------------------------------------------
 this.newDocument = function(name)
  {
  if (!name) var name = "doc";
//  var s = '<?xml version="1.0" encoding="UTF-8" standalone="no"?><'+name+'/>';
  var s = '<?xml version="1.0"?><'+name+'/>';
  var doc = null;

  if (window.DOMParser)
   {
   var p = new DOMParser();
   doc = p.parseFromString(s,"text/xml");
   }
  else
   {
   var p = new ActiveXObject("Microsoft.XMLDOM");
   p.async = false;
   p.loadXML(s);
   doc = p;
   }
  var e0 = doc.lastChild;
  for (var i = 1; i < arguments.length-1; i+=2) e0.setAttribute(arguments[i],arguments[i+1]);
  return(doc);
  };

//------------------------------------------------------------------------
 this.canCookie = function()
  {
  return(navigator.cookieEnabled);
  };

//------------------------------------------------------------------------
 this.setCookie = function(path,name,value,ms)
  {
  var s = null;
  switch(arguments.length)
   {
   case 2:
    s = name+"="+value+"; expires="+new Date(0).toUTCString()+"; path="+path;
    break;
   case 3:
    s = name+"="+value+"; expires="+new Date(new Date().getTime()+1000*60*60*24*365*30).toUTCString()+"; path="+path; // 30 jahre
    break;
   case 4:
    s = name+"="+value+"; expires="+new Date(ms).toUTCString()+"; path="+path;
    break;
   default:
    return(false);
   }
  document.cookie = s;
  return(true);
  };

//------------------------------------------------------------------------
 this.getCookie = function()
  {
  return(this.canCookie() ? document.cookie : null);
  };

 }
HlibCompat = HlibCompatB;

