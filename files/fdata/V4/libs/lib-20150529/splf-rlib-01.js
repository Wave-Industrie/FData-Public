// *****************************************************************
// braucht: rlib-os

// -----------------------------------------------------------------
SplfRlib = function(ccx,jl,pakdir)
 {
 this.CCX = ccx;
 this.JL = jl;
 this.PAKDIR = pakdir;

// ------------------
 this.inqXml = function(doc,name,subj)
  {
  var fd = java.io.File.createTempFile(name+"-",".xml");
  fd.deleteOnExit();
  var fn = fd.getAbsolutePath();
  var bb = Packages.frank.lib.Xml100Lib.toByteArray(doc);
  this.JL.save(fn,bb);

  var s = PAK_DIR.resolve("obj/lib/splf-inqueue-01.sh").normalize().toString();
  var erg = new RlibOs().pgm(s,"-name",name,"-fn",fn,"-subj",subj).exec();
  this.JL.rm(fd);
  return(erg);
  };
 };
