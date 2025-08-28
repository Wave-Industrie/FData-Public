// ***********************************
// hlib-comps01
// popfct (z.b fuer scanner)
// ***********************************

// =======================================================================
HlibComps01 = function()
 {
 HlibStdlib.call(this);

//-----
 this.installElement = function(alldefs,e0)
  {
  var n = e0.id;
  var defs = alldefs[n];

  if (e0.className.indexOf("POPFCT") >= 0) this.installPopfct(alldefs,e0,defs);
  if (e0.className.indexOf("scan") >= 0) this.installScanner(alldefs,e0,defs);
  if (e0.className.indexOf("bild") >= 0) this.installBild(alldefs,e0,defs);
  };

//-------------------
 this.installPopfct = function(alldefs,e0)
  {
log("install popfct");

  e0.ALLDEFS = alldefs;

  e0["set-popup-menu"] = function(e)
   {
   var lib = HlibComps01.ICH;
   if (e instanceof Array)
    {
    var aa = e;
    lib.removeAllChilds(this);
//lib.getComponentSize(this);
    for (var i = 0; i < (aa.length-1); i+=2)
     {
log("id="+aa[i]+" value="+aa[i+1]);
     }
    }
   else
    {
    var nl = e.childNodes;
    var pp = new Array();
    for (var i = 0; i < nl.length; i++) pp.push(nl[i].nodeName,nl[i].lastChild.nodeValue);
    this["set-popup-menu"](pp);
    }

   };

//   var pp = this.DEFS.POPUP;
//   pp.splice(1,pp.length-1);
//   for (var i = 0; i < nl.length; i++) pp.push(nl[i].nodeName,nl[i].lastChild.nodeValue);

  e0["toggle-on"] = function()
   {
   if (this["do-toggle"].ENA != true) return;
   this.style.zIndex = 0;
   this["do-toggle"].IS_ON = true;
   var zi = 0;
   var cc = this.parentNode.childNodes;
   for (var i = 0; i < cc.length; i++)
    {
    var c = cc[i];
    if (c.style && c.style.zIndex) zi = Math.max(zi,c.style.zIndex);
    }
   this.style.zIndex = zi+1;
   };

  e0["toggle-off"] = function()
   {
   if (this["do-toggle"].ENA != true) return;
   this.style.zIndex = 0;
   this["do-toggle"].IS_ON = false;
   };

  e0["do-toggle"] = function()
   {
   if (this["do-toggle"].ENA != true) return;
//log("ison="+this["do-toggle"].IS_ON);
   if (this["do-toggle"].IS_ON == true)
    this["toggle-off"]();
   else
    this["toggle-on"]();
   };

  e0["enable-toggle"] = function(b)
   {
log("enable-toggle="+b);
   if (b == true)
    {
    this["do-toggle"].ENA = true;
    return;
    }
   if (b == false)
    {
    this["do-toggle"].ENA = false;
    return;
    }
   b = (b.getAttribute("enabled") == "1");
   this["do-toggle"].ENA = b;
   };

  e0["is-enabled"] = function()
   {
   return(this["do-toggle"].ENA == true);
   };

  e0["is-on"] = function()
   {
   return(this["do-toggle"].IS_ON == true);
   };

  e0["do-toggle"].ENA = true;

  };


//-------------------
 this.installScanner = function(alldefs,e0)
  {
  window.focus();

  var sc = function(e0)
   {
   this.S = null;
//   if (defs.scannerOnenter) e0["on-enter"] = defs.scannerOnenter;

   this.keyReceived = function(evnt,f2)
    {
    var l1 = HlibComps01.ICH;
    evnt = l1.getEvent(evnt);
    var kc = l1.getKeyCode(evnt);

//log("src="+l1.getSource(evnt)+" kc="+kc+" type="+evnt.type+" ena="+this["scan-enabled"]); //+" "+l1.getProps(evnt,true));

    if (this["scan-enabled"] != true)
     {
     if (f2) return(f2(evnt));
     return;
     }

    if (typeof kc == "undefined") return;

    if ((kc == 10) || (kc == 13))
     {
     if (this.S == null) return;
     var s = this.S;
     this.S = null;
//log("<-"+s);
     var o = l1.newPseudoEvent("scanner","scanner");
     o["scanString"] = encodeURIComponent(s);
     if (f2) return(f2(o));
     return;
     }

    var s = String.fromCharCode(kc);
//      if ((s < ' ') || (s > 'z')) s = "#"+kc+"#";
    if (s < ' ') s = "#"+kc+"#";
    if (this.S == null) this.S = "";
    this.S += s;
//    l1.setText(this,this.S);
    };
/*
   e0.scanData = function(e)
    {
    var s = (typeof this.S == "string") ? this.S : "";
    e.setAttribute(this.id,encodeURIComponent(s));
    };
*/
   };

  e0["set-scan-enabled"] = function(e)
   {
   HlibComps01.SCANNER["scan-enabled"] = (e.getAttribute("enabled") == "yes");
   HlibComps01.SCANNER.S = null;
   };

  HlibComps01.SCANNER = new sc(e0);
  HlibComps01.scanReceived = function(evnt,f2)
   {
   return(HlibComps01.SCANNER.keyReceived(evnt,f2));
   };

  };

//-------------------
 this.installBild = function(alldefs,e0)
  {
  this.removeAllChilds(e0);
  var p1 = document.createElement("div");
  p1.style.position = "absolute";
//  p1.style.width = "100%";
//  p1.style.height = "100%";
  var img = document.createElement("img");
  p1.appendChild(img);
  e0.appendChild(p1);

  e0["set-image"] = function(e)
   {
   var data = e.getAttribute("data");
   if (!data) data = "";
   var img = this.firstChild.firstChild;
   img.src = "";
   img.src = "data:image/jpg;base64,"+data;
   };

  img.onload = function(evnt)
   {
//log("onload");
   var p1 = this.parentNode;
   var p0 = p1.parentNode;
   var w0 = p0.clientWidth;
   var h0 = p0.clientHeight;

   var w = this.width;
   var h = this.height;
   var fw = w0/w;
   var fh = h0/h;
   if (fw > fh) fw = fh;
   var w1 = 1*(new Number(w*fw).toFixed());
   var h1 = 1*(new Number(h*fw).toFixed());
   var dx = 1*(new Number((w0-w1)/2).toFixed());
   var dy = 1*(new Number((h0-h1)/2).toFixed());

//log("w0="+w0+" h0="+h0+" w="+w+" h="+h+" w1="+w1+" h1="+h1+" dx="+dx+" dy="+dy+" "+evnt.type);

//   p1.style.position = "absolute";
   p1.style.top = ""+dy+"px";
   p1.style.left = ""+dx+"px";
   p1.style.width = ""+w1+"px";
   p1.style.height = ""+h1+"px";

//      this.style.width = ""+w1+"px";
//      this.style.height = ""+h1+"px";

   this.width = w1;
   this.height = h1;
   };

  };

 };

HlibComps01.ICH = new HlibComps01();

// =======================================================================


/*
//--------------
 this["set-image"] = function(e0)
  {
  var did = e0.getAttribute("did");
  if (!did) return;
  var data = e0.getAttribute("data");
  if (!data) data = "";

  var doc = getChildDocument();
  var e = doc.getElementById(did);
  if (!e) return;
  if (e.nodeName != "IMG") return;
  var img = doc.createElement("img");
  img.id = e.id;
  img.onload = e.onload;
  e.parentNode.replaceChild(img,e);

  img.src = "data:image/jpg;base64,"+data;
  }
*/