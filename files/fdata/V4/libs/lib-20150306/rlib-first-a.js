// -----------------------------------------------------------------
RlibFirst_a = function(name)
 {
 ERG = 7;

 CCX = Packages.frank.lib.CurrentContext.context();
 SLOG = new Packages.frank.lib.Log(name);
 JL = new Packages.frank.lib.script.JsCommands();
 JL.cd(JL.getarg(0,null)+"/..");

 MY_FNAM = CCX.getwd().resolve(JL.getargs()[0]).normalize();
 MY_DIR = MY_FNAM.getParent();
 PAK_DIR = MY_DIR.getParent();

 MDNT = CCX.getenv("XML100_MDNT","0");
 UID = CCX.getenv("XML100_UID","0");
 USER = CCX.getenv("XML100_USER","user");
 UNAME = CCX.getenv("XML100_UNAME","uname");
 REMOTEIP = CCX.getenv("XML100_REMOTE_IP","nac");
 }

RlibFirst = RlibFirst_a;
RlibFirst_a = null;
