//source $_/lib/rlib-first-a.js $_/lib/rlib-os-a.js

VERSION = "2014-12-26"

importPackage(Packages.frank.lib,Packages.frank.lib.script,java.lang,java.util);

new RlibFirst("startup");

function mj()
 {
 var p = CCX.getwd().resolve("../PID.running").normalize();
 var fd = p.toFile();
 fd.deleteOnExit();

 var erg = new ProcessBuilder("bash","-c","echo $PPID").inheritIO().redirectOutput(fd).start().waitFor();
 if (erg != 0) System.exit(77);

 var rlos = new RlibOs();

 var ss = JL.load(MY_DIR.getParent().resolve("cnf/startup-modules").toString()).asString().replace("\r","").split("\n");
 for (var i = 0; i < ss.length; i++)
  {
  var aa = ss[i].trim().split(" ");
  if (aa.length == 0) continue;
  var aa0 = aa[0].trim();
  if (aa0.startsWith("#")) continue;
  if (aa0.startsWith("//")) continue;
  if (!aa0.startsWith("/")) aa0 = MY_DIR.resolve(aa0).normalize().toString();
  aa[0] = aa0;

//SLOG.log("aa=",aa);
  if (aa0.endsWith(".js") == true)
   {
   var pgm = new JavaPgm(aa).forShebang(); //.forAll();
   if (!pgm.can())
    {
SLOG.log("can="+pgm.can()+" AA0=",pgm.AA0);
    continue;
    }
   CCX.setChildContext(null,null,null,null,null,null);
   var ex = new CurrentContextThread(pgm,aa[0]).waitFor();
   var erg = pgm.ERG;
   if ((erg != 0) || (ex != null)) SLOG.log("erg="+erg+" ex="+ex);
   continue;
   }

  if (aa0.endsWith(".sh") == true)
   {
   var erg = rlos.pgm(aa).exec();
   if (erg != 0) SLOG.log("erg="+erg);
   continue;
   }

SLOG.log("unsupported suffix: "+aa0);
  }
 }

SLOG.log("hi: "+JL.pwd());
try
 {
 mj();
 }
catch(ex)
 {
 SLOG.log("ex="+ex);
 System.exit(1);
 }

SLOG.log("ciau");

0;
