// *****************************************************************
// frank.lib

RlibOs = function()
 {
 this.PB = null;

// -----------------------------------------------------------------
 this.pgm = function(cmd)
  {
  var ccx = Packages.frank.lib.CurrentContext.context();
  var pb = new java.lang.ProcessBuilder(cmd);
  this.PB = pb;
  var v = pb.command();
  for (var i = 1; i < arguments.length; i++) v.add(arguments[i]);
  pb.redirectInput(new java.io.File("/dev/null"));
  pb.redirectOutput(new java.io.File("/dev/null"));
  pb.redirectError(java.lang.ProcessBuilder.Redirect.INHERIT);
  var env = pb.environment();
  env.putAll(ccx.getenv());
//  ccx.setChildContext(null,new File("/dev/null"),new File("/dev/null"),null,null,null); // weg wenn in ContextManager weg
  return(this);
  };

// -----------------------------------------------------------------
 this.exec = function()
  {
  var ccx = Packages.frank.lib.CurrentContext.context();
  try
   {
   var p = this.PB.start();
   return(p.waitFor());
   }
  catch(ex)
   {
   ccx.err().println("ex="+ex);
   return(""+ex);
   }
  };

// -----------------------------------------------------------------
 this.fork = function()
  {
  var ccx = Packages.frank.lib.CurrentContext.context();
  try
   {
   return(this.PB.start());
   }
  catch(ex)
   {
   ccx.err().println("ex="+ex);
   return(null);
   }
  };

 };

