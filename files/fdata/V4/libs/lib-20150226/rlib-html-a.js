// -----------------------------------------------------------------
RlibHtml_a = function()
 {

 this.DOC = null;

// -------------------------------
 this.loadHtmlorg = function(fn)
  {
  this.DOC = null;
  var d = JL.load(fn).asDocument();
  var pfn = JL.P.getParent();

  var nl = d.getElementsByTagName("script");
  for (var i = 0; i < nl.getLength(); i++)
   {
   var fn = nl.item(i).getAttribute("src");
   if (fn == "") continue;
   nl.item(i).removeAttribute("src");
   fn = pfn.resolve(fn).normalize().toString();
//SLOG.log("fn="+fn);
   var s = JL.load(fn).asString();
   nl.item(i).setTextContent(s);
   }
  this.DOC = d;
  return(this);
  }

// -------------------------------
 this.loadHtml = function(fn)
  {
  var f = function(d,n,pfn)
   {
   var nl = d.getElementsByTagName(n);
   for (var i = 0; i < nl.getLength(); i++)
    {
    var fn = nl.item(i).getAttribute("src");
    if (fn == "") continue;
    nl.item(i).removeAttribute("src");
    fn = pfn.resolve(fn).normalize().toString();
//SLOG.log("fn="+fn);
    var s = JL.load(fn).asString();
    nl.item(i).setTextContent(s);
    }
   };

  this.DOC = null;
  var d = JL.load(fn).asDocument();
  var pfn = JL.P.getParent();

  f(d,"script",pfn);
  f(d,"style",pfn);

  this.DOC = d;
  return(this);
  }

// -------------------------------
 this.setTagAttr = function(tag,n,v)
  {
  this.DOC.getElementsByTagName(tag).item(0).setAttribute(n,v);
  return(this);
  }

 }
RlibHtml = RlibHtml_a;
RlibHtml_a = null;
