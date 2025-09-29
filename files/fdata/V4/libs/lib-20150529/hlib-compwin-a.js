// ***********************************
// hlib-compwin-a
// Xwin100
// ***********************************

// =======================================================================
HlibCompWinA = function()
 {
 HlibStdlibA.call(this);

 this.LAYCOMPS = new Array();

//-----
 this.newWindow = function(w0,h0,clofct)
  {
  return(new HlibCompWinA.Window(w0,h0,clofct));
  }

//-----
 this.newManager = function(dtop)
  {
  return(new HlibCompWinA.Manager(dtop));
  }

//-----
 this.newYMsg = function(w0,h0,clofct)
  {
  return(new HlibCompWinA.YMsg(w0,h0,clofct));
  }

//-----
 this.registerLayouter = function(c,lay)
  {
  c["do-layout"] = lay;
  this.LAYCOMPS.push(c);
  return(this);
  }

//-----
 this.layoutElements = function()
  {
  for (var i = 0; i < this.LAYCOMPS.length; i++) this.LAYCOMPS[i]["do-layout"]();
  return(this);
  }

 };

/*
_cl_ = HlibCompWinA;

_funcs_ = {};
_cl_.prototype.funcs = _funcs_;

_comps_ = {};
_cl_.prototype.comps = _comps_;


// =======================================================================
_comps_.Window = function(w0,h0)
 {
*/


// =======================================================================
HlibCompWinA.Window = function(w0,h0,clofct)
 {
 HlibStdlibA.call(this);

 this.P0 = null;
 this.DTIT = null;
 this.DCLO = null;
 this.DF = null;
 this.F = null;
 this.CLOFCT = clofct;
 this.DBLK = null;
 this.NOSEL = null;

// --------------------------------------------------------------
 this.setWaitCursor = function(b)
  {
  if (b == true)
   {
   this.P0.appendChild(this.DBLK);
   }
  else
   {
   if (this.DBLK.parentNode == this.P0) this.P0.removeChild(this.DBLK);
   }
  }

// --------------------------------------------------------------
 this.showResizeCursors = function(evnt)
  {
  HlibCompWinA.showResizeCursors(this.P0,this,evnt);
  };

// --------------------------------------------------------------
 this.appendTo = function(p,x,y)
  {
  this.P0.style.left = ""+x+"px";
  this.P0.style.top = ""+y+"px";
  p.appendChild(this.P0);
  this.doLayout();
  return(this);
  };

// --------------------------------------------------------------
 this.closeClicked = function()
  {
  if (this.CLOFCT) this.CLOFCT(this);
  };

// --------------------------------------------------------------
 this.closeWindow = function()
  {
  this.P0.parentNode.removeChild(this.P0);
  };

// --------------------------------------------------------------
 this.showSelected = function(b)
  {
  if (b == true)
   {
   this.DTIT.style.backgroundColor = "blue";
   this.DTIT.style.color = "white";
   if (this.NOSEL.parentNode == this.P0) this.P0.removeChild(this.NOSEL);
   this.toFront(this.P0);

   try // IE noch nicht getestet
    {
    this.F.focus();
    }
   catch(ex)
    {
    }

   }
  else
   {
   this.DTIT.style.backgroundColor = "#c0c0c0";
   this.DTIT.style.color = "white";
   this.P0.appendChild(this.NOSEL);
   }
  return(this);
  };

// --------------------------------------------------------------
 this.doLayout = function()
  {
  var h0 = this.P0.clientHeight;
  var ht = this.DTIT.clientHeight;
  this.DF.style.top = ""+ht+"px";
  this.DF.style.height = ""+(h0-ht)+"px";

  this.DBLK.style.top = this.DF.style.top;
  this.DBLK.style.height = this.DF.style.height;

  this.NOSEL.style.top = this.DF.style.top;
  this.NOSEL.style.height = this.DF.style.height;
  }

// --------------------------------------------------------------
 this.getTitle = function()
  {
  return(this.DTIT.firstChild.nodeValue);
  };

// --------------------------------------------------------------
 this.setHtml = function(txt)
  {
/*
  this.removeAllChilds(this.DF);
  var f = document.createElement("IFRAME");
  this.F = f;
  f.JSELE = this;

  f.style.position = "absolute";
  f.frameBorder = 0;
  f.scrolling = "no";
  f.style.top = "0px";
  f.style.left = "0px";
  f.style.width = "100%";
  f.style.height = "100%";
  f.style.overflow = "hidden";
  f.style.padding = "0px";
  f.style.margin = "0px";

  this.DF.appendChild(f);

  var doc = this.getChildDocument(f);
*/

  var doc = this.getChildDocument(this.F);

  doc.open();
  doc.write(txt);
  doc.close();

  var s = doc.getElementsByTagName("TITLE")[0].firstChild.nodeValue;
  this.DTIT.firstChild.nodeValue = s;

  return(this);
  };


 this.P0 = document.createElement("DIV");
 var p0 = this.P0;
 p0.JSELE = this;
 p0.style.position = "absolute";
 p0.style.width = ""+w0+"px";
 p0.style.height = ""+h0+"px";
 p0.style.backgroundColor = "#bababa";
 p0.style.color = "black";
 p0.style.borderColor = "#f0f0f0";
 p0.style.borderWidth = "4px";
 p0.style.borderStyle = "ridge"; //outset";
 p0.style.cursor = "default";
 p0["is-resizable-or-movable"] = true;

 this.DCLO = document.createElement("DIV");
 var dclo = this.DCLO;
 dclo.JSELE = this;
 dclo.style.position = "absolute";
 dclo.style.overflow = "hidden";
 dclo.style.right = "2px";
 dclo.style.top = "1px";
 dclo.style.width = "14px";
 dclo.style.height = "13px";
 dclo.style.fontWeight = "bold";
 dclo.style.textAlign = "center";
 dclo.style.fontFamily = "monospace";
 dclo.style.verticalAlign = "middle";
 dclo.style.lineHeight = dclo.style.height; //"100%";
 dclo.style.fontSize = "12px";
 dclo.style.borderStyle = "outset";
 dclo.style.borderWidth = "2px";
 dclo.title = "close";
 dclo.style.cursor = "default";
 dclo.style.backgroundColor = p0.style.backgroundColor;
 dclo.style.color = p0.style.color;

 dclo.appendChild(document.createTextNode("X"));

 this.DTIT = document.createElement("DIV");
 var dtit = this.DTIT;
 dtit.style.position = "absolute";
 dtit.style.overflow = "hidden";
 dtit.style.top = "0px";
 dtit.style.left = "0px";
 dtit.style.width = "100%";
 dtit.style.height = "20px";
 dtit.style.fontWeight = "bold";
 dtit.style.textAlign = "left";
 dtit.style.fontFamily = "arial";
 dtit.style.verticalAlign = "middle";
 dtit.style.lineHeight = dtit.style.height; //"20px"; //10
 dtit.style.fontSize = "12px";
 dtit["can-move"] = true;

 this.DF = document.createElement("DIV");
 var df = this.DF;
 df.style.position = "absolute";
 df.style.overflow = "hidden";
 df.style.top = "20px";
 df.style.left = "0px";
 df.style.width = "100%";
 df.style.height = "20px";

 this.DBLK = document.createElement("DIV");
 var dblk = this.DBLK;
 dblk.style.position = "absolute";
 dblk.style.overflow = "hidden";
 dblk.style.top = "20px";
 dblk.style.left = "0px";
 dblk.style.width = "100%";
 dblk.style.height = "20px";
 dblk.style.cursor = "wait";
 dblk.style.zIndex = 98;

 this.NOSEL = document.createElement("DIV");
 var nosel = this.NOSEL;
 nosel.style.position = "absolute";
 nosel.style.overflow = "hidden";
 nosel.style.top = "20px";
 nosel.style.left = "0px";
 nosel.style.width = "100%";
 nosel.style.height = "20px";
// nosel.style.cursor = "default";
 nosel.style.zIndex = 97;

 dtit.appendChild(document.createTextNode("title"));
 dtit.appendChild(dclo);
 p0.appendChild(dtit);
 p0.appendChild(df);

// new HlibCompWinA.ComponentMover(p0,dtit);

 dclo.onmousedown = function(evnt)
  {
//log("close with click !!!");

  this.JSELE.closeClicked();
  evnt = this.JSELE.getEvent(evnt);
  return(this.JSELE.cancelEvent(evnt));
  }

/*
 p0.setSelected = function(b)
  {
  this.JSELE.setSelected(b);
  };
*/

 p0.onmousemove = function(evnt)
  {
  this.JSELE.showResizeCursors(evnt);
  };
 p0.onmouseover = p0.onmousemove;

 p0["do-layout"] = function()
  {
  this.JSELE.doLayout();
  };




 this.removeAllChilds(this.DF);
 var f = document.createElement("IFRAME");
 this.F = f;
 f.JSELE = this;

 f.style.position = "absolute";
 f.frameBorder = 0;
 f.scrolling = "no";
 f.style.top = "0px";
 f.style.left = "0px";
 f.style.width = "100%";
 f.style.height = "100%";
 f.style.overflow = "hidden";
 f.style.padding = "0px";
 f.style.margin = "0px";

 this.DF.appendChild(f);
 };

// =======================================================================
HlibCompWinA.showResizeCursors = function(comp,stdlib,evnt)
 {
 evnt = stdlib.getEvent(evnt);
 var x = stdlib.getOffsetX(evnt);
 var y = stdlib.getOffsetY(evnt);
 var w = comp.clientWidth;
 var h = comp.clientHeight;

 if (((x < 5) && (y < 15)) || ((x < 15) && (y < 5)))
  {
  comp.style.cursor = "nw-resize";
  return;
  }
 if (((x > (w-5)) && (y < 15)) || ((x > (w-15)) && (y < 5)))
  {
  comp.style.cursor = "ne-resize";
  return;
  }
 if (((x < 5) && (y > (h-15))) || ((x < 15) && (y > (h-5))))
  {
  comp.style.cursor = "sw-resize";
  return;
  }
 if (((x > (w-5)) && (y > (h-15))) || ((x > (w-15)) && (y > (h-5))))
  {
  comp.style.cursor = "se-resize";
  return;
  }

 if (x < 5)
  {
  comp.style.cursor = "w-resize";
  return;
  }
 if (x > (w-5))
  {
  comp.style.cursor = "e-resize";
  return;
  }
 if (y < 5)
  {
  comp.style.cursor = "n-resize";
  return;
  }
 if (y > (h-5))
  {
  comp.style.cursor = "s-resize";
  return;
  }

 comp.style.cursor = "default";
 }



/*
// =======================================================================
HlibCompWinA.ComponentMover = function(ch,clk) // kann evtl. weg ???
 {
 HlibStdlibA.call(this);

 this.CH = ch;
 this.CLK = (clk) ? clk : ch;
 this.X0 = null;
 this.Y0 = null;
 this.X = null;
 this.Y = null;
 this.DU = null;

// -----
 this.start = function(evnt)
  {
  evnt = this.getEvent(evnt);

  this.X0 = this.getLocationX(this.CH);
  this.Y0 = this.getLocationY(this.CH);
  this.X = evnt.screenX;
  this.Y = evnt.screenY;

//log("startX="+this.X+" Y="+this.Y+" X0="+this.X0+" Y0="+this.Y0);
//log(this.getProps(this.CH,true));

  this.CH.parentNode.appendChild(this.DU);
  return(this.cancelEvent(evnt));
  };

// -----
 this.fini = function(evnt)
  {
  this.DU.parentNode.removeChild(this.DU);
  return(this.cancelEvent(evnt));
  };

// -----
 this.move = function(evnt)
  {
  evnt = this.getEvent(evnt);
  var x = evnt.screenX;
  var y = evnt.screenY;
  this.CH.style.left = ""+(this.X0 + x - this.X)+"px";
  this.CH.style.top = ""+(this.Y0 + y - this.Y)+"px";
//log("move.x="+x+" y="+y+" "+this.CH.style.left+" "+this.CH.style.top);
  return(this.cancelEvent(evnt));
  }

 this.CLK.JSELE = this;
 this.CLK.onmousedown = function(evnt)
  {
  return(this.JSELE.start(evnt));
  };

 this.DU = document.createElement("DIV");
 var u = this.DU;
 u.JSELE = this;
 u.style.position = "absolute";
 u.style.top = "0px";
 u.style.left = "0px";
 u.style.width = "100%";
 u.style.height = "100%";

//u.style.backgroundColor = "cyan"; // evtl noch zOrder setzen ???

 u.onmouseup = function(evnt)
  {
  return(this.JSELE.fini(evnt));
  };
 u.onmousedown = u.onmouseup;
 u.onmouseout = u.onmouseup;
 u.onmousemove = function(evnt)
  {
  return(this.JSELE.move(evnt));
  };

 };
*/

// =======================================================================
HlibCompWinA.Manager = function(dtop)
 {
 HlibStdlibA.call(this);

 this.DTOP = dtop;
// this.SELECTED_ELE = null;

// -----
 this.onmousedown = function(evnt)
  {
  evnt = this.getEvent(evnt);
  var src0 = this.getSource(evnt);
  var src = this.setSelected(src0);

//  var src = this.SELECTED_ELE;
  if (src && src["is-resizable-or-movable"])
   {
   new this.Over(src,evnt,src0);
   return(this.cancelEvent(evnt));
   }
  };

/*
// -----
 this.setSelected = function(src)
  {
  if (src == this.DTOP)
   {
   if (this.SELECTED_ELE)
    {
    this.SELECTED_ELE.setSelected(false);
    this.SELECTED_ELE = null;
    }
   return;
   }

  while(true)
   {
   var p = src.parentNode;
   if (p == this.DTOP) break;
   src = p;
   }

  this.toFront(src);
  if (src == this.SELECTED_ELE) return;
  if (this.SELECTED_ELE) this.SELECTED_ELE.setSelected(false);
  this.SELECTED_ELE = null;
  if (!src.setSelected) return;
  src.setSelected(true);
  src.ICON.setSelected(true); mmmmmmmmmmmmm ???????????? 
  this.SELECTED_ELE = src;
  };
*/

// -----
 this.setSelected = function(src)
  {
  if (src == this.DTOP)
   {
   src = null;
   }
  else
   {
   while(true)
    {
    var p = src.parentNode;
    if (p == this.DTOP) break;
    src = p;
    }
   }
  var nl = this.getChildElements(this.DTOP);
  for (var i = 0; i < nl.length; i++)
   {
   var e = nl[i];
   if (e.JSELE && e.JSELE.showSelected)
    {
    e.JSELE.showSelected(src == e);
    if (e.JSELE.ICON && e.JSELE.ICON.showSelected) e.JSELE.ICON.showSelected(src == e);
    }
   }
  return(src);
  };



// ==============================
 this.Over = function(comp,evnt,src0)
  {
  HlibStdlibA.call(this);

  this.COMP = comp;
  this.CAN_MOVE = null;
  this.X0 = null;
  this.Y0 = null;
  this.X = null;
  this.Y = null;
  this.W0 = null;
  this.H0 = null;
  this.TYPE_RESIZE = null;
  this.OVER = document.createElement("DIV");

  var o = this.OVER;
  o.JSELE = this;
  o.style.position = "absolute";
  o.style.top = "0px";
  o.style.left = "0px";
  o.style.width = "100%";
  o.style.height = "100%";
  o.style.zIndex = 99;
//o.style.backgroundColor = "cyan";

  o.onmouseup = function(evnt)
   {
   this.JSELE.onmouseup(evnt);
   };
  o.onmousemove = function(evnt)
   {
   this.JSELE.onmousemove(evnt);
   };
  o.onmouseout = function(evnt)
   {
   this.JSELE.onmouseup(evnt);
   };

  this.X0 = this.getLocationX(comp);
  this.Y0 = this.getLocationY(comp);
  this.X = evnt.screenX;
  this.Y = evnt.screenY;
  this.W0 = 1*(comp.style.width.replace("px",""));
  this.H0 = 1*(comp.style.height.replace("px",""));
  this.CAN_MOVE = src0["can-move"];
  this.TYPE_RESIZE = (comp.style.cursor.indexOf("-") > 0) ? comp.style.cursor : null;
  if (this.TYPE_RESIZE) o.style.cursor = this.TYPE_RESIZE;

  comp.parentNode.appendChild(o);

// -----
  this.onmouseup = function(evnt)
   {
//log("onmouseup");
   this.close();
   };

// -----
  this.onmousemove = function(evnt)
   {
//log("CAN_MOVE="+this.CAN_MOVE+" resize="+this.TYPE_RESIZE+" "+(new Date()).getTime(),true);
   if (this.TYPE_RESIZE != null)
    {
    evnt = this.getEvent(evnt);
    this.resize(evnt.screenX,evnt.screenY);
    return;
    }
   if (this.CAN_MOVE == true)
    {
    evnt = this.getEvent(evnt);
    this.move(evnt.screenX,evnt.screenY);
    return;
    }
   };

// -----
  this.close = function()
   {
   this.OVER.parentNode.removeChild(this.OVER);
   };

// -----
  this.move = function(x,y)
   {
// auf dtop-location < 0 testen if ((x < 0) || (y < 0)) log("x="+x+" y="+y);

   this.COMP.style.left = ""+(this.X0 + x - this.X)+"px";
   this.COMP.style.top = ""+(this.Y0 + y - this.Y)+"px";
//log("move.x="+x+" y="+y+" "+this.CH.style.left+" "+this.CH.style.top);
//  return(this.cancelEvent(evnt));
   };

// -----
  this.resize = function(x,y)
   {
   var c = this.COMP;
   var dx = x - this.X;
   var dy = y - this.Y;

   switch(this.TYPE_RESIZE) //c.style.cursor)
    {
    case "e-resize":
     c.style.width = ""+(this.W0 + dx)+"px";
     break;
    case "s-resize":
     c.style.height = ""+(this.H0 + dy)+"px";
     break;
    case "w-resize":
     c.style.width = ""+(this.W0 - dx)+"px";
     c.style.left = ""+(this.X0 + dx)+"px";
     break;
    case "n-resize":
     c.style.height = ""+(this.H0 - dy)+"px";
     c.style.top = ""+(this.Y0 + dy)+"px";
     break;
    case "nw-resize":
     c.style.height = ""+(this.H0 - dy)+"px";
     c.style.top = ""+(this.Y0 + dy)+"px";
     c.style.width = ""+(this.W0 - dx)+"px";
     c.style.left = ""+(this.X0 + dx)+"px";
     break;
    case "ne-resize":
     c.style.height = ""+(this.H0 - dy)+"px";
     c.style.top = ""+(this.Y0 + dy)+"px";
     c.style.width = ""+(this.W0 + dx)+"px";
     break;
    case "sw-resize":
     c.style.height = ""+(this.H0 + dy)+"px";
     c.style.width = ""+(this.W0 - dx)+"px";
     c.style.left = ""+(this.X0 + dx)+"px";
     break;
    case "se-resize":
     c.style.height = ""+(this.H0 + dy)+"px";
     c.style.width = ""+(this.W0 + dx)+"px";
     break;
    default:
     return;
    }
   if (c["do-layout"]) c["do-layout"]();
   };

  };
// ==============================

 };

// =======================================================================
HlibCompWinA.YMsg = function(wx,hy,clofct)
 {
 HlibStdlibA.call(this);

 this.P0 = null;
 this.P1 = null;
 this.P2 = null;
 this.DCLO = null;

// -----
 this.openIn = function(p)
  {
  this.P0.style.zIndex = 99;
  p.appendChild(this.P0);
  return(this.doLayout());
  };

// -----
 this.close = function()
  {
  var p0 = this.JSELE.P0;
  if (p0.parentNode) p0.parentNode.removeChild(p0);
  this.JSELE.clear();
  };

// -----
 this.clear = function()
  {
  this.removeAllChilds(this.P2);
  };

// -----
 this.log = function(s,clr)
  {
  var p2 = this.P2;
  if (clr == true) this.clear();
  var ss = s.split("\n");
  for (var i = 0; i < ss.length; i++)
   {
   p2.appendChild(document.createTextNode(ss[i]));
   p2.appendChild(document.createElement("br"));
   }
  return(this);
  }

// -----
 this.doLayout = function()
  {
  var w1 = this.P1.clientWidth;
  var o = this.getComponentSize(this.DCLO);
  var dy = o.H+2;
  var dx = w1-o.W-3;
  this.DCLO.style.left = ""+dx+"px";
  this.P2.style.top = ""+dy+"px";
  };


 this.P0 = document.createElement("DIV");
 var p = this.P0;
 p.JSELE = this;
 p.style.position = "absolute";
 p.style.overflow = "hidden";
 p.style.bottom = "5px";
 p.style.right = "5px";
 p.style.width = wx;
 p.style.height = hy;
 p.style.backgroundColor = "#e0e000";
 p.style.color = "black";
 p.style.borderColor = "#f0f0f0";
 p.style.borderWidth = "2px";
 p.style.borderStyle = "solid";

 this.P1 = document.createElement("DIV");
 var p = this.P1;
 p.JSELE = this;
 p.style.position = "absolute";
 p.style.overflow = "scroll";
 p.style.top = "0px";
 p.style.left = "0px";
 p.style.width = "100%";
 p.style.height = "100%";

 this.P2 = document.createElement("DIV");
 var p = this.P2;
 p.JSELE = this;
 p.style.position = "absolute";
 p.style.top = "0px";
 p.style.left = "0px";
// p.style.width = "100%";
// p.style.height = "100%";
 p.style.fontFamily = "monospace";
 p.style.fontSize = "12px";
 p.style.whiteSpace = "nowrap";
 p.style.padding = "8px";

 this.DCLO = document.createElement("DIV");
 var p = this.DCLO;
 p.JSELE = this;
 p.style.position = "absolute";
 p.style.overflow = "hidden";
// p.style.right = "2px";
 p.style.top = "2px";
 p.style.width = "14px";
 p.style.height = "13px";
 p.style.fontWeight = "bold";
 p.style.textAlign = "center";
 p.style.fontFamily = "monospace";
 p.style.verticalAlign = "middle";
 p.style.lineHeight = p.style.height;
 p.style.fontSize = "12px";
 p.style.borderStyle = "outset";
 p.style.borderWidth = "2px";
 p.title = "close";
 p.style.cursor = "default";
 p.style.backgroundColor = "#bababa";
 p.style.color = "black";

 p.appendChild(document.createTextNode("X"));
 p.onclick = clofct ? clofct : this.close;

 this.P1.appendChild(this.P2);
 this.P0.appendChild(this.P1);
 this.P0.appendChild(this.DCLO);
 };

HlibCompWin = HlibCompWinA;



/*
 this.HWW = [ 0 ];
 this.DEFS = defs;
 this.NAMES = new Array();

// --------------------------------------------------------------
 this.addTextCell = function(p,s,hww,defs)
  {
  var myidx = p.childNodes.length;
  var hwwidx = myidx+1;
  var c = this.createElement(document,"DIV","className","abs");
  c.style.whiteSpace = "nowrap";
  if (defs.ALIGN && (defs.ALIGN.length > myidx)) c.style.textAlign = defs.ALIGN[myidx];
  this.setText(c,s);
  p.appendChild(c);
  var w = c.clientWidth;
  var h = c.clientHeight;

  if (h > hww[0]) hww[0] = h;

  if (hww.length <= hwwidx)
   {
   hww.push(w);
   }
  else
   {
   if (w > hww[hwwidx]) hww[hwwidx] = w;
   }
  }

// --------------------------------------------------------------
 this.xstyle = function(r,defs)
  {
  if (defs && defs.style)
   {
   var st = defs.style;
   for (var i = 0; i < st.length-1; i+=2) r.style[st[i]] = st[i+1];
   }
  }

// --------------------------------------------------------------
 this["clear-table"] = function(e0)
  {
  this.removeAllChilds(this.P0);
  this.HWW = [ 0 ];
  this.NAMES = new Array();
  };

// --------------------------------------------------------------
 this["add-row"] = function(e0)
  {
  var p0 = this.P0;
  var defs = this.DEFS;
  var r = this.createElement(document,"DIV","className","abs");
  var r0 = null;
  var hww = null;
  var _defs = null;

  var a = e0.getAttributeNode("row");

  if (!a) // 1.row im block
   {
   r0 = this.createElement(document,"DIV","className","abs white");
   p0.appendChild(r0);
   hww = this.HWW;
   _defs = defs;
   r.ROW_NAME = null;
   }
  else
   {
   var rn = a.nodeValue;
   r0 = p0.lastChild;
   hww = this.HWW[rn];
   if (!hww)
    {
    hww = [ 0 ];
    this.HWW[rn] = hww;
    this.NAMES.push(rn);
    }
   _defs = defs[rn];
   r.ROW_NAME = rn;

   this.xstyle(r,defs[rn]);
   }
  r0.appendChild(r);

  var idx = 0;
  while(true)
   {
   a = e0.getAttributeNode("txt"+(idx++));
   if (!a) break;
   this.addTextCell(r,a.nodeValue,hww,_defs);
   }
  };

// --------------------------------------------------------------
 this["do-layout"] = function(e0)
  {
  var p0 = this.P0;

  var f0 = function() //pseudo element for width create
   {
   var f1 = function(d0,hww,defs,w0,name)
    {
    var i = d0.childNodes.length;
    var d = document.createElement("div");
    d0.appendChild(d);
    if (arguments.length > 4) d0.CC[name] = d;

    var x = 0;
    if ((i > 0) && defs && (defs.LEFT != undefined))
     {
     var s = defs.LEFT;
     if (s.indexOf("px") > 0)
      x = 1*(s.replace("px",""));
     else
      x = 1*d0.firstChild.childNodes[1*s].style.left.replace("px","");
     }
    for (var j = 1; j < hww.length; j++)
     {
     var c = document.createElement("div");
     d.appendChild(c);
     var w = hww[j];
     c.style.left = ""+x+"px";
     c.style.width = ""+w+"px";
     x += w+5;
     }
    d.style.width = ""+x+"px";
    d.style.height = ""+hww[0]+"px";
    if (x > w0) w0 = x;
    return(w0);
    };

   var d0 = document.createElement("div");
   d0.CC = {};
   var hww = this.HWW;
   var defs = this.DEFS;
   var w0 = f1(d0,hww,defs,0);
   for (var i = 0; i < this.NAMES.length; i++)
    {
    var name = this.NAMES[i];
    w0 = f1(d0,hww[name],defs[name],w0,name);
    }
   d0.style.width = ""+w0+"px";
   return(d0);
   };

  var rr0 = p0.childNodes;
  var d0 = f0.call(this);

  var y0 = 0;
  for (var i0 = 0; i0 < rr0.length; i0++)
   {
   var r0 = rr0[i0];
   var rr = r0.childNodes;
   var y = 0;
   for (var i = 0; i < rr.length; i++)
    {
    var r = rr[i];
    var ps = (i == 0) ? d0.firstChild : d0.CC[r.ROW_NAME];
    var psps = ps.childNodes;

    var h = 1*ps.style.height.replace("px","");
    r.style.top = ""+y+"px";
    r.style.height = ps.style.height;
    r.style.lineHeight = r.style.height;
    r.style.verticalAlign = "middle";
    y += h;
    var cc = r.childNodes;
    for (var j = 0; j < cc.length; j++)
     {
     cc[j].style.left = psps[j].style.left;
     cc[j].style.width = psps[j].style.width;
     }
    r.style.width = ps.style.width;
    }
   r0.style.top = ""+y0+"px";
   r0.style.height = ""+y+"px";
   y0 += y+5;
   if (i0 == 0)
    {
    r0.style.width = "100%";
    if (r0.clientWidth > 1*d0.style.width.replace("px","")) d0.style.width = "100%";
    }
   r0.style.width = d0.style.width;
   }
  };


 this.P0 = p0;
 p0.HLIB_DEFINES = {};
 p0.HLIB_DEFINES.JSELE = this;

 this.xstyle(p0,defs);

 p0["do-xml-command"] = function(e,cmd)
  {
  var p = this.HLIB_DEFINES.JSELE;
  if (!cmd) cmd = e.nodeName;
  if (p[cmd])
   {
   p[cmd].call(p,e);
   return(true);
   }
  return(false);
  };
 p0["do-layout"] = function()
  {
  var p = this.HLIB_DEFINES.JSELE;
  p["do-layout"]();
  };
*/



/*
 var f = document.createElement("IFRAME");
 f.style.position = "absolute";
 f.frameBorder = 0;
 f.scrolling = "no";
 f.style.position = "absolute";
 f.style.width = "100%";
 f.style.height = "100%";
 f.style.top = "20px";
 f.style.left = "0px";
 f.style.overflow = "hidden";
 f.style.padding = "0px";
 f.style.margin = "0px";

 f.closeWinid = function()
  {
  var p = this.parentNode;
  p.parentNode.removeChild(p);
  };
*/
// p0.appendChild(f);

/*
 C.getBody().appendChild(d0);

 if (d1.clientWidth != 10)
  {
  d1.style.width = "10px";
  d1.style.height = "10px";
  }
log("cw="+d1.clientWidth);

 d0.IFRAME_COMP = f;
 d0.IFRAME_DIFF = 1*(d0.style.height.replace("px","")) - f.clientHeight;

 var doc = C.getChildDocument(f);

 doc.open();
 doc.write(txt);
 doc.close();

 doc.myAlert = myAlert;
 doc.sendXml = document.sendXml;

 d1.IFRAME_DOC = doc;
// doc.MYWINDOW = f;
 doc.onfocus = geladen.onfocus;

 m.winid = "winid-"+(new Date().getTime())+"-"+(WINID_IDX++);
 m.d0 = d0;
 doc.closeWindow = closeWindow;
 var tit = doc.getElementsByTagName("TITLE")[0];
 tit.XML100 = m;
 var s = tit.firstChild.data;
//alert("s="+s);
 dtit.appendChild(doc.createTextNode(s));

 document.sendXml(C.newDocument("geladen"),doc);

return;

 p0.doResized = function()
  {
  var h0 = 1*(this.style.height.replace("px",""));
  this.IFRAME_COMP.style.height = ""+(h0-this.IFRAME_DIFF-20)+"px";
  }

 p0.onclick = function()
  {
log("onclick");
  C.toFront(this);
  }


 p0.onmousedown = function(evnt)
  {
  C.toFront(this);
  if (this.style.cursor.indexOf("-resize") > 0) return(CC.startComponentResizing(this,evnt));
  return(CC.startComponentMoving(this,evnt));
  }

 p0.onmousemove = function(evnt)
  {
  evnt = C.getEvent(evnt);
//log(C.getProps(evnt,true));
  var x = C.getOffsetX(evnt);
  var y = C.getOffsetY(evnt);
  var w = this.clientWidth;
  var h = this.clientHeight;
  if (x < 5)
   {
   this.style.cursor = "w-resize";
   return;
   }
  if (x > (w-5))
   {
   this.style.cursor = "e-resize";
   return;
   }
  if (y < 5)
   {
   this.style.cursor = "n-resize";
   return;
   }
  if (y > (h-5))
   {
   this.style.cursor = "s-resize";
   return;
   }
  this.style.cursor = "default";

//log("x="+x+" y="+y+" "+new Date());
  }

// C.toFront(d0);
// d0.doResized();
*/


/*
// -----
 this.onmousemove = function(evnt)
  {
//log("CAN_MOVE="+this.CAN_MOVE+" resize="+this.TYPE_RESIZE+" "+(new Date()).getTime(),true);
  if (this.TYPE_RESIZE != null)
   {
   evnt = this.getEvent(evnt);
   this.resize(evnt.screenX,evnt.screenY);
   return;
   }
  if (this.CAN_MOVE == true)
   {
   evnt = this.getEvent(evnt);
   this.move(evnt.screenX,evnt.screenY);
   return;
   }
  };

// -----
 this.move = function(x,y)
  {
// auf dtop-location < 0 testen if ((x < 0) || (y < 0)) log("x="+x+" y="+y);

  this.SELECTED_ELE.style.left = ""+(this.X0 + x - this.X)+"px";
  this.SELECTED_ELE.style.top = ""+(this.Y0 + y - this.Y)+"px";
//log("move.x="+x+" y="+y+" "+this.CH.style.left+" "+this.CH.style.top);
//  return(this.cancelEvent(evnt));
  };


// -----
 this.resize = function(x,y)
  {
  var c = this.SELECTED_ELE;
  var dx = x - this.X;
  var dy = y - this.Y;

  switch(this.TYPE_RESIZE) //c.style.cursor)
   {
   case "e-resize":
    c.style.width = ""+(this.W0 + dx)+"px";
    break;
   case "s-resize":
    c.style.height = ""+(this.H0 + dy)+"px";
    break;
   case "w-resize":
    c.style.width = ""+(this.W0 - dx)+"px";
    c.style.left = ""+(this.X0 + dx)+"px";
    break;
   case "n-resize":
    c.style.height = ""+(this.H0 - dy)+"px";
    c.style.top = ""+(this.Y0 + dy)+"px";
    break;
   case "nw-resize":
    c.style.height = ""+(this.H0 - dy)+"px";
    c.style.top = ""+(this.Y0 + dy)+"px";
    c.style.width = ""+(this.W0 - dx)+"px";
    c.style.left = ""+(this.X0 + dx)+"px";
    break;
   case "ne-resize":
    c.style.height = ""+(this.H0 - dy)+"px";
    c.style.top = ""+(this.Y0 + dy)+"px";
    c.style.width = ""+(this.W0 + dx)+"px";
    break;
   case "sw-resize":
    c.style.height = ""+(this.H0 + dy)+"px";
    c.style.width = ""+(this.W0 - dx)+"px";
    c.style.left = ""+(this.X0 + dx)+"px";
    break;
   case "se-resize":
    c.style.height = ""+(this.H0 + dy)+"px";
    c.style.width = ""+(this.W0 + dx)+"px";
    break;
   default:
    return;
   }
  if (c["do-layout"]) c["do-layout"]();
  };

// -----
 this.removeOver = function()
  {
  if (this.OVER && this.OVER.parentNode) this.OVER.parentNode.removeChild(this.OVER);
  };
*/
