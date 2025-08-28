//! frank.lib.script.JsRhino
//source $_/../cnf/cconnect-defines.js

ERG = 7;

importPackage(Packages.frank.lib,Packages.frank.lib.script,Packages.frank.lib.cconnect,Packages.frank.lib.net,java.nio,java.nio.channels,java.net,java.lang);

CCX = CurrentContext.context();
SLOG = new Log("cconnect-start");
JL = new JsCommands();
JL.cd(JL.getarg(0,null)+"/..");

function mj()
 {
 SLOG.log("jetzt cconnect starten: PWD="+JL.pwd()+" PORT="+PORT);

 CCX.inheritChildContext();
 var d = DefaultSelectorExecuter4.getDefaultExecuter().start();
//var d = new SelectorExecuter4().start();
 var ssoc = ServerSocketChannel.open().bind((PORT > 0) ? new InetSocketAddress("0.0.0.0",PORT) : null);
 ssoc.configureBlocking(false);
 var cc = new CConnectServer();
 cc.TRACE.set(TRACE);
 var k = d.cmd("register",ssoc);
 k.attach(cc);
 k.interestOps(k.OP_ACCEPT);
 var port = ssoc.getLocalAddress().getPort();
 JL.save("../jash2.port",""+port+"\n");
 var fd = JL.P.toFile();
 fd.deleteOnExit();
 SLOG.log("cconnect gestartet: ssoc="+ssoc);
 }

//SLOG.log("hi"+JL.pwd()+" "+PORT);
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
//SLOG.log("ciau");

ERG;

