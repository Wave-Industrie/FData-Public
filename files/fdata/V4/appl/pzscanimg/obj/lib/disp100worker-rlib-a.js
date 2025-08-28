// braucht Packages.frank.lib

// -----------------------------------------------------------------
Disp100workerRlib = function(hw,display,name)
 {

 this.TIMEOUT = false;
 this.ONLINE = false;
 this.BROWSER_STATE = false;

 this.HW = null;
 this.DISPLAY = null;
 this.NAME = null;
 this.XL = Packages.frank.lib.Xml100Lib;
 this.XS = Packages.frank.lib.xml100.Xml100s;
 this.TIMOUTMS = 0;

 this.WINID = null;
 this.CID = null;

 this.LAST_WRITE_RESULT = null;
 this.LAST_RECEIVED_HO = null;
 this.LAST_RECEIVED_E0 = null;
 this.APPLST = null; // nur fuer die applikation

 if (hw) this.HW = hw;
 if (display) this.DISPLAY = display;
 if (name) this.NAME = name;


// ---------------------
 this.write = function(ho)
  {
  this.LAST_WRITE_RESULT = this.HW.write(ho);
  return(this);
  };

// ---------------------
 this.close = function()
  {
  this.HW.close();
  return(this);
  };

/*
// ---------------------
 this.doCreateConnect = function(m)
  {
  var src = m.get("src");
  var doc = Xml100Lib.newDocument("create-connect");
  var ecr = Xml100Lib.newElement(doc,"create-display","ssid",src);
  var ecx = Xml100Lib.newElement(doc,"logon-context","XML100_USER","system","XML100_REMOTE_IP","local","XML100_REMOTE_PORT","dyn","XML100_BROWSER_USER-AGENT","fdata-wsprinter-v0");
  ecr.appendChild(ecx);
  doc.getDocumentElement().appendChild(ecr);
  var ecc = Xml100Lib.newElement(doc,"connect-display","browser-state-cmd","bstate");
  doc.getDocumentElement().appendChild(ecc);
  var ho = Xml100s.docRequest(doc,"PUT",DISP100_CMD+"/"+src+"/ssid");
  m.get("hw").write(ho);
  setState(m,Z_WCREATECONNECT,TO_WCREATECONNECT);
  };
*/
// ---------------------
 this.mkCreate = function(httpfn,ctx)
  {
  var doc = this.XL.newDocument("create-display"); //,"ssid","wsprt-1-sgm254-0");
  if (ctx)
   {
   var e = this.XL.newElement(doc,"logon-context");
   var ee = ctx.entrySet().toArray();
   for (var i = 0; i < ee.length; i++) e.setAttribute(ee[i].getKey(),ee[i].getValue());
   doc.getDocumentElement().appendChild(e);
   }
  var ho = this.XS.docRequest(doc,"PUT",httpfn+"/cmd/cmd");
  return(ho);
  };
// ---------------------
 this.wrCreate = function(httpfn,ctx)
  {
  var ho = this.mkCreate(httpfn,ctx)
  return(this.write(ho));
  };



// ---------------------
 this.mkConnect = function(httpfn)
  {
  var doc = this.XL.newDocument("connect-display","browser-state-cmd","browser-state");
  var ho = this.XS.docRequest(doc,"PUT",httpfn+"/cmd/cmd");
  return(ho);
  };
// ---------------------
 this.wrConnect = function(httpfn)
  {
  var ho = this.mkConnect(httpfn)
  return(this.write(ho));
  };

// ---------------------
 this.mkXml100 = function(doc,winid,cid)
  {
  var ho = this.XS.docResponse(doc,"etag","winid/"+winid+"/cid/"+cid);
  return(ho);
  };

// ---------------------
 this.wrXml100 = function(doc,winid,cid)
  {
  if (!winid) winid = this.WINID;
  if (!cid) cid = this.CID;
  var ho = this.mkXml100(doc,winid,cid)
  return(this.write(ho));
  };

// ---------------------
 this.reqTimer = function(t)
  {
  this.TIMEOUT = false;
  this.TIMOUTMS = java.lang.System.currentTimeMillis()+t;
  return(this);
  };

// ---------------------
 this.clrTimer = function()
  {
  this.TIMEOUT = false;
  this.TIMOUTMS = 0;
  return(this);
  };

// ---------------------
 this.httpAttr = function(name)
  {
  if (this.LAST_RECEIVED_HO) return(this.LAST_RECEIVED_HO.M.get(name));
  return(null);
  };

// ---------------------
 this.timeoutReceived = function()
  {
  };
// ---------------------
 this.timerReceived = function()
  {
  this._timerReceived();
  };
// ---------------------
 this._timerReceived = function()
  {
  if (this.TIMOUTMS > 0)
   {
   if (java.lang.System.currentTimeMillis() > this.TIMOUTMS)
    {
    this.TIMEOUT = true;
    this.TIMOUTMS = 0;
    this.timeoutReceived();
    }
   }
  return(this);
  };


// ---------------------
 this.errnoReceived = function(r)
  {
SLOG.log("errno-received.r="+this.XL.toString(r.getOwnerDocument()));
  };

// ---------------------
 this.browserStateReceived = function(b)
  {
  };

// ---------------------
 this.cidReceived = function(cid)
  {
  };

// ---------------------
 this.onlineReceived = function()
  {
  this._onlineReceived();
  };
// ---------------------
 this._onlineReceived = function()
  {
  this.wrConnect(this.DISPLAY);
  };

// ---------------------
 this.offlineReceived = function()
  {
SLOG.log("offline: "+this.NAME);
  };

// ---------------------
 this.httpReceived = function(ho,e0,cmd)
  {
SLOG.log("<- external.ho="+ho);
  };
// ---------------------
 this.hoReceived = function(ho)
  {
  this._hoReceived(ho);
  };
// ---------------------
 this._hoReceived = function(ho)
  {
//SLOG.log("<-"+new java.lang.String(ho.BB));
  var mime = ho.M.get("content-type");
  var doc = ((mime != null) && (mime.indexOf("/xml") > 0)) ? this.XL.newDocument(ho.BB,ho.HL,ho.CL) : null;
  var e0 = null;
  var cmd = null;
  var f = null;
  if (doc != null)
   {
   e0 = doc.getDocumentElement();
   this.LAST_RECEIVED_E0 = e0;
   cmd = e0.getNodeName();
   f = this[cmd];
   }
  if (f)
   f.call(this,e0,cmd);
  else
   this.httpReceived(ho,e0,cmd);
  return(this);
  };



// ---------------------
 this.unexpectedReceived = function(o)
  {
SLOG.log("<- unexpected.o="+o);
  };



// ---------------------
 this.windowStateReceived = function(b)
  {
SLOG.log("<- windowStateReceived.b="+b);
  };



// ---------------------
 this["winid-closed"] = function(e0,cmd)
  {
  this["_winid-closed"].call(this,e0,cmd);
  }
// ---------------------
 this["_winid-closed"] = function(e0,cmd)
  {
  this.windowStateReceived(false);
  return(this);
  }



// ---------------------
 this.geladen = function(e0,cmd)
  {
  this._geladen(e0,cmd);
  };
// ---------------------
 this._geladen = function(e0,cmd)
  {
  this.WINID = e0.getAttribute("winid");
  this.windowStateReceived(true);
  };



// ---------------------
 this["browser-state"] = function(e0,cmd)
  {
  var st = e0.getAttribute("state");
  if (st != this.BROWSER_STATE) this.setBrowserState(st == "2");
  }



// ---------------------
 this["connect-display"] = function(e0,cmd)
  {
  this["_connect-display"].call(this,e0,cmd);
  }
// ---------------------
 this["_connect-display"] = function(e0,cmd)
  {
  var r = e0.getElementsByTagName("result").item(0);
  var errno = r.getAttribute("errno");
  if (errno != "0")
   {
   this.errnoReceived(r);
   }
  else
   {
   this.setCid(r.getAttribute("cid"));
   var st = r.getAttribute("state");
   if (st != this.BROWSER_STATE) this.setBrowserState(st == "2");
   }
  return(this);
  }



// ---------------------
 this.ssidCreated = function(ssid)
  {
  this.connectSsid(ssid);
  };
// ---------------------
 this.connectSsid = function(ssid)
  {
//SLOG.log("this.DISPLAY="+this.DISPLAY);
  var aa = this.DISPLAY.substring(1).split("/");
  var d = "/"+ssid+"/ssid";
  for (var i = aa.length-1; i > 0; i-=2)
   {
   if (aa[i] != "ssid") d = "/"+aa[i-1]+"/"+aa[i]+d;
   if (i == 2) d = "/"+aa[0]+d;
   }
  this.DISPLAY = new java.lang.String(d);
//SLOG.log("this.DISPLAY="+this.DISPLAY);
  this.wrConnect(this.DISPLAY);
  };
// ---------------------
 this["create-display"] = function(e0,cmd)
  {
  this["_create-display"].call(this,e0,cmd);
  };
// ---------------------
 this["_create-display"] = function(e0,cmd)
  {
  var rr = e0.getElementsByTagName("result");
  var r = null;
  for (var i = 0; i < rr.getLength(); i++)
   {
   var e = rr.item(i);
   if (e.getParentNode() != e0) continue;
   r = e;
   break;
   }
  var errno = r.getAttribute("errno");
//SLOG.log("!!!!!!!!!!!!!!!! errno="+errno);
  if (errno != "0")
   {
   this.errnoReceived(r);
   }
  else
   {
   this.ssidCreated(r.getAttribute("ssid"));
   }
  return(this);
  };



// ---------------------
 this.smartlogReceived = function(e0)
  {
SLOG.log("SMAT-LOG: "+e0.getAttribute("text"));
  }
// ---------------------
 this["smart-log"] = function(e0,cmd)
  {
  this.smartlogReceived(e0);
  }



// ---------------------
 this.input100Received = function(doc)
  {
  }
// ---------------------
 this["xml100-input"] = function(e0,cmd)
  {
  this["_xml100-input"].call(this,e0,cmd);
  }
// ---------------------
 this["_xml100-input"] = function(e0,cmd)
  {
  this.input100Received(e0.getOwnerDocument());
  return(this);
  }


// ---------------------
 this.setBrowserState = function(b)
  {
  this.BROWSER_STATE = b;
  this.browserStateReceived(b);
  }

// ---------------------
 this.setCid = function(cid)
  {
  this.CID = cid;
  this.cidReceived(cid);
  }

// ---------------------
 this.doEvent = function(o)
  {
  if (o instanceof HttpObject)
   {
   this.LAST_RECEIVED_HO = o;
   this.LAST_RECEIVED_E0 = null;
   return(this.hoReceived(o));
   }
  if (o == "timer") return(this.timerReceived());
  if (o == "online")
   {
   this.ONLINE = true;
   this.onlineReceived();
   return;
   }
  if (o == "offline")
   {
   this.ONLINE = false;
   this.offlineReceived();
   return;
   }
  return(this.unexpectedReceived(o));
  };

// ---------------------
 this.installDefaults = function(env)
  {
  this.ENV = env;

  this.timeoutReceived = function()
   {
   timeoutReceived(this.ENV,this);
   };

  this.offlineReceived = function()
   {
   offlineReceived(this.ENV,this);
   };

  this.browserStateReceived = function(b)
   {
   browserStateReceived(this.ENV,this,b);
   };

  this.windowStateReceived = function(b)
   {
   windowStateReceived(this.ENV,this,b);
   };

  this.input100Received = function(doc)
   {
   input100Received(this.ENV,this,doc);
   };

  this.httpReceived = function(ho,e0,cmd)
   {
   httpReceived(this.ENV,this,e0,cmd);
   };

  return(this);
  };

// ---------------------
 this.applstate = function(st)
  {
  if (arguments.length == 0) return(this.APPLST);
  this.APPLST = st;
  return(this);
  }

 };

