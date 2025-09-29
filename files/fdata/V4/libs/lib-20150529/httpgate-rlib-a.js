
// --------------------------------------------------------------------------------
HttpGateRlib = function()
 {
 this.register = function(ccx,port,httpgatecmd,slog)
  {
  var ii = null;
  try
   {
   ccx.setChildContext(null,new java.io.File("/dev/null"),new java.io.File("/dev/null"),null,null,null);
   var pb = new java.lang.ProcessBuilder(new java.lang.String(httpgatecmd).concat(" "+port).split(" "));
   pb.redirectError(java.lang.ProcessBuilder.Redirect.INHERIT);
   pb.redirectInput(new java.io.File("/dev/null"));
   pb.redirectOutput(java.lang.ProcessBuilder.Redirect.PIPE);
   var env = pb.environment();
   env.putAll(ccx.getenv());
   ii = java.nio.channels.Channels.newChannel(pb.start().getInputStream());
   var rb = java.nio.ByteBuffer.allocate(1000);
   while(ii.read(rb) > 0) continue;
   ii.close();
   return(new java.lang.String(rb.array(),0,rb.position()));
   }
  catch(ex)
   {
   slog.log("ex="+ex);
   }
  Packages.frank.lib.IoLib.close(ii);
  return(null);
  }
 }
