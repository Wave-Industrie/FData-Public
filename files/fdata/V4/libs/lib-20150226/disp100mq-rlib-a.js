// *****************************************************************
// braucht: frank.lib.*,frank.lib.net.*

// -----------------------------------------------------------------
Disp100mqRlib = function(ccx,slog,qnam) //,winid)
 {
 Disp100Rlib.P.call(this,ccx,slog,Disp100Rlib.mjRFCT,Disp100Rlib.mjXFCT);

 this.RQ = new ConcurrentMultiQueue("timer");
 this.DISPLAY = ccx.getenv("XML100_DISPLAY");
 this.DISPLAY_PORT = ccx.getenv("XML100_DISPLAY_PORT");
 this.WINIO = Disp100Client.connect(this.DISPLAY,this.DISPLAY_PORT,"browser-state"); //,(arguments.length > 3) ? new Array("winid",winid) : new Array("create-winid","true"));
 this.CID = this.WINIO.cid();
 this.BROWSER_STATE = this.WINIO.browserState();
 this.WINID = null;
//slog.log("DISPLAY="+this.DISPLAY+" "+" CID="+this.CID+" "+Xml100Lib.toString(this.WINIO.CONNECTDOC));
 var k = DefaultSelectorExecuter4.getDefaultExecuter().start().cmd("register",this.WINIO.SOC);
 this.WINIO.setup(k,this.RQ.newChildQueue(qnam ? qnam : "disp100"));
// this.HTMLARGS = null;
 this.PERSISTENCE_LISTENER
// this.WINID = this.WIN.CONNECTDOC.getElementsByTagName("result").item(0).getAttribute("winid");
//slog.log("rcv-cid="+this.WINID);
// this.WIN.reqWinInput(this.WINID);
/*
 this.SSID = "none";

 var ss = this.DISPLAY.split("/");
 for (var i = 0; i < ss.length; i+=2)
  {
  if (!ss[ss.length-i-1].equals("ssid")) continue;
  this.SSID = ss[ss.length-i-2];
  break;
  }
*/

// ---------------------
 this.getSource = function()
  {
  return(this.RQ.getSource());
  };

/*
// ---------------------
 this.createHtmlArgs = function()
  {
  this.HTMLARGS = {};
  for (var i = 0; i < arguments.length-1; i+=2) this.HTMLARGS[arguments[i]] = arguments[i+1];
  return(this);
  }
*/

// ---------------------
 this.openHtml = function(doc,x,y,w,h)
  {
  return(this.setHtml(doc,CCX.getenv("XML100_DTOPID",null),null,x,y,w,h));
  }

// ---------------------
 this.setHtml = function(doc,winid,tout,x,y,w,h)
  {
  var etag = "cid/"+this.CID;
//  if (arguments.length < 3) tout = 10000;
//  if (arguments.length > 1) etag += "/winid/"+winid;

  if (winid) etag += "/winid/"+winid;
  if (x)     etag += "/x/"+x;
  if (y)     etag += "/y/"+y;
  if (w)     etag += "/w/"+w;
  if (h)     etag += "/h/"+h;

  var ho = new HttpObject(200,"OK").cache(false).mime("text/html").props("etag",etag).createHeader(Xml100Lib.toByteArray(doc));
//this.LOG.log("-> write="+new java.lang.String(ho.BB0));
  this.WINIO.write(ho);

  this.WINID = null;
//  this.setTimeout(tout);
  this.setTimeout(tout ? tout : 60000);

  while(true)
   {
   var doc = this.readXml();
   if (doc == null) break;
   var e = doc.getDocumentElement();
   if (e.getNodeName() != "geladen") continue;
   this.WINID = Xml100Lib.getAttr(e,"winid",null);
   break;
   }

  return(this);
  };

// ---------------------
 this.writeDocCommand = function(cmd,doc)
  {
  var ho = new HttpObject("PUT",this.DISPLAY+cmd).cache(false).mime("application/xml").createHeader(Xml100Lib.toByteArray(doc));
//this.LOG.log("-> writeDocCommand="+ho);
  this.WINIO.write(ho);
  return(this);
  };

// ---------------------
 this.writeDocReply = function(doc,winid)
  {
  if (!winid) winid = this.WINID;
  var etag = "cid/"+this.CID+"/winid/"+winid;
  var ho = new HttpObject(200,"OK").cache(false).mime("application/xml").props("etag",etag).createHeader(Xml100Lib.toByteArray(doc));
//this.LOG.log("-> write="+new java.lang.String(ho.BB0));
  this.WINIO.write(ho);
  return(this);
  };

// ---------------------
 this.reqClose = function()
  {
  var doc = Xml100Lib.newDocument("a");
  var e = Xml100Lib.newElement(doc,"close-winid","winid",this.WINID);
  doc.getDocumentElement().appendChild(e);
  this.writeDocReply(doc,"winid-desktop");
  return(this);
  };

// ---------------------
 this.close = function()
  {
//this.LOG.log("-> close");
  this.WINIO.close();
  return(this);
  };

// ---------------------
 this.setTimeout = function(ms)
  {
  this.RQ.setTimeout(ms);
  return(this);
  };

// ---------------------
 this.doEvents = function(l,env,fdoc,ftim,fsta)
  {
  var weiter = fsta.apply(l,new Array(env,this.BROWSER_STATE));
  while(weiter == true)
   {
   var doc = this.readXml();
SLOG.log("de-src="+this.getSource());
   if (this.getSource() == "timer")
    {
    weiter = ftim.apply(l,new Array(env));
    continue;
    }
   if (doc == null)
    {
SLOG.log("de-doc == null");
    return;
    }
   var e0 = doc.getDocumentElement();
   var cmd = e0.getNodeName();
SLOG.log("de-cmd="+cmd);
   if (cmd == "browser-state")
    {
    var st = 1*e0.getAttribute("state");
    this.BROWSER_STATE = st;
    weiter = fsta.apply(l,new Array(env,st));
    continue;
    }
   weiter = fdoc.apply(l,new Array(env,doc));
   }
  };

 };

// -----------------------------------------------------------------
Disp100mqRlib.mjRFCT = function()
 {
 var ho = this.RQ.take();
//this.LOG.log("ho="+ho+" name="+this.RQ.getSource());
 if (ho == null) return(null);
 var doc = Xml100Lib.newDocument(ho.BB,ho.HL,ho.CL);
 if (doc && doc.getDocumentElement().getNodeName().equals("winid-closed"))
  {
  var e0 = doc.getDocumentElement();
  var x = e0.getAttribute("x");
  var y = e0.getAttribute("y");
  var w = e0.getAttribute("w");
  var h = e0.getAttribute("h");
  if (this.PERSISTENCE_LISTENER && this.PERSISTENCE_LISTENER.resized) this.PERSISTENCE_LISTENER.resized(x,y,w,h);
  doc = null;
  }
 return(doc);
 };

// -----------------------------------------------------------------
Disp100mqRlib.mjXFCT = function(doc)
 {
 var etag = "cid/"+this.CID+"/winid/"+this.WINID;
 var ho = new HttpObject(200,"OK").cache(false).mime("application/xml").props("etag",etag).createHeader(Xml100Lib.toByteArray(doc));
//this.LOG.log("-> write");
 this.WINIO.write(ho);
 };


Disp100mqRlib.P = Disp100Rlib;
Disp100Rlib = Disp100mqRlib;

