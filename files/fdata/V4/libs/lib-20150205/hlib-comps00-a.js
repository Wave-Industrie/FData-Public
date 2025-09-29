// ***********************************
// hlib-comps00-a
// Table2
// ***********************************

// =======================================================================
HlibComps00A = function()
 {
 HlibStdlibA.call(this);

 this.LAYCOMPS = new Array();

//-----
 this.I = function(i)
  {
  return(1*(new Number(i).toFixed()));
  };

//-----
 this.newTable2 = function(d0,appl_defines)
  {
  return(new this.comps.Table2(d0,appl_defines));
  };

//-----
 this.newTextTable = function(d0,defs)
  {
  return(new this.comps.TextTable(d0,defs));
  };

//-----
 this.newPopup = function(x,y,origin,evntfct)
  {
  return(new HlibComps00A.Popup(x,y,origin,evntfct));
  };

//-----
 this.newEventPopup = function(evnt,origin,evntfct)
  {
  evnt = this.getEvent(evnt);
  var x = this.getOffsetX(evnt);
  var y = this.getOffsetY(evnt);
  var src = this.getSource(evnt);
  var o = this.getLocationOnBody(src);
  x += o.X;
  y += o.Y;
  return(new HlibComps00A.Popup(x,y,origin,evntfct));
  };

//-----
 this.keyInputString = function(evnt)
  {
  var k = this.keyInputString;
  if (k.S == undefined) k.S = "";
// e = l6.getEvent(e);
  var kc = this.getKeyCode(evnt);
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
  };

//-----
 this.underlineInput = function(p)
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
  return(this);
  }

//-----
 this.doCenter = function(c)
  {
  if (arguments.length == 0) c = this;
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
  return(this);
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

//-----
 this.installElement = function(defs,e0)
  {
/*
  var lay = function()
   {
   frank_hlib_06.doCenter(this);
   };
*/

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

  if ((e0.className.indexOf("CLICK") >= 0) && (defs.onclick)) e0.onclick = defs.onclick;
  if ((e0.className.indexOf("CHANGE") >= 0) && (defs.onchange)) e0.onchange = defs.onchange;
  if (e0.className.indexOf("jt3") >= 0)
   {
   this.newTable2(e0,defs.ID[e0.id]);
   return;
   }
  if (e0.className.indexOf("jttxt") >= 0)
   {
   this.newTextTable(e0,defs.ID[e0.id]);
   return;
   }

  if (e0.className.indexOf("buti") >= 0)
   {
   if (defs.buttonOnclick) e0.onclick = defs.buttonOnclick;
   e0.onmouseover = function()
    {
    this.style.color = "blue";
    };
   e0.onmouseout = function()
    {
    this.style.color = "black";
    };
   }

  if (e0.className.indexOf("d01") == 0) return(this.registerLayouter(e0,this.doCenter));
  if (e0.className.indexOf("fillY") >= 0) return(this.registerLayouter(e0,layFillY));

  if (e0.nodeName == "BUTTON")
   {
   if (defs.buttonOnclick) e0.onclick = defs.buttonOnclick;
//e0.style.lineHeight = "100%";
//e0.style.verticalAlign = "middle";
   if (e0.className.indexOf("jbv2") >= 0)
    {
    var t = this.getChildNode(e0,"#text");
    if (t)
     {
     var d = document.createElement("DIV");
     this.setStyle(d,"borderWidth","0px","position","absolute","top","0px","left","0px","width","100%","height","100%","verticalAlign","middle","textAlign","center");
     d.appendChild(t);
     e0.appendChild(d);
     d.style.lineHeight = ""+d.clientHeight+"px";
//log(this.getProps(d,true));
     }
    }
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

   var aa = defs.ID[e0.id].OPTION;
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
   this.underlineInput(e0);
   return;
   }

  };


 };

_cl_ = HlibComps00A;

_funcs_ = {};
_cl_.prototype.funcs = _funcs_;

_comps_ = {};
_cl_.prototype.comps = _comps_;

// =======================================================================
_comps_.Table2 = function(p0,appl_defines)
 {
 HlibStdlibA.call(this);

 this.SELECTED_TR = null;
 this.L = null;

//------------------------------------------------------------------------
 this.setSelectionListener = function(l)
  {
  this.L = l;
  return(this);
  };

//------------------------------------------------------------------------
 this.clearTable = function()
  {
  this.setSelected(null);
  var bd = this.P0.getElementsByTagName("TBODY")[0];
  while(bd.firstChild) bd.removeChild(bd.firstChild);
  }
 this["clear-table"] = this.clearTable;

//------------------------------------------------------------------------
 this.addRow = function(e) // to-do
  {
  var cc = this.P0.getElementsByTagName("COL");
  var cg = cc[0].parentNode;
  var h = cg.style.height;
  var tr = document.createElement("tr");
  tr.DATA_ELEMENT = e;
  for (var i = 0; i < cc.length; i++)
   {
   var s = e.getAttribute("txt"+i);
   if (!s) s = "";
   var td = document.createElement("td");
//???  td.onclick = frank_es4hlib_01.onSelect2;
   td.style.height = h;
   td.style.textAlign = cc[i].style.textAlign;

td.style.paddingRight = cc[i].style.paddingRight;
td.style.paddingLeft = cc[i].style.paddingLeft;

   td.style.overflow = cc[i].style.overflow;
   td.style.whiteSpace = cc[i].style.whiteSpace;
   td.style.lineHeight = cg.style.lineHeight;
   var tx = document.createTextNode(s);
   td.appendChild(tx);
   tr.appendChild(td);
   }

//  this.P0.getElementsByTagName("TBODY")[0].appendChild(tr);

  var tb = this.P0.getElementsByTagName("TBODY")[0];
  var n = tb.getElementsByTagName("TR").length;
  tr.style.backgroundColor = (n & 1) ? "#f0f0f0" : "white";
  tb.appendChild(tr);

  return(tr);
  }
 this["add-row"] = this.addRow;

//------------------------------------------------------------------------
 this.getSelectedData2 = function(e0)
  {
  var aa = new Array();
  var tr = this.SELECTED_TR;
  if (tr)
   {
   var de = tr.DATA_ELEMENT;
   if (de) aa = de.attributes;
   }
  var e = this.getParent(e0,"#document").createElement(this.P0.id);
  for (var i = 0; i < aa.length; i++) e.setAttribute(aa[i].nodeName,aa[i].nodeValue);
  e0.appendChild(e);
  }
 this["seldata"] = this.getSelectedData2;

//------------------------------------------------------------------------
 this.doLayout = function(changeParentHeight)
  {
  var dd = this.P0.getElementsByTagName("TBODY");
  if (dd.length != 1) return;
  var jt = dd[0].parentNode;
  var dy = 1*((""+jt.cellSpacing).replace("px",""));
  var p11 = jt.parentNode;
  var p0 = p11.parentNode;
  var dd = p0.getElementsByTagName("DIV");
  if (dd.length < 2) return;
  var p10 = dd[0];
  var h0 = p0.clientHeight;
  var h10 = p10.clientHeight;
  var hjt = jt.clientHeight;

  p10.style.left = "0px";
  p11.style.left = "0px";
  p10.style.top = ""+dy+"px";
  p11.style.top = ""+(dy+h10+1)+"px";
  p10.style.width = "100%";
  p11.style.width = "100%";

  if (changeParentHeight == true)
   p11.style.height = ""+hjt+"px";
  else
   p11.style.height = ""+(h0-dy-h10-1)+"px";

  var tt = p10.getElementsByTagName("DIV");
  for (var i = 0; i < tt.length; i++)
   {
   tt[i].style.lineHeight = ""+p10.clientHeight+"px";
   tt[i].style.verticalAlign = "middle";
   tt[i].style.textAlign = "center";
   }

  var trtr = jt.getElementsByTagName("TR");
  if (trtr.length > 0)
   {
   var dd = trtr[0].getElementsByTagName("TD");
   for (var i = 0; i < dd.length; i++)
    {
    var o = dd[i];
    tt[i].style.left = ""+o.offsetLeft+"px";
    tt[i].style.width = ""+o.clientWidth+"px";
    }
   for (var i = 0; i < trtr.length; i++)
    {
    var tr = trtr[i];
    tr.style.backgroundColor = (i & 1) ? "#f0f0f0" : "white";
    if (tr.parentNode.SELROW === tr) tr.style.backgroundColor = "cyan";
    }
   jt.__LAYOUT_DONE = "ja";
   return;
   }

  if (jt.__LAYOUT_DONE == "ja") return;

  var cc = jt.getElementsByTagName("COL");
  var nx = 0;
  var aa = new Array();
  for (var i = 0; i < cc.length; i++)
   {
   var s = cc[i].style.width;
   if (!s) s = "0px";
   s = 1*(s.replace("px",""));
   aa.push(s);
   nx += s;
   }
  var w = 1*(new Number(p10.clientWidth-nx-cc.length*2-2).toFixed());
  var x = 2;
  for (var i = 0; i < cc.length; i++)
   {
   var w1 = aa[i];
   if (w1 == 0) w1 = w;
   tt[i].style.left = ""+x+"px";
   tt[i].style.width = ""+w1+"px";
   x += w1+2;
   }
  };

//------------------------------------------------------------------------
 this.colorRows = function()
  {
  var p0 = this.P0;
  var trtr = p0.getElementsByTagName("TR");
  for (var i = 0; i < trtr.length; i++)
   {
   var tr = trtr[i];
   tr.style.backgroundColor = (i & 1) ? "#f0f0f0" : "white";
//   if (tr.parentNode.SELROW === tr) tr.style.backgroundColor = "cyan";
   }
  };

//------------------------------------------------------------------------
 this.setSelected = function(tr,isClear)
  {
  if (tr == null)
   {
   this.colorRows();
   this.SELECTED_TR = null;
   return;
   }
  if (isClear)
   {
   if (tr == this.SELECTED_TR)
    {
    this.colorRows();
    this.SELECTED_TR = null;
    }
   return;
   }
  this.colorRows();
  this.SELECTED_TR = tr;
  tr.style.backgroundColor = "cyan";
  };

//------------------------------------------------------------------------
 this.onRowClicked = function(evnt)
  {
  if (this.L) this.L(evnt);
  };

 this.P0 = p0;
 p0.HLIB_DEFINES = {};
 p0.HLIB_DEFINES.JSELE = this;

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
  }

 var d0h = 16;
 var fh = 1*(new Number(d0h*0.7).toFixed());
 this.removeAllChilds(p0);
 this.decoreColor(p0,"#d0d0d0","black");
 var d0 = document.createElement("div");
 var d1 = document.createElement("div");
 var jt = this.createElement(document,"table","cellSpacing","2px","cellPadding","0px");
 this.setStyle(d0,"position","absolute","height",""+d0h+"px","fontSize",""+fh+"px","fontFamily","arial","fontWeight","bold").setStyle(d1,"position","absolute","overflowY","scroll").setStyle(jt,"width","100%","fontSize",""+fh+"px","fontFamily","arial","fontWeight","normal","tableLayout","fixed");
 d1.appendChild(jt);
 var cg = document.createElement("colgroup");
 cg.style.height = ""+d0h+"px";
 cg.style.lineHeight = cg.style.height;
 jt.appendChild(cg);
 var b = document.createElement("tbody");
 b.onclick = function(evnt)
  {
  var p0 = this.parentNode.parentNode.parentNode.HLIB_DEFINES.JSELE;
  evnt = p0.getEvent(evnt);
  var src = p0.getSource(evnt);
  if (src.nodeName != "TR")
   {
   src = src.parentNode;
   if (src.nodeName != "TR") return;
   }
  p0.setSelected(src,evnt.ctrlKey);
  if (!evnt.ctrlKey) p0.onRowClicked(evnt);
  };

 jt.appendChild(b);

// var tt = APPL_DEFINES.ID[p0.id].TITLE;
// var ww = APPL_DEFINES.ID[p0.id].WIDTH;
// var gn = APPL_DEFINES.ID[p0.id].ALIGN;

 var tt = appl_defines.TITLE;
 var ww = appl_defines.WIDTH;
 var gn = appl_defines.ALIGN;

 for (var i = 0; i < tt.length; i++)
  {
  var d = document.createElement("div");
  this.setStyle(d,"position","absolute","top","0px","height","100%","backgroundColor","#f0f0f0","overflow","hidden");
  var t = document.createTextNode(tt[i]);
  d.appendChild(t);
  d0.appendChild(d);
  var c = document.createElement("col");
  c.style.overflow = "hidden";
  c.style.whiteSpace = "nowrap";
  c.style.textAlign = "center";
  var w = 1*ww[i];
  if (w > 0) c.style.width = ""+w+"px";
  if (gn)
   {
   c.style.textAlign = gn[i];
   c.style.paddingRight = "2px";
   c.style.paddingLeft = "2px";
   }
  cg.appendChild(c);
  }


/*
 p0.doScrollBar = function(dy,src)
  {
  var jt = this.getElementsByTagName("TABLE")[0];
  var p1 = jt.parentNode;
  var h = jt.clientHeight;
  var h0 = p1.clientHeight;
  var yy = 1*(new Number(h*dy-h0/2).toFixed());
  if ((yy+h0) > h) yy = h-h0;
  if (yy < 0) yy = 0;
  p1.scrollTop = yy;
  }
 var e4l= frank_es4hlib_01;
 p0.clearTable = e4l.clearTable2;
 p0.addRow = e4l.addRow2;
 p0.doLayout = e4l.doLayout2;
 p0.setTableCell = e4l.setTableCell;
 p0.setSelected = e4l.setSelected2;
 p0.seldata = e4l.getSelectedData2;
 p0.getSelectedRow = e4l.getSelectedRow2;
*/
 p0.appendChild(d0);
 p0.appendChild(d1);

// return(p0);

  {
  var nn = p0.getElementsByTagName("COL").length;
  var aa = new Array("a");
  for (var i = 0; i < nn; i++) aa.push("txt"+i,""+i);
  var e = this.newDocument.apply(null,aa).lastChild;
  this.addRow(e);
  this.doLayout();
  this.clearTable();

//  this.addRow(e);
//  this.addRow(e);
//  this.addRow(e);
//  this.addRow(e);
//  this.addRow(e);

//  this.colorRows();
  }

 };

// =======================================================================
_comps_.TextTable = function(p0,defs)
 {
 HlibStdlibA.call(this);

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

 };



// =========================================================================
HlibComps00A.Popup = function(x,y,origin,evntfct)
 {
 HlibStdlib.call(this);

 var bdy = this.getBody();
// var o = this.getLocationOnScreen(bdy);

//log("x="+x+" y="+y+" o.X="+o.X+" o.Y="+o.Y);

 this.X = x; //-o.X;
 this.Y = y; //-o.Y;
 this.ORIGIN = origin;
 this.EVNTFCT = evntfct;

 this.P0 = null;
 this.P1 = null;
 this.W1 = 0;
 this.H1 = 0;

// -----
 this.itemClicked = function(evnt)
  {
  evnt = this.getEvent(evnt);
  var src = this.getSource(evnt);
  if (src.IS_ITEM == true) this.EVNTFCT(evnt);
  this.P0.parentNode.removeChild(this.P0);
  };

// -----
 this.neu = function(name,s)
  {
  var cc = this.P1.childNodes;
  var idx = cc.length;
  
  var d = document.createElement("div");
  d.onmouseover = function()
   {
   this.style.backgroundColor = "blue";
   this.style.color = "white";
   };
  d.onmouseout = function()
   {
   this.style.backgroundColor = "#d0d0d0"; //"#bababa";
   this.style.color = "black";
   };

  d.id = "popup-item-"+name;
  d.IS_ITEM = true;
  d.style.position = "absolute";
  d.style.top = ""+this.H1+"px";
  d.style.left = "0px";
  d.style.whiteSpace = "nowrap";
//  d.style.backgroundColor = "#d0d0d0"; //"#bababa";
//  d.style.color = "black";
  d.style.paddingTop = "3px";
  d.style.paddingBottom = "3px";
  d.style.paddingLeft = "5px";
  d.onmouseout();

  d.appendChild(document.createTextNode(s));
  this.P1.appendChild(d);

  var w = d.clientWidth+20;
  if (w > this.W1) this.W1 = w;
  this.H1 += d.clientHeight;
  return(this);
  };

// -----
 this.show = function()
  {
  var d1 = this.P1;
  var x = this.X;
  var y = this.Y;
  var origin = this.ORIGIN;
  var w1 = this.W1;
  var h1 = this.H1;

  var o = this.getBorderSize(d1);

  d1.style.width = ""+(w1+o.W)+"px";
  d1.style.height = ""+h1+"px";

  var cc = d1.childNodes;
  for (var i = 0; i < cc.length; i++) cc[i].style.width = ""+w1+"px";

  var o = this.getComponentSize(d1);
  w1 = o.W;
  h1 = o.H;

  switch(origin)
   {
   case "or":
    x = x-w1;
    break;
   case "ul":
    y = y-h1;
    break;
   case "ur":
    x = x-w1;
    y = y-h1;
    break;
   default:
    break;
   }

  d1.style.top = ""+y+"px";
  d1.style.left = ""+x+"px";

  return(this);
  };

 var d0 = document.createElement("div");
 this.P0 = d0;
 d0.JSELE = this;
 d0.style.position = "absolute";
 d0.style.width = "100%";
 d0.style.height = "100%";
 d0.style.zIndex = 99;
 d0.onclick = function(evnt)
  {
  this.JSELE.itemClicked(evnt);
  };
 this.disableMouse(d0);

 var d1 = document.createElement("div");
 this.P1 = d1;
 d1.JSELE = this;
 d1.style.position = "absolute";
 d1.style.borderStyle = "outset"; // "ridge";

 d1.style.width = "100%";
 d1.style.height = "100%";



 d0.appendChild(d1);
 bdy.appendChild(d0);
 };



/*

//------------------------------------------------------------------------
_funcs_.setSelected2 = function(tr)
 {
 var o = {};
 o.P = this;
 o.f = function(alt,neu)
  {
  if (alt === neu) return;
  var p = this.P;
  if (!p.L) return;
  if (typeof p.L.rowSelected == "function") p.L.rowSelected(neu,p);
  }

 var bdy = this.getElementsByTagName("TBODY")[0];
 if (!bdy) return;

 var c = bdy.SELROW;
 if (c)
  {
  c.style.backgroundColor = c.SELCOL;
  c.SELCOL = null;
  }
 bdy.SELROW = null;

 if (arguments.length == 0) return(o.f(c,null));
 if (!tr) return(o.f(c,null));
 if (!(tr.parentNode === bdy)) return;

 tr.SELCOL = tr.style.backgroundColor;
 tr.style.backgroundColor = "cyan";
 bdy.SELROW = tr;
 o.f(c,tr);
 }

//------------------------------------------------------------------------
_funcs_.onSelect2 = function(evnt)
 {
 var l6 = this.HLIB_DEFINES.STDLIB;
 evnt = l6.getEvent(evnt);
 var src = l6.getSource(evnt);
 var tr = src.parentNode;

 var p = tr.parentNode.parentNode;
 if ((evnt.ctrlKey) && (tr.parentNode.SELROW === tr)) tr = null;
 if (p.setSelected === frank_es4hlib_01.setSelected2) return(p.setSelected(tr));
 p = p.parentNode;
 if (p.setSelected === frank_es4hlib_01.setSelected2) return(p.setSelected(tr));
 p = p.parentNode;
 if (p.setSelected === frank_es4hlib_01.setSelected2) return(p.setSelected(tr));
 }

//------------------------------------------------------------------------
_funcs_.doScrollBar2 = function(dy,src)
 {
 var p = this;
 if (p.nodeName == "TEXTAREA")
  {
  var h0 = p.clientHeight;
  var h = p.scrollHeight;
  

  var yy = 1*(new Number(h*dy-h0/2).toFixed());
  if ((yy+h0) > h) yy = h-h0;
  if (yy < 0) yy = 0;
  p.scrollTop = yy;
  return;
  }
 var p1 = p.parentNode;
 var h = p.clientHeight;
 var h0 = p1.clientHeight;
 var yy = 1*(new Number(h*dy-h0/2).toFixed());
 if ((yy+h0) > h) yy = h-h0;
 if (yy < 0) yy = 0;
 p1.scrollTop = yy;
 }


// --------------------------------------------------------------
frank_es4hlib_01.appendTable2 = function(e,p)
 {
 var n = e.getAttribute("x"); if (n != null) p.style.left = ""+n+"px";
 var n = e.getAttribute("y"); if (n != null) p.style.top = ""+n+"px";
 var n = e.getAttribute("w"); if (n != null) p.style.width = ""+n+"px";
 var n = e.getAttribute("h"); if (n != null) p.style.height = ""+n+"px";

 var cc = e.getElementsByTagName("col");
 var aa = new Array();
 aa.push(p);
 for (var i = 0; i < cc.length; i++)
  {
  var c = cc[i];
  aa.push(c.getAttribute("text"));
  aa.push(Math.floor(c.getAttribute("w")));
  }
 frank_es4hlib_01.createTable2.apply(this,aa);
 }
this["table-02"] = frank_es4hlib_01.appendTable2;

//------------------------------------------------------------------------
frank_es4hlib_01.getSelectedData2 = function(e0)
 {
 var bdy = this.getElementsByTagName("TBODY")[0];
 if (!bdy) return;
 var aa = new Array();
 var tr = bdy.SELROW;
 if (tr)
  {
  var de = tr.DATA_ELEMENT;
  if (de) aa = de.attributes;
  }
 var l6 = frank_hlib_lookup("hlib-06");
 var e = l6.getParent(e0,"#document").createElement(this.id);
 for (var i = 0; i < aa.length; i++) e.setAttribute(aa[i].nodeName,aa[i].nodeValue);
 e0.appendChild(e);
 }
//------------------------------------------------------------------------
frank_es4hlib_01.getSelectedRow2 = function()
 {
 var bdy = this.getElementsByTagName("TBODY")[0];
 if (!bdy) return(null);
 var tr = bdy.SELROW;
 return((tr) ? tr : null);
 }

//------------------------------------------------------------------------
frank_es4hlib_01.clearTable = function(e)
 {
 var tb = this.getElementsByTagName("TABLE")[0];
 var bd = tb.getElementsByTagName("TBODY")[0];
 if (!bd) return;
 if (!bd["first-row-skeleton"])
  {
  var trtr = bd.getElementsByTagName("TR");
  if (trtr.length > 0)
   {
   trtr[0]["old-bcolor-enabled"] = true;
   bd["first-row-skeleton"] = trtr[0];
   }
  }
 while(bd.firstChild) bd.removeChild(bd.firstChild);
 bd.SELROW = null;
 var l6 = frank_hlib_lookup("hlib-06");
 var p = l6.getParent(bd,"DIV").parentNode;
 if (p.onSelect) p.onSelect(bd.SELROW);
 }

//------------------------------------------------------------------------
frank_es4hlib_01.addRow = function(e)
 {
 var tb = this.getElementsByTagName("TABLE")[0];
 var bd = tb.getElementsByTagName("TBODY")[0];
 if (!bd) return;
 var tr = bd["first-row-skeleton"];
 if (!tr) return;

 var ena = tr["old-bcolor-enabled"];
 var onc = tr.onclick;
 tr = tr.cloneNode(true);
 if (ena == true) tr["old-bcolor-enabled"] = ena;
 if (onc) tr.onclick = onc;

 var trtr = bd.getElementsByTagName("TR");
 if ((trtr.length & 1) == 1) tr.style.backgroundColor = "white";
 var ndnd = tr.getElementsByTagName("TD");
 for (var i = 0; i < ndnd.length; i++)
  {
  var s = e.getAttribute("txt"+i);
  var txt = ndnd[i].firstChild;
  if (!txt)
   {
   txt = doc.createTextNode("");
   ndnd[i].appendChild(txt);
   }
  txt.nodeValue = s;
  }
 tr.DATA_ELEMENT = e;
 bd.appendChild(tr);
 }


//------------------------------------------------------------------------
frank_es4hlib_01.setTableCell = function(e)
 {
 var l6 = frank_hlib_lookup("hlib-06");
 var row = e.getAttribute("row");
 var col = e.getAttribute("col");
 var trtr = this.getElementsByTagName("TR");
 if (row < trtr.length)
  {
  var tdtd = trtr[row].getElementsByTagName("TD");
  if (col < tdtd.length) l6.setText(tdtd[col],e.getAttribute("text"));
  }
 }

//------------------------------------------------------------------------
frank_es4hlib_01.doLayout = function()
 {
 var tt = this.getElementsByTagName("DIV");
 var e = this.getElementsByTagName("TR")[0];
 if (!e) return; // to-do set default width
 var dd = e.getElementsByTagName("TD");
 var x = 2;
 for (var i = 0; i < dd.length; i++)
  {
  var w = 1*dd[i].clientWidth;
  tt[i].style.left = ""+x+"px";
  tt[i].style.width = ""+w+"px";
  x += w+2;
  }
 }

//------------------------------------------------------------------------
frank_es4hlib_01.onSelect = function(evnt)
 {
 var ena = function(c,b)
  {
  if (b == true)
   {
   c.SELCOL = c.style.backgroundColor;
   c.style.backgroundColor = "cyan";
   return;
   }
  c.style.backgroundColor = c.SELCOL;
  c.SELCOL = null;
  };

 var l6 = frank_hlib_lookup("hlib-06");
 evnt = l6.getEvent(evnt);
 var src = l6.getSource(evnt);

 src = l6.getParent(src,"TR");

 var bdy = src.parentNode;
 var sel = bdy.SELROW;
 if (sel) ena(sel,false);
 bdy.SELROW = null;
 if (!evnt.ctrlKey)
  {
  ena(src,true);
  bdy.SELROW = src;
  }
 var p = l6.getParent(bdy,"DIV").parentNode;
 if (p.onSelect) p.onSelect(bdy.SELROW);
 }

//------------------------------------------------------------------------
frank_es4hlib_01.newScrollTable = function(id,x0,y0,w0,h0,ht,htf,hr,hrf,sbr)
 {
 var l6 = frank_hlib_lookup("hlib-06");
 var p0 = document.createElement("div");
 if (id) p0.id = id;
 l6.setStyle(p0,"position","absolute","backgroundColor","#f0f0f0","top",""+y0+"px","left",""+x0+"px","width",""+w0+"px","height",""+h0+"px","overflow",(sbr > 0) ? "hidden" : "visible");
 var p1 = document.createElement("div");
 l6.setStyle(p1,"position","absolute","backgroundColor","white","top",""+ht+"px","left","0px","width",""+(w0-sbr)+"px","height",""+(h0-ht)+"px","overflow",(sbr > 0) ? "scroll" : "visible");
 var jt = document.createElement("div");
 l6.setStyle(jt,"position","absolute","backgroundColor","#d0d0d0","top","0px","left","0px","width","2px","height","100%");
 p1.appendChild(jt);
 var jt = document.createElement("table");
 l6.setAttribute(jt,"cellSpacing","2px","cellPadding","0px");
 l6.setStyle(jt,"backgroundColor","#d0d0d0","whiteSpace","nowrap","position","absolute","top","0px","left","0px","width","100%","tableLayout","fixed","mozUserSelect","none","overflowX","hidden","overflowY",(sbr > 0) ? "hidden" : "visible");
 var bd = document.createElement("tbody");
 jt.appendChild(bd);
 var tr = document.createElement("tr");
 tr.onclick = frank_es4hlib_01.onSelect;
 l6.setStyle(tr,"whiteSpace","nowrap","backgroundColor","#f0f0f0","width","100%","height",""+hr+"px");
 bd.appendChild(tr);

 var x = 0;
 for (var i = 10; i < arguments.length; i+=2)
  {
  var w = 1*arguments[i+1];
  var tit = document.createElement("div");
  var txt = document.createTextNode(arguments[i]);
  tit.appendChild(txt);
  l6.setStyle(tit,"position","absolute","top","0px","left",""+x+"px","width",""+w+"px","height",""+ht+"px","overflow","hidden","lineHeight",""+ht+"px","verticalAlign","middle","fontFamily","arial","fontSize",""+htf+"px","textAlign","center");
  x += w;
  p0.appendChild(tit);

  var td = document.createElement("td");
  l6.setStyle(td,"whiteSpace","nowrap","overflow","hidden","textAlign","center","fontFamily","arial","fontSize",""+hrf+"px","lineHeight","20px");
  if (w > 0) l6.setStyle(td,"width",""+w+"px");

  var tx = document.createTextNode(".");
  td.appendChild(tx);
  tr.appendChild(td);
  }

 p1.appendChild(jt);
 p0.appendChild(p1);

/ *
 p0.setTextSelectable = function(b)
  {
  var tdtd = this.getElementsByTagName("TD");
  for (var i = 0; i < tdtd.length; i++) tdtd[i].unselectable = (b) ? "off" : "on";
  }
* /

 p0.doScrollBar = function(dy,src)
  {
  var jt = this.getElementsByTagName("TABLE")[0];
  var p1 = jt.parentNode;
  var h = jt.clientHeight;
  var h0 = p1.clientHeight;
  var yy = 1*(new Number(h*dy-h0/2).toFixed());
  if ((yy+h0) > h) yy = h-h0;
  if (yy < 0) yy = 0;
  p1.scrollTop = yy;
  }

 if (sbr > 0)
  {
  var bal = frank_es4hlib_01.newScrollYYY(null,w0-sbr,ht,sbr,h0-ht,p0);
  p0.appendChild(bal);
  }

 p0.clearTable = frank_es4hlib_01.clearTable;
 p0.addRow = frank_es4hlib_01.addRow;
 p0.setTableCell = frank_es4hlib_01.setTableCell;
 p0.doLayout = frank_es4hlib_01.doLayout;
 p0.getSelectedRow = function()
  {
  return(this.getElementsByTagName("TBODY")[0].SELROW);
  }

if (sbr == 0)
 {
 p0.style.height = "auto";
 p1.style.height = "auto";
 p0.style.width = "100%";
 p1.style.width = "100%";
 }

 return(p0);
 }

//------------------------------------------------------------------------
frank_es4hlib_01.newScrollYYY = function(id,x0,y0,w0,h0,l)
 {
 var l6 = frank_hlib_lookup("hlib-06");
 var p0 = document.createElement("div");
 p0.L = l;
 if (id) p0.id = id;
 l6.setStyle(p0,"position","absolute","backgroundColor","#e0e0e0","top",""+y0+"px","left",""+x0+"px","width",""+w0+"px","height",""+h0+"px");

 var __scrollOn = function(evnt)
  {
  var l6 = frank_hlib_lookup("hlib-06");
  var src = l6.getSource(evnt);
  src.ENA = "ja";
  }
 var __scrollOff = function(evnt)
  {
  var l6 = frank_hlib_lookup("hlib-06");
  var src = l6.getSource(evnt);
  src.ENA = "nein";
  }
 var __doScroll = function(evnt)
  {
  var l6 = frank_hlib_lookup("hlib-06");
  evnt = l6.getEvent(evnt);
  var src = l6.getSource(evnt);
  var l = src.L;
  if (!l) return;
  if (!l.doScrollBar) return;
  if (src.ENA != "ja") return;
  var y = l6.getOffsetY(evnt);
  var h = src.clientHeight;
  var dy = y/h;
  l.doScrollBar(dy,src);
  }


 p0.onmousemove = __doScroll;
 p0.onmousedown = __scrollOn;
 p0.onmouseup   = __scrollOff;
 p0.onmouseout  = __scrollOff;

 return(p0);
 }

//--------------------------------------------------------------------
frank_es4hlib_01.newButton = function(id,top,left,bottom,right,width,height,text,l)
 {
 var l6 = frank_hlib_lookup("hlib-06");
 var p0 = document.createElement("button");
// p0.type = "button"; // nach self-html setzen, aber IE -> exception ???
 if (l) p0.onclick = l;
 if (id) p0.id = id;
p0.style.lineHeight = ""+height+"px";
p0.style.verticalAlign = "middle";
 l6.decoreSize(p0,top,left,bottom,right,width,height).setText(p0,text);
 return(p0);
 }

//--------------------------------------------------------------------
frank_es4hlib_01.newSoftKey10 = function(id,top,left,bottom,right,width,height,title,titleh,nmbh,l)
 {
 var evf = function(evnt)
  {
  var l6 = frank_hlib_lookup("hlib-06");
  var jb = l6.getSource(evnt);
  var s = jb.value;
  var p0 = jb.parentNode;
  var txt = p0.firstChild.firstChild;
  switch(s)
   {
   case "clr":
    txt.nodeValue = "0";
    break;
   case "ret":
    if ((p0.L) && (p0.L.skEntered)) p0.L.skEntered(txt.nodeValue,p0);
    break;
   default:
    s = txt.nodeValue + s;
    txt.nodeValue = new Number(s).toFixed();
    break;
   }
  };
 var clrf = function(title,nmb) // oder skClear(e)
  {
  if (arguments.length == 1)
   {
   nmb = title.getAttribute("nmb");
   title = title.getAttribute("title");
   }
  if (nmb != null) this.firstChild.firstChild.nodeValue = nmb;
  if (title != null) this.firstChild.nextSibling.firstChild.nodeValue = title;
  };

 var l6 = frank_hlib_lookup("hlib-06");
 var p0 = document.createElement("div");
 p0.L = l;
 if (id) p0.id = id;
 l6.decoreSize(p0,top,left,bottom,right,width,height).decoreColor(p0,"#b0b0b0","black");

 var pn = document.createElement("div");
 l6.decoreSize(pn,1,1,null,null,width-2,nmbh).decoreColor(pn,"blue","white").decoreText(pn,"monospace","bold",new Number((nmbh*0.8)).toFixed(),"center").setText(pn,"0");
 p0.appendChild(pn);

 var pt = document.createElement("div");
 l6.decoreSize(pt,null,1,1,null,width-2,titleh).decoreColor(pt,"#f0f0f0","black").decoreText(pt,"arial",null,new Number((titleh*0.8)).toFixed(),"center").setText(pt,title);
 p0.appendChild(pt);

 var bw = 1*(new Number((width-40)/3).toFixed());
 var bh = 1*(new Number((height-50-titleh-nmbh)/4).toFixed());
 var aa = new Array("7","8","9","4","5","6","1","2","3","clr","0","ret");
 var x = 10;
 var y = 10+nmbh;

 for (var i = 0; i < 12; i++)
  {
  var jb = frank_es4hlib_01.newButton(null,y,x,null,null,bw,bh,aa[i],evf);
  jb.value = aa[i];
  p0.appendChild(jb);
  x += bw+10;
  if ((i == 2) || (i == 5) || (i == 8))
   {
   x = 10;
   y += bh+10;
   }
  }

// var p0 = document.createElement("button");
// p0.type = "button"; // nach self-html setzen, aber IE -> exception ???
 p0.skClear = clrf;
 return(p0);
 }


//--------------------------------------------------------------------
frank_es4hlib_01.newPageWorker = function()
 {
 var p0 = document.createElement("div");
 p0.doScrollBar = frank_es4hlib_01.doScrollBar2;
 p0.style.position = "absolute";
 p0.style.overflow = "hidden";
 p0.FNT = "monospace";
 p0.FNT_S = "normal";
 p0.FNT_W = "normal";
 p0.FNT_H = "12px";
 p0.DIV_H = "18px";
 p0.SCALE = 1;
 p0.FC = "black";

 p0["clear"] = function(e0)
  {
  while(this.firstChild) this.removeChild(this.firstChild);
  }

 p0["set-font"] = function(e0)
  {
  this.FNT = e0.getAttribute("font");
  var t = e0.getAttribute("typ");
  switch(t)
   {
   case "1":
    this.FNT_S = "normal";
    this.FNT_W = "bold";
    break;
   case "2":
    this.FNT_S = "italic";
    this.FNT_W = "bold";
    break;
   default:
    this.FNT_S = "normal";
    this.FNT_W = "normal";
   }
  var h = this.SCALE*e0.getAttribute("size");
  this.FNT_H = ""+frank_es4hlib_01.I(h)+"px";
  this.DIV_H = ""+frank_es4hlib_01.I(h*1.5)+"px";
  }

 p0["paint-string"] = function(e0)
  {
  var w0 = this.clientWidth;
  var p = document.createElement("div");
  p.style.position = "absolute";
  p.style.overflow = "hidden";

  var s = e0.getAttribute("text");
  var x = frank_es4hlib_01.I(this.SCALE*e0.getAttribute("x"));
  var y = frank_es4hlib_01.I(this.SCALE*e0.getAttribute("y"));
  var ax = e0.getAttribute("ax");
//  var ay = e0.getAttribute("ay");
  switch(ax)
   {
   case "1":
    if (x <= w0/2)
     {
     p.style.width = ""+(2*x)+"px";
     p.style.left = "0px";
     }
    else
     {
     p.style.width = ""+(2*(w0-x))+"px";
     p.style.right = "0px";
     }
    p.style.textAlign = "center";
    break;
   case "2":
    p.style.width = ""+x+"px";
    p.style.left = "0px";
    p.style.textAlign = "right";
    break;
   default:
    p.style.width = ""+(w0-x)+"px";
    p.style.left = ""+x+"px";
    p.style.textAlign = "left";
    break;
   }
  p.style.top = ""+y+"px";
  p.style.height = this.DIV_H;
  p.style.lineHeight = p.style.height;
  p.style.verticalAlign = "middle";
  p.style.fontFamily = this.FNT;
  p.style.fontStyle = this.FNT_S;
  p.style.fontWeight = this.FNT_W;
  p.style.fontSize = this.FNT_H;
  var t = document.createTextNode(s);
  p.appendChild(t);
p.style.borderWidth = "0px";
p.style.borderStyle = "solid";
p.style.borderColor = "red";
  this.appendChild(p);
  }

 p0["paint-line"] = function(e0)
  {
  var x = frank_es4hlib_01.I(this.SCALE*e0.getAttribute("x"));
  var y = frank_es4hlib_01.I(this.SCALE*e0.getAttribute("y"));
  var w = frank_es4hlib_01.I(this.SCALE*e0.getAttribute("w"));
  var h = frank_es4hlib_01.I(this.SCALE*e0.getAttribute("h"));
  if (w == 0) w = 1;
  if (h == 0) h = 1;

//status = "x="+x+" y="+y+" w="+w+" h="+h;

  var p = document.createElement("div");
  p.style.position = "absolute";
  p.style.overflow = "hidden";
  p.style.top = ""+y+"px";
  p.style.left = ""+x+"px";
  p.style.width = ""+w+"px";
  p.style.height = ""+h+"px";
  p.style.backgroundColor = this.FC;
  this.appendChild(p);
  }

 return(p0);
 }

//------------------------------------------------------------------------
frank_es4hlib_01.installElement = function(p0)
 {
 var l6 = frank_hlib_lookup("hlib-06");
 if (p0.className.indexOf("jt3") == 0)
  {
  var tt = APPL_DEFINES.ID[p0.id].TITLE;
  var ww = APPL_DEFINES.ID[p0.id].WIDTH;
  var gn = APPL_DEFINES.ID[p0.id].ALIGN;
  var aa = new Array(p0);
  for (var i = 0; i < tt.length; i++) aa.push(tt[i],ww[i]);
  var jt = frank_es4hlib_01.createTable2.apply(this,aa);
  if (gn)
   {
   var cc = jt.getElementsByTagName("COL");
   for (var i = 0; i < cc.length; i++)
    {
    cc[i].style.textAlign = gn[i];
    cc[i].style.paddingRight = "2px";
    cc[i].style.paddingLeft = "2px";
    }
   }
  l6.registerLayouter(jt,jt.doLayout);
  }
 }

//--------------------------------------------------------------------
frank_es4hlib_01.lookup = function(name)
 {
 if (name == "es4hlib-01") return(frank_es4hlib_01);
 return(frank_es4hlib_01.lookup.lookup(name));
 }

//--------------------------------------------------------------------
frank_es4hlib_01.lookup.lookup = function(name)
 {
 return(null);
 }

if (this["frank_hlib_lookup"]) frank_es4hlib_01.lookup.lookup = this["frank_hlib_lookup"];
this["frank_hlib_lookup"] = frank_es4hlib_01.lookup;

if (!this["frank_hlib_libpool"]) frank_hlib_libpool = new Array();
frank_hlib_libpool.push(frank_es4hlib_01);
*/


HlibComps00 = HlibComps00A;

