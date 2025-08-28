// =========================================================
RlibSql_a = function()
 {

// ---------------------------------------------------------
 this.newio = function(mdnt,uid,user)
  {
  if (!mdnt) mdnt = 0;
  if (!uid) uid = 0;
  if (!user) user = "no-user";
  var io = new Packages.frank.lib.IoIO();
  io.MDNT = mdnt;
  io.UID = uid;
  io.USER = user;
  return(io);
  }

// ---------------------------------------------------------
 this.sqlsetup = function(sql,sqlnri)
  {
  if (sql != null) return(sql);
  var io = this.newio();
  var sql = new Packages.frank.lib.sql.Sql(io,sqlnri);
// sql.setTrace(SQL_TRACE);
// SQL.setStream(false);
  return(sql);
  }

// ---------------------------------------------------------
 this.sqlclose = function(sql)
  {
  if (sql != null) sql.close();
  return(null);
  }

 }

RlibSql = RlibSql_a;
RlibSql_a = null;
