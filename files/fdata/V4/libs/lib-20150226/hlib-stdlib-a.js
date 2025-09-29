// ***********************************
// hlib-stdlib-a
// extends HlibCompatB (mit echtem versionsnamen HlibCompatB - nicht nur mit HlibCompat)
// bietet allgemeine funktionen auch für html-objekte
// class-name wird am ende NICHT genullt
// ***********************************

/*
// =======================================================================
SLOG = {};
SLOG.log = function(s)
 {
 if (document.SLOG && document.SLOG.log)
  {
  var aa = new Array();
  for (var i = 0; i < arguments.length; i++) aa.push(arguments[i]);
  document.SLOG.log.apply(document.SLOG,aa);
  return;
  }
 alert(""+s);
 }
// =======================================================================
*/

// =======================================================================
HlibStdlibA = function()
 {
 HlibCompatB.call(this);

//------------------------------------------------------------------------
 this.getProps = function(e,nl)
  {
  var s = "";
  for (var p in e)
   {
   try
    {
    s += (nl == true) ? p+"="+e[p]+"\n" : " "+p+"="+e[p];
    }
   catch(ex)
    {
    s += (nl == true) ? "ex="+ex+"\n" : " ex="+ex;
    }
   }
  return(s);
  }

//------------------------------------------------------------------------
 this.searchProperty = function(e,n)
  {
  var s = "";
  for (var p in e)
   {
   try
    {
    if (p.toLowerCase().indexOf(n) >= 0) return(p);
    }
   catch(ex)
    {
    }
   }
  return(null);
  }

//------------------------------------------------------------------------
 this.newElement = function(doc,name)
  {
  var e = doc.createElement(name);
  for (var i = 2; i < arguments.length-1; i+=2)
   {
   var k = arguments[i];
   if (!k) continue;
   var v = arguments[i+1];
   if (!v) continue;
   e.setAttribute(k,v);
   }
  return(e);
  }

//------------------------------------------------------------------------
 this.createElement = function(doc,name) // wie setProperties
  {
  var p = doc.createElement(name);
  for (var i = 2; i < arguments.length-1; i+=2) p[arguments[i]] = arguments[i+1];
  return(p);
  }

//------------------------------------------------------------------------
 this.getParent = function(p,tag_id)
  {
  while(p)
   {
   if (p.id == tag_id) return(p);
   if (p.nodeName == tag_id) return(p);
   p = p.parentNode;
   }
  return(null);
  }

//------------------------------------------------------------------------
 this.getChildNode = function(p,tag_id)
  {
  var nl = p.childNodes;
  for (var i = 0; i < nl.length; i++)
   {
   if (nl[i].id == tag_id) return(nl[i]);
   if (nl[i].nodeName == tag_id) return(nl[i]);
   }
  return(null);
  }

//------------------------------------------------------------------------
 this.getChildElements = function(p)
  {
  var nl = p.childNodes;
  var aa = new Array();
  for (var i = 0; i < nl.length; i++)
   {
   if (nl[i].nodeName != "#text") aa.push(nl[i]);
   }
  return(aa);
  }

//------------------------------------------------------------------------
 this.removeAllChilds = function(p)
  {
  while(p.lastChild) p.removeChild(p.lastChild);
  return(this);
  }

//------------------------------------------------------------------------
 this.removeTextChilds = function(p)
  {
  var tt = new Array();
  var nl = p.childNodes;
  for (var i = 0; i < nl.length; i++)
   {
   if (nl[i].nodeName == "#text") tt.push(nl[i]);
   }
  for (var i = 0; i < tt.length; i++) p.removeChild(tt[i]);
  return(this);
  }

//------------------------------------------------------------------------
 this.getBody = function()
  {
  return(document.getElementsByTagName("BODY")[0]);
  }

//------------------------------------------------------------------------
 this.setStyle = function(p)
  {
  for (var i = 1; i < arguments.length-1; i+=2) p.style[arguments[i]] = arguments[i+1];
  return(this);
  }

//------------------------------------------------------------------------
 this.setProperty = function(p)
  {
  for (var i = 1; i < arguments.length-1; i+=2) p[arguments[i]] = arguments[i+1];
  return(this);
  }

//------------------------------------------------------------------------
 this.decoreColor = function(p,bg,fg)
  {
  if (bg != null) p.style.backgroundColor = bg;
  if (fg != null) p.style.color = fg;
  return(this);
  }

//------------------------------------------------------------------------
 this.setText = function(p,s)
  {
  if (!s) s = "";
  var c = p.firstChild;
  while(c)
   {
   if (c.nodeName == "#text")
    {
    c.nodeValue = s;
    return(this);
    }
   c = c.nextSibling;
   }
  var t = document.createTextNode(s);
  p.appendChild(t);
  return(this);
  }

//------------------------------------------------------------------------
 this.getAllElements = function(e0,aa)
  {
  if (arguments.length == 0)
   {
   var aa = new Array();
   this.getAllElements(this.getBody(),aa);
   return(aa);
   }
  if (e0.nodeName == "#text") return(aa);
  aa.push(e0);
  var ee = e0.childNodes;
  for (var i = 0; i < ee.length; i++) this.getAllElements(ee[i],aa);
  return(aa);
  }

//------------------------------------------------------------------------
 this.geladen = function(defs,lib)
  {
  var ee = this.getAllElements();
  for (var i = 1; i < arguments.length; i++)
   {
   lib = arguments[i];
   if (lib.installElement)
    {
    for (var j = 0; j < ee.length; j++) lib.installElement(defs,ee[j]);
    }
   if (lib.setup)
    {
    lib.setup(defs,ee);
    }
   }
  }

//------------------------------------------------------------------------
 this.doLayout = function(lib)
  {
  for (var i = 0; i < arguments.length; i++)
   {
   lib = arguments[i];
   if (lib.layoutElements) lib.layoutElements();
   }
  }









/*
//-------------------------------------------------------
frank_hlib_06.scanData = function(e0)
 {
 if (typeof e0 == "string") // set scan data
  {
  this.S = e0;
  return;
  }
 if (typeof e0 == "function") // define the this
  {
  this.FCT = e0;
  return;
  }
 if (e0.nodeName)  // nach dem cr
  {
  e0.setAttribute("scanData",this.S);
  this.S = "";
  return;
  }
 if (this.S == undefined) this.S = ""; // nach dem key-press
 var l6 = frank_hlib_lookup("hlib-06");
 var e = l6.getEvent(e0);
 var kc = l6.getKeyCode(e);
 if (kc >= 32)
  {
  this.S += String.fromCharCode(kc);
  return;
  }
 if (kc == 13)
  {
  this.FCT(e0);
  return;
  }
 if (kc == 27)
  {
  this.FCT(e0);
  return;
  }
 }

//------------------------------------------------------------------------
frank_hlib_06.newPseudoEvent = function(id,typ)
 {
 var src = {};
 src.id = id;
 var e = {};
 e.target = src;
 e.type = typ;
 return(e);
 }

//------------------------------------------------------------------------
frank_hlib_06.keyInputString = function(e)
 {
 var l6 = frank_hlib_06;
 var k = l6.keyInputString;
 if (k.S == undefined) k.S = "";
 e = l6.getEvent(e);
 var kc = l6.getKeyCode(e);
 if (kc >= 32)
  {
  k.S += String.fromCharCode(kc);
  return(null);
  }
 if (kc == 13)
  {
  var s = k.S;
  k.S = "";
  return(s);
  }
 }

//-------------------------------------------------------
frank_hlib_06.scanReceived = function(evnt,f27,scanele)
 {
 var l6 = frank_hlib_06;
 if (l6.getKeyCode(evnt) == 27) return(f27(evnt));

 var bcr = l6.keyInputString(evnt);
 if (bcr == null) return;
 document.getElementById(scanele).setScanData(bcr);
 var src = {};
 src.id = scanele;
 var evnt = {};
 evnt.target = src;
 evnt.type = "scandata";
 f27(evnt);
 }

//------------------------------------------------------------------------
frank_hlib_06.createScanEvent = function(evnt)
 {
 var l6 = frank_hlib_06;
 evnt = l6.getEvent(evnt);
 if (l6.getKeyCode(evnt) == 27) return(evnt);
 var bcr = l6.keyInputString(evnt);
 if (bcr == null) return(null);
// ele.SCAN_DATA = bcr;
 var src = {};
 src.id = "scanner";
 var e = {};
 e.target = src;
 e.type = "scandata";
 e.scanString = bcr;
 return(e);
 }

//------------------------------------------------------------------------
frank_hlib_06.createElement = function(doc,name)
 {
 var e = doc.createElement(name);
 for (var i = 2; i < arguments.length-1; i+=2) e[arguments[i]] = arguments[i+1];
 return(e);
 }
//--------------------------------------------------------------------
frank_hlib_06.doCenter = function(c)
 {
 var p = c.parentNode;
 var w0 = p.clientWidth;
 var h0 = p.clientHeight;
 var w = c.clientWidth;
 var h = c.clientHeight;
 var x = (w0-w) / 2;
 x = (x < 0) ? 0 : new Number(x).toFixed();
 var y = (h0-h) / 2;
 y = (y < 0) ? 0 : new Number(y).toFixed();
 c.style.top = ""+y+"px";
 c.style.left = ""+x+"px";
 return(frank_hlib_06);
 }

//--------------------------------------------------------------------
frank_hlib_06.underlineInput = function(p)
 {
 var f = function(e0)
  {
  var l = document.createElement("div");
  l.style.position = "absolute";
  l.style.overflow = "hidden";
  l.style.top    = ""+(e0.clientHeight+e0.offsetTop)+"px";
  l.style.height = "1px";
  l.style.left   = e0.style.left;
  l.style.width  = e0.style.width;
  l.style.backgroundColor = "black";
  e0.parentNode.appendChild(l);
  };

 if (!p) p = document;
 if (p.nodeName == "INPUT")
  {
  f(p);
  }
 else
  {
  var nl = p.getElementsByTagName("INPUT");
  for (var i = 0; i < nl.length; i++)
   {
   var e0 = nl[i];
   if (e0.type != "text") continue;
   f(e0);
   }
  }
 return(frank_hlib_06);
 }

//--------------------------------------------------------------------
frank_hlib_06.centerImage = function()
 {
 var p1 = this.parentNode;
 var p0 = p1.parentNode;
 var w0 = p0.clientWidth;
 var h0 = p0.clientHeight;

 var w = this.width;
 var h = this.height;
 var fw = w0/w;
 var fh = h0/h;
 if (fw > fh) fw = fh;
 var w1 = 1*(new Number(w*fw).toFixed());
 var h1 = 1*(new Number(h*fw).toFixed());
 var dx = 1*(new Number((w0-w1)/2).toFixed());
 var dy = 1*(new Number((h0-h1)/2).toFixed());

//log("w0="+w0+" h0="+h0+" w="+w+" h="+h+" w1="+w1+" h1="+h1+" dx="+dx+" dy="+dy+" "+evnt.type);

 p1.style.position = "absolute";
 p1.style.top = ""+dy+"px";
 p1.style.left = ""+dx+"px";
 p1.style.width = ""+w1+"px";
 p1.style.height = ""+h1+"px";

//      this.style.width = ""+w1+"px";
//      this.style.height = ""+h1+"px";

 this.width = w1;
 this.height = h1;
 }



//------------------------------------------------------------------------
frank_hlib_06.decoreSize = function(p,top,left,bottom,right,width,height)
 {
 p.style.position = "absolute";
 p.style.overflow = "hidden";
 if (top != null) p.style.top = ""+top+"px";
 if (left != null) p.style.left = ""+left+"px";
 if (bottom != null) p.style.bottom = ""+bottom+"px";
 if (right != null) p.style.right = ""+right+"px";
 if (width != null) p.style.width = ""+width+"px";
 if (height != null) p.style.height = ""+height+"px";
 return(frank_hlib_06);
 }

//------------------------------------------------------------------------
frank_hlib_06.decoreText = function(p,fontFamily,fontWeight,fontSize,textAlign)
 {
 p.style.lineHeight = p.style.height;
 p.style.verticalAlign = "middle";
 if (fontFamily != null) p.style.fontFamily = fontFamily;
 if (fontWeight != null) p.style.fontWeight = fontWeight;
 if (fontSize != null) p.style.fontSize = ""+fontSize+"px";
 if (textAlign != null) p.style.textAlign = textAlign;
 return(frank_hlib_06);
 }



//------------------------------------------------------------------------
frank_hlib_06.installElements = function()
 {
 var f = function(f,e0)
  {
  if (e0.nodeName == "#text") return;
  for (var i = 0; i < frank_hlib_libpool.length; i++)
   {
   var l = frank_hlib_libpool[i];
   if (typeof l["installElement"] == "function") l.installElement(e0);
   }
  var cc = e0.childNodes;
  for (var i = 0; i < cc.length; i++) f(f,cc[i]);
  };

 f(f,document.getElementsByTagName("BODY")[0]);
 }

//------------------------------------------------------------------------
frank_hlib_06.installElement = function(e0)
 {
 var lay = function()
  {
  frank_hlib_06.doCenter(this);
  };
 var layFillY = function()
  {
  var p = this.parentNode;
  var h0 = p.clientHeight;
  var h = h0;
  var cc = p.childNodes;
  for (var i = 0; i < cc.length; i++)
   {
   var e = cc[i];
   if (e.nodeName == "#text") continue;
   if (e == this) continue;
   h -= e.clientHeight;
   }
  this.style.height = ""+h+"px";
  };

 if ((e0.className.indexOf("CLICK") >= 0) && (typeof APPL_DEFINES == "object") && (APPL_DEFINES.onclick)) e0.onclick = APPL_DEFINES.onclick;
 if ((e0.className.indexOf("CHANGE") >= 0) && (typeof APPL_DEFINES == "object") && (APPL_DEFINES.onchange)) e0.onchange = APPL_DEFINES.onchange;

 if (e0.className.indexOf("d01") == 0) return(frank_hlib_06.registerLayouter(e0,lay));
 if (e0.className.indexOf("fillY") >= 0) return(frank_hlib_06.registerLayouter(e0,layFillY));
 if (e0.nodeName == "BUTTON")
  {
  if ((typeof APPL_DEFINES == "object") && (APPL_DEFINES.buttonOnclick))
   {
   e0.onclick = APPL_DEFINES.buttonOnclick;
   return;
   }

// if (!e0.onclick) e0.onclick = document.getElementsByTagName("BODY")[0].onkeydown;

  return;
  }
 if (e0.nodeName == "SELECT")
  {
  var f = function(e)
   {
   e.setAttribute(this.id,encodeURIComponent(this.value));
   }
  e0.seldata = f;

  var f = function(e)
   {
   var k = e.getAttribute("key");
   var v = e.getAttribute("value");
   if (k)
    {
    var o = document.createElement("option");
    var t = document.createTextNode(v);
    o.value = k;
    o.appendChild(t);
    this.appendChild(o);
    }
   }
  e0.setEntry = f;

  var f = function(e)
   {
   var nl = this.childNodes;
   var aa = new Array();
   for (var i = 0; i < nl.length; i++) aa.push(nl[i]);
   for (var i = 0; i < aa.length; i++)
    {
    var c = aa[i];
    if (c.nodeName == "OPTION") this.removeChild(c);
    }
   }
  e0.clear = f;

  var aa = APPL_DEFINES.ID[e0.id].OPTION;
  for (var i = 0; i < aa.length-1; i+=2)
   {
   var o = document.createElement("option");
   var t = document.createTextNode(aa[i]);
   o.value = aa[i+1];
   o.appendChild(t);
   e0.appendChild(o);
   }
  return;
  }
 if (e0.nodeName == "INPUT")
  {
  frank_hlib_06.underlineInput(e0);
  return;
  }

 }

//------------------------------------------------------------------------
frank_hlib_06.registerLayouter = function(e0,lay)
 {
 e0["do-layout"] = lay;
 frank_hlib_06.registerLayouter.CC.push(e0);
//alert("registered="+e0.className);
 }
frank_hlib_06.registerLayouter.CC = new Array();

//------------------------------------------------------------------------
frank_hlib_06.doLayout = function()
 {
 for (var i = 0; i < frank_hlib_06.registerLayouter.CC.length; i++)
  {
  var e = frank_hlib_06.registerLayouter.CC[i];
  e["do-layout"]();
//alert("layouted="+e.className);
  }
 }

//--------------------------------------------------------------------
frank_hlib_06.lookup = function(name)
 {
 if (name == "hlib-06") return(frank_hlib_06);
 return(frank_hlib_06.lookup.lookup(name));
 }

//--------------------------------------------------------------------
frank_hlib_06.lookup.lookup = function(name)
 {
 return(null);
 }

if (this["frank_hlib_lookup"]) frank_hlib_06.lookup.lookup = this["frank_hlib_lookup"];
this["frank_hlib_lookup"] = frank_hlib_06.lookup;

if (!this["frank_hlib_libpool"]) frank_hlib_libpool = new Array();
frank_hlib_libpool.push(frank_hlib_06);
//if (this["geladen"]) this["geladen"]();
*/

 };

HlibStdlib = HlibStdlibA;

