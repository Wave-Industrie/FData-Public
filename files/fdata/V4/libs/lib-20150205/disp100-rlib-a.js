// ***************************************************************************
Disp100Rlib = function(ccx,slog,rfct,xfct)
 {
 this.CCX = ccx;
 this.LOG = slog;

//Xml100_JLib_A = function(ii,oo)

 this.XL = new Packages.frank.lib.Xml100Lib();
 this.JL = new Packages.frank.lib.script.JsCommands();

 this.RDOC = null;
 this.XDOC = this.XL.newDocument("xml100-out");

// this.IN = (ii) ? new Packages.frank.lib.xml100.Xml100Input(ii) : new Packages.frank.lib.xml100.Xml100Input();
// this.OUT = (oo) ? new Packages.frank.lib.xml100.Xml100Output(oo) : new Packages.frank.lib.xml100.Xml100Output();

 this.LAST_XELEMENT = null;

// this.LAST_SCRIPT_CODE = 'if (this["geladen"]) this["geladen"]();';

 this.__readXml = (rfct) ? rfct : null;
 this.__writeXml = (xfct) ? xfct : null;


// ------------------------------------------------------------
 this.rdoc = function(rdoc)
  {
  this.RDOC = rdoc;
  return(this);
  }

// ------------------------------------------------------------
 this.readXml = function()
  {
  this.RDOC = this.__readXml();
  return(this.RDOC);
  }

// -----------------------------------------------------------------
 this.writeXml = function()
  {
  this.__writeXml(this.XDOC);
  return(this.cls());
  }

// ------------------------------------------------------------
 this.docname = function()
  {
  return(this.RDOC.getDocumentElement().getNodeName());
  }
// ------------------------------------------------------------
 this.eventType = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event").item(0).getAttribute("type"));
  }
// ------------------------------------------------------------
 this.keyCode = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event").item(0).getAttribute("keyCode"));
  }
// ------------------------------------------------------------
 this.ctrlKey = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event").item(0).getAttribute("ctrlKey"));
  }
// ------------------------------------------------------------
 this.scanString = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event").item(0).getAttribute("scanString"));
  }
// ------------------------------------------------------------
 this.srcTag = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event-source").item(0).getAttribute("nodeName"));
  }
// ------------------------------------------------------------
 this.srcId = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event-source").item(0).getAttribute("id"));
  }
// ------------------------------------------------------------
 this.srcName = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event-source").item(0).getAttribute("name"));
  }
// ------------------------------------------------------------
 this.srcAttr = function(name)
  {
  return(this.RDOC.getElementsByTagName("xml100-event-source").item(0).getAttribute(name));
  }
// ------------------------------------------------------------
 this.parentTag = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event-parent").item(0).getAttribute("nodeName"));
  }
// ------------------------------------------------------------
 this.parentId = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event-parent").item(0).getAttribute("id"));
  }
// ------------------------------------------------------------
 this.parentName = function()
  {
  return(this.RDOC.getElementsByTagName("xml100-event-parent").item(0).getAttribute("name"));
  }
// ------------------------------------------------------------
 this.parentAttr = function(name)
  {
  return(this.RDOC.getElementsByTagName("xml100-event-parent").item(0).getAttribute(name));
  }
// ------------------------------------------------------------
 this.eleAttr = function(tag,name)
  {
  return(this.RDOC.getElementsByTagName(tag).item(0).getAttribute(name));
  }
// ------------------------------------------------------------
 this.srcTd = function(idx)
  {
  return(this.RDOC.getElementsByTagName("xml100-event-source").item(0).getAttribute("xml100-td-"+idx));
  }
// ------------------------------------------------------------
 this.input = function(id,attrname)
  {
  var nl = this.RDOC.getElementsByTagName("xml100-input-data");
  if (nl.getLength() > 0)
   {
   var a = nl.item(0).getAttributeNode(id);
   if (a != null) return(java.net.URLDecoder.decode(a.getValue(),"UTF-8"));
   var nl1 = nl.item(0).getElementsByTagName(id);
   if (nl1.getLength() == 0) return(null);
   if (attrname)
    {
    a = nl1.item(0).getAttributeNode(attrname);
    return((a == null) ? null : a.nodeValue);
//    return(nl1.item(0).getAttribute(attrname));
    }
   return(nl1.item(0));
   }
  return(null);
  }
// ------------------------------------------------------------
 this.inputele = function(tag)
  {
  var nl = this.RDOC.getElementsByTagName("xml100-input-data");
  if (nl.getLength() > 0)
   {
   var nl1 = nl.item(0).getElementsByTagName(tag);
   if (nl1.getLength() > 0) return(nl1.item(0));
   }
  return(null);
  }

// ------------------------------------------------------------
 this.inputs = function(tags)
  {
  var aa = new Array();
  for (var i = 0; i < arguments.length; i++) aa.push(this.input(arguments[i]));
  return(aa);
  }

// -----------------------------------------------------------------
 this.cls = function()
  {
  var xd = this.XDOC;
  var e0 = xd.createElement("xml100-out");
  xd.replaceChild(e0,xd.getDocumentElement());
  this.LAST_XELEMENT = e0;
  return(this);
  }

// -----------------------------------------------------------------
 this.setSendKeys = function(keys)
  {
  if (arguments.length < 1) keys = "";
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-sendkeys","keys",keys);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.setSendIds = function()
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-sendids");
  for (var i = 0; i < arguments.length; i++) e.setAttribute("id-"+i,arguments[i]);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.enableInput = function(b)
  {
  if (arguments.length < 1) b = true;
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-input-enable","value","<"+b+">");
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.e22 = function(text)
  {
  return(this.setStyle("e22","color","red").setText("e22",text));
  }

// -----------------------------------------------------------------
 this.info = function(text)
  {
  return(this.setStyle("e22","color","black").setText("e22",text));
  }

/*
nicht mehr hier -> subclass
// -----------------------------------------------------------------
 this.setHtml = function(s)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-html","html",s);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.setScript = function(s)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-script","script",s);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.setXmlScript = function(e0,v)
  {
  if (arguments.length < 2) v = "";
  if (e0.getNodeName() == "#document") e0 = e0.getDocumentElement();
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-xmlscript"+v);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  e.appendChild(xd.importNode(e0,true));
  return(this);
  }
*/

// -----------------------------------------------------------------
 this.setText = function(did,text)
  {
  var xd = this.XDOC;
  for (var i = 0; i < arguments.length-1; i+=2)
   {
   var e = this.XL.newElement(xd,"set-text","did",arguments[i],"text",arguments[i+1]);
   xd.getDocumentElement().appendChild(e);
   }
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.setProperty = function(did,name,value)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-property","did",did); //,"name",name,"value",value);
  for (var i = 1; i < arguments.length-1; i+=2) e.setAttribute(arguments[i],arguments[i+1]);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.setStyle = function(did,name,value)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-style","did",did); //,"name",name,"value",value);
  for (var i = 1; i < arguments.length-1; i+=2) e.setAttribute(arguments[i],arguments[i+1]);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.setImage = function(did,data)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-image","did",did,"data",data);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.setNativ = function(cmd,did)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,cmd,"did",did);
  for (var i = 2; i < arguments.length-1; i+=2) e.setAttribute(arguments[i],arguments[i+1]);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.toFront = function(did)
  {
  var xd = this.XDOC;
  var e = null;
  for (var i = 0; i < arguments.length; i++)
   {
   var e = this.XL.newElement(xd,"to-front","did",arguments[i]);
   xd.getDocumentElement().appendChild(e);
   }
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.focus = function(did)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-focus");
  if (did) e.setAttribute("did",did);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.addRow = function(did)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"add-row","did",did);
  for (var i = 1; i < arguments.length; i++) e.setAttribute("txt"+(i-1),arguments[i]);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.clearTable = function(did)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"clear-table","did",did);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.setTableCell = function(did,row,col,text)
  {
  var xd = this.XDOC;
  var e = this.XL.newElement(xd,"set-table-cell","did",did,"row",row,"col",col,"text",text);
  xd.getDocumentElement().appendChild(e);
  this.LAST_XELEMENT = e;
  return(this);
  }

// -----------------------------------------------------------------
 this.addAttribute = function()
  {
  for (var i = 0; i < arguments.length-1; i+=2) this.LAST_XELEMENT.setAttribute(arguments[i],arguments[i+1]);
  return(this);
  }

// -----------------------------------------------------------------
 this.addElement = function(e)
  {
  e = this.XDOC.importNode(e,true);
  this.LAST_XELEMENT.appendChild(e);
  return(this);
  }

/*
// -----------------------------------------------------------------
 this.putmas = function(fn,xx) // html,script0,script1,script2,...
  {
  var s = null;
  if (fn instanceof Array)
   {
   var oo = new java.io.ByteArrayOutputStream();
   var p0 = fn[0];
   for (var i = 1; i < fn.length; i++) java.nio.file.Files.copy(p0.resolve(fn[i]),oo);
   s = oo.toString();
   }
  else
   {
   s = JL.load(fn).asString();
   }

  if (s != null)
   {
   this.cls().setHtml(s);
   if (xx instanceof Array)
    {
    var p0 = xx[0];
    for (var i = 1; i < xx.length; i++)
     {
     var s = JL.load(p0.resolve(xx[i]).toString()).asString();
// <?xml 
     if (s == null) return(this.cls());
     this.setScript(s);
     }
    }
   else
    {
    for (var i = 1; i < arguments.length; i++)
     {
     var s = JL.load(arguments[i]).asString();
// <?xml 
     if (s == null) return(this.cls());
     this.setScript(s);
     }
    }
   if (this.LAST_SCRIPT_CODE) this.setScript(this.LAST_SCRIPT_CODE);
   this.writeXml();
   }
  return(this.cls());
  }
*/

// -----------------------------------------------------------------
 this.installInputQueue = function()
  {
  var m = java.lang.System.getProperties().get("Xml100Selector");
  var q = new Packages.frank.lib.xml100.Xml100InputQueue().addContextInput();
  var k = m.cmd("register",q.SOURCE);
//  k.attach(q.RCV);
  q.RCV.setup(k,m.getThread(),k.OP_READ);
//  k.interestOps(k.OP_READ);
  this.IN = q;
  this.SEL = m;
  return(this);
  }

// -----------------------------------------------------------------
 this.osExec = function(cmd)
  {
  var aa = new Array();
  for (var i = 0; i < arguments.length; i++) aa.push(arguments[i]);
  var pgm = new Packages.frank.lib.PgmV0();
  var pb = pgm.newProcessBuilder(aa).redirectInput(new java.io.File("/dev/null"));
  return(pgm.osExec(pb,true));
  }

// -----------------------------------------------------------------
 this.logdoc = function(d)
  {
  if (!d) d = this.RDOC;
  try
   {
   this.LOG.log(new java.lang.String(this.XL.toByteArray(d)));
   }
  catch(ex)
   {
   this.LOG.log("ex="+ex);
   }
  return(this);
  }

// -----------------------------------------------------------------
 this.newPageWorker = function(did)
  {
  return(new this.PageWorker(did,this));
  }

// -----------------------------------------------------------------
 this.PageWorker = function(did,l1)
  {
  this.DID = did;
  this.L1 = l1;

// -----
  this.setSize = function(w,h)
   {
   this.L1.setNativ("set-size",this.DID,"w",w,"h",h);
   return(this);
   }

// -----
  this.clear = function()
   {
   this.L1.setNativ("clear",this.DID);
   return(this);
   }

// -----
  this.setFont = function(fnt,t,h)
   {
   this.L1.setNativ("set-font",this.DID,"font",fnt,"typ",t,"size",h);
   return(this);
   }

// -----
  this.paintString = function(s,x,y,ax,ay)
   {
   if (!ax) ax = "0";
   if (!ay) ay = "0";
   this.L1.setNativ("paint-string",this.DID,"text",s,"x",x,"y",y,"ax",ax,"ay",ay);
   return(this);
   }

// -----
  this.paintLine = function(x,y,w,h)
   {
   this.L1.setNativ("paint-line",this.DID,"x",x,"y",y,"w",w,"h",h);
   return(this);
   }

  }

 };

