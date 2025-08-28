// *********************************
// disp100-hlib-b
// braucht hlib-stdlib
// class-name wird am ende NICHT genullt
// *********************************

// *************************************************************************
Disp100HlibB = function()
 {
 HlibStdlib.call(this);

 if (!Disp100HlibB.L1) Disp100HlibB.L1 = this;

 this.SENDKEYS = ",13,27,112,113,114,115,116,117,118,119,120,121,122,123,";
// this.SENDIDS = new Array();
 this.SENDIDS = {};
 this.CAN_SEND = false;

// -------------------------------------------------------------------------
 this.setup = function(rcv) //defs,ee) aus stdlib
  {
  if (!document.eventReceived)
   {
   document.eventReceived = function(evnt)
    {
    Disp100HlibB.L1.toServer(evnt);
    };
   }

  if (typeof log == "undefined")
   {
   log = function(s,clr)
    {
    if (document["parent-functions"] && document["parent-functions"].log) return(document["parent-functions"].log(s,clr,document));
    alert("log="+s);
    };
   }

  if (!rcv)
   {
   rcv = function(doc,txt,mime,st,xobj)
    {
    Disp100HlibB.L1.fromServer(doc);
    };
   }

  document["parent-functions"].xioDocReceived = rcv;

  return(this);
  };

// -------------------------------------------------------------------------
 this.sendXml = function(doc)
  {
  var m = document["parent-datas"];
  if (m)
   {
   doc.lastChild.setAttribute("winid",m.winid);
   doc.lastChild.setAttribute("cid",m.cid);
   }
//  if (document["parent-functions"] && document["parent-functions"].sendXml) document["parent-functions"].sendXml(doc);
  this.sendXmlNativ(doc);
  };

// -------------------------------------------------------------------------
 this.sendXmlNativ = function(doc)
  {
  if (document["parent-functions"] && document["parent-functions"].sendXml) document["parent-functions"].sendXml(doc);
  };

// -------------------------------------------------------------------------
 this.canSend = function(b)
  {
  this.CAN_SEND = b;

  if (document["parent-functions"] && document["parent-functions"].canSend) document["parent-functions"].canSend(document,b);

  return(this);
  };

//--------------
 this["set-sendkeys"] = function(e)
  {
  this.SENDKEYS = "";
  var s = e.getAttribute("keys");
  if (s) this.SENDKEYS = s;
  }

/*
//--------------
 this["set-sendids"] = function(e)
  {
  var aa = new Array();
  var i = 0;
  while(true)
   {
   var id = e.getAttribute("id-"+(i++));
   if (!id) break;
   aa.push(id);
   }
  this.SENDIDS = aa;
  }
*/
//--------------
 this["set-sendids"] = function(e)
  {
  this.SENDIDS = {};
  this["add-sendids"](e);
  }

//--------------
 this["add-sendids"] = function(e)
  {
  var i = 0;
  while(true)
   {
   var id = e.getAttribute("id-"+(i++));
   if (!id) break;
   this.SENDIDS[id] = id;
   }
  }

//--------------
 this["clr-sendids"] = function(e)
  {
  var i = 0;
  while(true)
   {
   var id = e.getAttribute("id-"+(i++));
   if (!id) break;
   delete this.SENDIDS[id];
   }
  }

//--------------
 this["set-input-enable"] = function(e)
  {
//  this.CAN_SEND = this.parseValue(e.getAttribute("value"));
//  setLtgSanDueBel("B_E_L",(s == true) ? "" : "W");
  this.canSend(this.parseValue(e.getAttribute("value")));
  }

//--------------
 this["set-cookie"] = function(e)
  {
  var p = e.getAttribute("path");
  var n = e.getAttribute("name");
  var v = e.getAttribute("value");
  var ms = e.getAttribute("ms");
  if (!p) p = "/";
  if (v == null) return(this.setCookie(p,n)); // loeschen
  if (ms == null) return(this.setCookie(p,n,v));
  this.setCookie(p,n,v,ms);
  }

//--------------
 this["get-cookie"] = function(e)
  {
  var rcmd = e.getAttribute("reply-cmd");
  if (!rcmd) rcmd = "get-cookie";
  var c = this.getCookie();
  var doc = this.newDocument(rcmd);
  if (c != null) doc.lastChild.setAttribute("cookie",c);
  this.sendXml(doc);
  }


//--------------
 this["to-front"] = function(e)
  {
  var did = e.getAttribute("did");
  if (!did) return;
  var e = document.getElementById(did);
  if (!e) return;
  this.toFront(e);
  };

//--------------
 this["set-text"] = function(e)
  {
  var did = e.getAttribute("did");
  if (!did) return;
  var s = e.getAttribute("text");
  if (!s) s = "";
  var e = document.getElementById(did);
  if (!e) return;
  if (e.setText) return(e.setText(s));
  if ((e.nodeName == "INPUT") || (e.nodeName == "TEXTAREA"))
   {
   e.value = s;
   return;
   }
  if (e.nodeName == "BUTTON")
   {
   var e1 = e.lastChild;
   if (e1)
    {
/*
    if (e1.nodeName == "#text")
     {
     e1.nodeValue = (s) ? s : "";
     return;
     }
*/
    if (e1.nodeName != "#text")
     {
     while(e1.firstChild) e1.removeChild(e1.firstChild);
     if (s)
      {
      var t = document.createTextNode(s);
      e1.appendChild(t);
      }
     return;
     }
    }
   }
  while(e.firstChild) e.removeChild(e.firstChild);
  if (s)
   {
   var x = s.indexOf("\n");
   if (x < 0)
    {
    var t = document.createTextNode(s);
    e.appendChild(t);
    }
   else
    {
    s = s.split("\n");
    for (var i = 0; i < s.length; i++)
     {
     var t = document.createTextNode(s[i]);
     e.appendChild(t);
     if (i < (s.length-1))
      {
      t = document.createElement("br");
      e.appendChild(t);
      }
     }
    }
   }
  }
//--------------
 this["set-style"] = function(e)
  {
  var did = e.getAttribute("did");
  if (!did) return;
  var aa = e.attributes;

//  var n = e.getAttribute("name");
//  if (!n) return;
//  var v = e.getAttribute("value");
//  if (v == null) return;
//  v = parseValue(v);

//  var doc = getChildDocument();
  var e = document.getElementById(did);
  if (!e) return;

  for (var i = 0; i < aa.length; i++) e.style[aa[i].nodeName] = this.parseValue(aa[i].nodeValue);
//  e.style[n] = v;
  }
//--------------
 this["set-property"] = function(e0)
  {
  var did = e0.getAttribute("did");
  if (!did) return;

//  var doc = getChildDocument();
  var e = document.getElementById(did);
  if (!e)
   {
   var f = document[did];
   if (f) f(e0);
   return;
   }

  var aa = e0.attributes;
  for (var i = 0; i < aa.length; i++)
   {
   var n = aa[i].nodeName;
   if (n == "did") continue;
   var v = this.parseValue(aa[i].nodeValue);
   e[n] = v;
   }


//alert("n="+n+" v="+v);
//  e[n] = v;
  }

//--------------
 this["set-focus"] = function(e)
  {
//  var doc = getChildDocument();
  var did = e.getAttribute("did");
  if (did)
   {
   var e = document.getElementById(did);
   if (e) e.focus();
   return;
   }
  document.getElementsByTagName("BODY")[0].focus();
  }

//-------------------------------------------------------------------------------
 this.parseValue = function(v)
  {
  if (v == "<false>") return(false);
  if (v == "<true>") return(true);
  if (v == "<null>") return(null);
  return(v);
  }

//------------------------------------------------------------------------
 this.isSendEvent = function(evnt)
  {
//log("e="+evnt.keyChar+" "+evnt.keyCode+" "+" "+evnt.type);
  if (!evnt) return(true);
  if (evnt.type.indexOf("key") != 0) return(true);
  var kc = this.getKeyCode(evnt);
  if (!kc) return(true);
  if (kc == 13)
   {
   if (this.getSource(evnt).nodeName == "TEXTAREA") return(false);
   }
  var sendkeys = ","+this.SENDKEYS+",";
  var s = ","+kc+",";
  if (sendkeys.indexOf(s) >= 0) return(true);
  return(false);
  }

//------------------------------------------------------------------------
 this.addEleInfo = function(d,ele,dtag)
  {
  var e = d.createElement(dtag);
  d.lastChild.appendChild(e);
  if (!ele) return;

  for (var p in ele)
   {
   try
    {
    if ((""+p).indexOf("HTML") > 0) continue; // no innerHTML or outerHTML please
    var o = ele[p];
    if ((typeof o == "string") || (typeof o == "number") || (typeof o == "boolean")) e.setAttribute(p,""+o);
    }
   catch(ex)
    {
    e.setAttribute(p,"ex="+ex);
    }
   }

  var tr = ele;
  if (tr.nodeName == "TD") tr = tr.parentNode;
  if (tr.nodeName == "TR")
   {
   var tb = tr;
   while(tb.nodeName != "TABLE") tb = tb.parentNode;
   var id1 = tb.getAttribute("id");
   if (id1) e.setAttribute("xml100-table-id",id1);
   var ndnd = tr.getElementsByTagName("TD");
   for (var i = 0; i < ndnd.length; i++)
    {
    var txt = ndnd[i].firstChild;
    if (txt) e.setAttribute("xml100-td-"+i,txt.nodeValue);
    }
   }

  }

//------------------------------------------------------------------------
 this.addTermInfo = function(d,name)
  {
  var e = d.createElement(name);
  d.lastChild.appendChild(e);
  e.setAttribute("screen-width",""+screen.width);
  e.setAttribute("screen-height",""+screen.height);
  e.setAttribute("user-agent",""+navigator.userAgent);
  var o = this.getWindowSize();
  e.setAttribute("window-width",""+o.W);
  e.setAttribute("window-height",""+o.H);
  if (this.canCookie()) e.setAttribute("cookie",this.getCookie());
  }

//------------------------------------------------------------------------
 this.addInputData = function(d,srcdoc,dtag)
  {
  var e0 = d.createElement(dtag);
  d.lastChild.appendChild(e0);
//  for (var i = 0; i < this.SENDIDS.length; i++)
  for (var id in this.SENDIDS)
   {
//   var id = this.SENDIDS[i];
   if (id.indexOf(".") > 0)
    {
    var aa = id.split(".");
    var e = srcdoc.getElementById(aa[0]);
    if (!e) continue;
    if (typeof e[aa[1]] == "function")
     {
     e[aa[1]](e0);
     continue;
     }
    if (typeof e["do-xml-command"] == "function") e["do-xml-command"](e0,aa[1]);
    continue;
    }

   var e = srcdoc.getElementById(id);
   if (!e) continue;
   var n = e.nodeName;
   if (n == "TEXTAREA")
    {
    var s = encodeURIComponent(e.value);
    e0.setAttribute(id,s);
    continue;
    }
   if (n == "INPUT")
    {
    if (e.type == "checkbox")
     {
     e0.setAttribute(id,""+e.checked);
     continue;
     }
    var s = encodeURIComponent(e.value);
    e0.setAttribute(id,s);
    continue;
    }
// to-do id.#text
   }
  return;



  var f = function(d,f,e0)
   {
   var n = e0.nodeName.toLowerCase();
   if (n == "#text") return;
   var id = e0.getAttribute("id");
   if (id)
    {
    if ((n == "input") || (n == "textarea"))
     {
     var e = d.createElement("xml100-data");
     d.lastChild.appendChild(e);
     e.setAttribute("id",id);
     var s = encodeURIComponent(e0.value);
     e.setAttribute("text",s);
//alert(""+s);
     }
    }
   var cc = e0.childNodes;
   for (var i = 0; i < cc.length; i++) f(d,f,cc[i]);
   }

  f(d,f,srcdoc.body);
  }


//-------------------------------------------------------------------------------
 this.toServer = function(evnt)
  {
//alert(""+evnt+" can="+this.CAN_SEND);

  if (this.CAN_SEND != true) return;
  var c = this;
  evnt = c.getEvent(evnt);

//  var s = getLtgSanDueBel("B_E_L");
//  if (s) return;

//  if (!evnt) evnt = getChildWindow().event;
  if (this.isSendEvent(evnt) != true) return;

  var src = c.getSource(evnt);
  var doc = c.newDocument("xml100-input");
  this.addEleInfo(doc,evnt,"xml100-event");
  this.addEleInfo(doc,(src.nodeName == "BODY") ? null : src,"xml100-event-source");
  var psrc = src;
  while(psrc)
   {
   if (psrc.id) break;
   psrc = psrc.parentNode;
   }
  if (psrc === src) psrc = null;
  this.addEleInfo(doc,psrc,"xml100-event-parent");
  this.addInputData(doc,document,"xml100-input-data");
  this.addTermInfo(doc,"xml100-term-info");

  evnt.cancelBubble = true;
  evnt.returnValue = false;

//  setLtgSanDueBel("S_A_N","SAN")
//  setLtgSanDueBel("B_E_L","W")

//alert(""+doc); //  F.output(doc);
//  var o = this.XOBJ;
//  var f = this.XFCT;
//  if (o && f) f.apply(o,new Array(doc));
  this.canSend(false);
  this.sendXml(doc);

  return(false);
  }

//-------------------------------------------------------------------------------
 this.fromServer = function(doc)
  {
  var ndnd = doc.lastChild.childNodes;
  if (ndnd.length < 1) return;
  for (var i = 0; i < ndnd.length; i++)
   {
   var e = ndnd[i];
   var cmd = e.nodeName;
   var did = e.getAttribute("did");
   if (did)
    {
    var ele = document.getElementById(did);
    if (ele)
     {
     var f = ele[cmd];
     if ((typeof f) == "function")
      {
      f.apply(ele,new Array(e));
      continue;
      }
     var f = ele["do-xml-command"];
     if ((typeof f) == "function")
      {
      f.apply(ele,new Array(e));
      continue;
      }
     }
    }

   var f = window[cmd];
   if ((typeof f) == "function")
    {
    f(e);
    continue;
    }

   var f = this[cmd];
   if ((typeof f) == "function")
    {
    f.apply(this,new Array(e));
    continue;
    }

 alert("unexpected command="+cmd+" did="+did);
   }

//  if (cdoc.receiveDataCompleted) cdoc.receiveDataCompleted();
  }

//-------------------------------------------------------------------------------
 this.simuServer = function(cmd,n0,v0,n1,v1)
  {
  var aa = new Array();
  for (var i = 0; i < arguments.length; i++) aa.push(arguments[i]);
  var doc = this.newDocument.apply(this,aa);
  var e1 = doc.createElement("e0");
  var e0 = doc.lastChild;
  doc.replaceChild(e1,e0);
  e1.appendChild(e0);
  this.fromServer(doc);
  }

 }
Disp100Hlib = Disp100HlibB;

