#! /bin/jash2 -jvm=jvm-0
//! frank.lib.script.JsRhino
//source $_/lib/rlib-first-a.js $_/lib/rlib-html-a.js $_/lib/disp100http-rlib-a.js $_/lib/disp100worker-rlib-a.js $_/lib/disp100xml100-rlib-b.js $_/lib/rlib-sql-a.js $_/../cnf/pzscanimg-cnf.js

ERG = 7;

importPackage(Packages.frank.lib,Packages.frank.lib.script,Packages.frank.lib.net,Packages.frank.lib.disp100,Packages.frank.lib.xml100,java.lang,java.io,java.nio.file,java.util);

new RlibFirst("pzscanimg");

SQLNRI = [ PAK_DIR.toString(),"cnf","sqls","sql" ];
SQL = null;

ASQLNRI = [ PAK_DIR.toString(),"cnf","sqls","asql" ];
ASQL = null;

LQ = new RlibSql();

DISPLAY = CCX.getenv("XML100_DISPLAY")
DTOPID  = CCX.getenv("XML100_DTOPID");

PORT_100 = System.getProperty("frank.lib.disp100.portfile");
PORT_100 = SysFmt.parse(JL.load(PORT_100).asString(),-1);

HTML_FILE = "pzscanimg.html";

/*
PORT_ORES = System.getProperty("frank.lib.ores.portfile");
PORT_ORES = java.lang.Integer.parseInt(JL.load(PORT_ORES).asString());
HW_ORES = null;

TVOUTUID = null;
OW = JL.getargs();
for (var i = 1; i < OW.length-1; i+=2)
 {
 if (OW[i] == "--tvoutuid")
  {
  TVOUTUID = OW[i+1];
  break;
  }
 }
OW = null;
*/

MQ = new ConcurrentMultiQueue("timer");
MQ.setTimeout(1000);
L1 = new Disp100xml100Rlib(SLOG);

DW = null;

Z_WAIT_WINDOW         = 1;
Z_WAIT_BCR            = 2;

TO_WAIT_WINDOW        = 30;
TO_WAIT_BCR           = 0;


TEXT_Z = [ "???-NIX-???","Z_WAIT_WINDOW","Z_WAIT_BCR" ];

//------------------------------------------------------------------------
function hasBild(env,tenr)
 {
 return(new java.io.File(BILDERDIR+"/"+tenr+BILDER_SUFFIX).canRead());
 }

//------------------------------------------------------------------------
function loadBild(env,tenr)
 {
 var s = null;
 try
  {
  var oo = new ByteArrayOutputStream();
  var oo64 = new Base64EncoderStream(oo,false);
  Files.copy(Paths.get(BILDERDIR,tenr+BILDER_SUFFIX),oo64);
  oo64.close();
  oo.write(10);
  oo.close();
  s = oo.toString();
  if (s.length() > 64000) s = null;
  }
 catch(ex)
  {
  SLOG.log("ex="+ex);
  s = null;
  }
//SLOG.log(">>>>>>>>>>>>>>>"+s.length());

 return(s);
 }

// -----------------------------------------------------------------
function loadTenr(env,pznr)
 {
 ASQL = LQ.sqlsetup(ASQL,ASQLNRI);
 ASQL.sendNames(false);
//ASQL.setTrace(true);

 var s = "select trim(sltenr) from lgsl where slfirm=? and slwknr=? and slauft=? and sllkkz='1'";
 var v = new ArrayList();
 ASQL.qryv(v,s,new Array("5","555",pznr));
 if (v.size() < 1) return(null);
 return(v.get(0)[0]);
 }


// -----------------------------------------------------------------
function bcrReceived(env)
 {
 var bcr = env.bcr;

// if (bcr.length() == 1) bcr = bcr.concat("zzz-test").substring(1);
// if (bcr == "2") bcr = bcr.concat("xxx-test").substring(1);
// if (bcr == "3") bcr = bcr.concat("yyy-test").substring(1);


SLOG.log("bcr="+bcr);

 var errtxt = "Barcode "+bcr+" falsch";

 while(true)
  {
/*
  if (TVOUTUID == null)
   {
   errtxt = "Display: scannen nicht zugelassen";
   break;
   }
*/

  if (bcr.startsWith("J") == true) bcr = bcr.substring(1);
  if (bcr.startsWith("PS") != true) break;
  var pznr = SysFmt.parse(bcr.substring(5),-1);
  if (pznr < 1) break;

  var tenr = loadTenr(env,pznr);

  if (tenr == null)
   {
   errtxt = "PZ="+pznr+" fehlt";
   break;
   }

SLOG.log("pznr="+pznr+" tenr="+tenr);

  if (hasBild(env,tenr) != true)
   {
   errtxt = ""+tenr+": Bild fehlt";
   break;
   }
/*
  if (OW == null)
   {
   errtxt = "TV Display fehlt";
   break;
   }

  var doc = Xml100Lib.newDocument("pzscanimp","tenr",tenr);
  HW_ORES.write(OW.sendTo("pzscanimg-"+TVOUTUID,null,doc));
*/


  var s = loadBild(env,tenr);
  if (s == null)
   {
   errtxt = "Bild für Teilenummer "+tenr+" fehlt";
   break;
   }


  L1.info("Bild für Teilenummer "+tenr+" wird angezeigt").setImage("bild",s);

  return;
  }

 L1.e22(errtxt).setImage("bild","");
 }


// -----------------------------------------------------------------
function bcrD100Received(env)
 {
 if (env.ST != Z_WAIT_BCR) return(env.exit());
 if (env.type == "scanner") return(bcrReceived(env));
 }


// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// global
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
/*
function httpReceived(env,src,e0,cmd) // z.b. all-info
 {
 if (cmd == "get-all-info")
  {
  WRK100.logEndpoints(e0);
  return;
  }
 }

// -----------------------------------------------------------------
function oresReceived(env,o)
 {
SLOG.log("ores.o="+o+" "+TVOUTUID);
 if (o == "offline") return(env.exit());
 if (o == "online")
  {
SLOG.log("OW="+OW+" aa=",JL.getargs());
  if (OW != null) return(env.exit());
  OW = new OresHttpRlib();
  if (TVOUTUID == null)
   {
   HW_ORES.write(OW.register("pzscanimg-"+UID));
   }
  return;
  }

 if (o instanceof HttpObject)
  {
  var doc = Xml100Lib.newDocument(o.BB,o.HL,o.CL);
  var tenr = doc.getDocumentElement().getAttribute("tenr");

  var s = loadBild(env,tenr);
  if (s == null)
   L1.e22("Bild für Teilenummer "+tenr+" fehlt").setImage("bild","");
  else
   L1.info("Bild für Teilenummer "+tenr+" wird angezeigt").setImage("bild",s);
  }
 }
*/

// -----------------------------------------------------------------
function input100Received(env,src,doc)
 {
//SLOG.log("input100Received from="+src.NAME);
 L1.rdoc(doc);
//L1.logdoc();
// extractCookie(env,src);

 L1.e22("");

 env.type = L1.eventType();
 env.keyCode = L1.keyCode();
 env.srcId = L1.srcId();
 env.pId = L1.parentId();
// env.epid = L1.cookie(L1.cookie(),"epid");
 env.bcr = L1.scanString().trim();

SLOG.log("type="+env.type+" keyCode="+env.keyCode+" srcId="+env.srcId+" pId="+env.pId+" bcr="+env.bcr);

 if (!env.D100FCT) return(env.exit());

 env.D100FCT(env);

 L1.enableInput();
 }

// -----------------------------------------------------------------
function windowStateReceived(env,src,b)
 {
//SLOG.log("windowStateReceived.b="+b+" from="+src.NAME+" ho="+src.LAST_RECEIVED_HO);
 if ((b == true) && (env.ST == Z_WAIT_WINDOW))
  {
  L1.enableInput().setSendKeys("").enableScan("bdy").setText("tit","Teilebild Versand").info("zur Anzeige: Packzettel scannen");
  setState(env,Z_WAIT_BCR,TO_WAIT_BCR,bcrD100Received,null);
  return;
  }
 env.exit();
 }

// -----------------------------------------------------------------
function browserStateReceived(env,src,b)
 {
//SLOG.log("browserStateReceived.b="+b+" from="+src.NAME);
 if ((b == true) && (env.ST == Z_WAIT_WINDOW))
  {
  var html_file = MY_DIR.resolve(HTML_FILE).normalize().toString();
  var doc = new RlibHtml().loadHtml(html_file).DOC;
  var ho = new Disp100httpRlib().mkHtml(doc,DTOPID,src.CID,10,10,400,150);
  src.write(ho);
  return;
  }
 env.exit();
 }

// -----------------------------------------------------------------
function gotoWaitWindow(env)
 {
 var rq = MQ.newChildQueue("d100");
 var hw = DefaultHttpWorker.connect("127.0.0.1",PORT_100,rq,DefaultSelectorExecuter4.getDefaultExecuter().start());
 DW = new Disp100workerRlib(hw,DISPLAY,"d100").installDefaults(env);
 setState(env,Z_WAIT_WINDOW,TO_WAIT_WINDOW,null,null);

// oresConnect(env);
 }

/*
// -----------------------------------------------------------------
function oresConnect(env)
 {
 var rq = MQ.newChildQueue("ores");
 HW_ORES = DefaultHttpWorker.connect("127.0.0.1",PORT_ORES,rq,DefaultSelectorExecuter4.getDefaultExecuter().start());
 }
*/

// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// functions
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
function setState(env,st,sec,d100fct,timerfct)
 {
SLOG.log("setState.st="+TEXT_Z[st]+" sec="+sec);
 env.ST = st;
 if (sec)
  DW.reqTimer(sec*1000);
 else
  DW.clrTimer();

 env.D100FCT = d100fct;
 env.TIMERFCT = timerfct;
 }


// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// fehler
// -----------------------------------------------------------------
// -----------------------------------------------------------------
// -----------------------------------------------------------------
function offlineReceived(env,src)
 {
SLOG.log("offlineReceived from="+src.NAME);
 env.exit();
 }


// -----------------------------------------------------------------
function timeoutReceived(env,src)
 {
SLOG.log("timeout");
 if (env.TIMERFCT)
  env.TIMERFCT(env);
 else
  env.exit();
 }

// -----------------------------------------------------------------
function mj()
 {
 var env = {};

 env.EXIT = false;
 env.exit = function()
  {
  this.EXIT = true;
  };

 gotoWaitWindow(env);

 while(env.EXIT == false)
  {
  if (L1.has2xmt()) DW.wrXml100(L1.xdoc());

  var o = MQ.take();
  var src = MQ.getSource();

  if (src == "timer")
   {
   DW.doEvent("timer");
   MQ.setTimeout(1000);
   continue;
   }

//SLOG.log("ST="+env.ST+" src="+src); //+" o="+o);

/*
  if (src == "ores")
   {
   oresReceived(env,o);
   }
  else
   {
//if (o instanceof HttpObject) SLOG.log("<-"+new java.lang.String(o.BB));
   DW.doEvent(o);
   }
*/

  DW.doEvent(o);


  SQL = LQ.sqlclose(SQL);
  ASQL = LQ.sqlclose(ASQL);
  }
 }

// -----------------------------------------------------------------
function closeAll()
 {
 if (DW) DW.close();
// if (HW_ORES) HW_ORES.close();

 SQL = LQ.sqlclose(SQL);
 ASQL = LQ.sqlclose(ASQL);
 }


SLOG.log("hi");
try
 {
 mj();
 ERG = 0;
 }
catch(ex)
 {
 SLOG.log("ex="+ex);
 ERG = 8;
 }

closeAll();

SLOG.log("ciau");

ERG;
