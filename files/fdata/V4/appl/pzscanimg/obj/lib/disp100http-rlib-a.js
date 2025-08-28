// -----------------------------------------------------------------
Disp100httpRlib = function()
 {

// ---------------------
 this.mkHtml = function(doc,winid,cid,x,y,w,h)
  {
  var etag = "winid/"+winid;
  if (cid) etag += "/cid/"+cid;
  if (x)   etag += "/x/"+x;
  if (y)   etag += "/y/"+y;
  if (w)   etag += "/w/"+w;
  if (h)   etag += "/h/"+h;

  var ho = new HttpObject(200,"OK").cache(false).mime("text/html").props("etag",etag).createHeader(Xml100Lib.toByteArray(doc));
//this.LOG.log("-> write="+new java.lang.String(ho.BB0));
  return(ho);
  };

// ---------------------
 this.mkDocCommand = function(doc,cmd,d100ssid) // ???
  {
  var ho = new HttpObject("PUT",d100ssid+cmd).cache(false).mime("application/xml").createHeader(Xml100Lib.toByteArray(doc));
//this.LOG.log("-> writeDocCommand="+ho);
  return(ho);
  };

// ---------------------
 this.mkDocReply = function(doc,winid,cid)
  {
  var etag = "winid/"+winid;
  if (cid) etag += "/cid/"+cid;
  var ho = new HttpObject(200,"OK").cache(false).mime("application/xml").props("etag",etag).createHeader(Xml100Lib.toByteArray(doc));
//this.LOG.log("-> write="+new java.lang.String(ho.BB0));
  return(ho);
  };

/*
// ---------------------
 this.reqClose = function()
  {
  var doc = Xml100Lib.newDocument("a");
  var e = Xml100Lib.newElement(doc,"close-winid","winid",this.WINID);
  doc.getDocumentElement().appendChild(e);
  this.writeDocReply(doc,"winid-desktop");
  return(this);
  };
*/

 };

