#! /bin/bash

cd $(dirname $0)

. $PWD/cnf/job-inqueue-02.cnf

if [ ! "$TBN" ]; then echo "$0: TBN missing" >&2; exit 1; fi
if [ ! "$my" ]; then echo "$0: my missing" >&2; exit 2; fi
if [ ! "$myr" ]; then echo "$0: myr missing" >&2; exit 3; fi
if [ ! "$LOG" ]; then echo "$0: LOG missing" >&2; exit 4; fi

mdnt=0
uid=0
user=user
phase=phase
appl=appl

while [ $# -gt 1 ]; do
 if [ "$1" == "mdnt" ];  then mdnt="$2"; fi
 if [ "$1" == "uid" ];   then uid="$2"; fi
 if [ "$1" == "user" ];  then user="$2"; fi
 if [ "$1" == "phase" ]; then phase="$2"; fi
 if [ "$1" == "appl" ];  then appl="$2"; fi
 if [ "$1" == "cmd" ];   then break; fi
 shift 2
done

if [ $# -lt 2 ]; then echo "$0: cmd missing - exit" >&2; exit 1; fi
shift
cmd="$1"
shift

s="insert into $TBN set impinsdt=now(),impst=0,impmdnt=$mdnt,impuid=$uid,impuser='$user',impphase='$phase',impappl='$appl'\
,imparg0='$cmd',impargs='$*'"
echo "$s" | $my

function mj()
 {
 while [ 1 ]; do
  s="lock tables $TBN write;\
     select min(impidx),max(impst) from $TBN where impst in (0,98) and impphase='$phase' into @idx,@st;\
     update $TBN set impst=98 where impidx=@idx and @st=0;\
     select row_count() into @rc;\
     select concat(@st,' ',@rc);\
     select concat(impidx,'\n',impuid,'\n',impuser,'\n',impappl,'\n' ,imparg0,' ',impargs,'\n',impmdnt) from $TBN where impidx=@idx and impst=98 and @st=0 and @rc=1;\
     unlock tables"
  s=$(echo "$s" | $myr)
  ss=""
  IFS=$'\n'
  ss=($s)
  unset IFS
  erg="${ss[0]}"
  idx="${ss[1]}"
  uid="${ss[2]}"
  user="${ss[3]}"
  appl="${ss[4]}"
  cmd="${ss[5]}"
  mdnt="${ss[6]}"
  if [ "$mdnt" ]; then
   if [ "$erg" == "0 1" ]; then
    export XML100_IDX="$idx"
    export XML100_UID="$uid"
    export XML100_USER="$user"
    export XML100_MDNT="$mdnt"
    export XML100_APPL="$appl"
    export XML100_PHASE="$phase"
    $cmd
    erg=$?
    if [ $erg -eq 0 ]; then st=99; else st=199; fi
    s="update $TBN set impst=$st,imperg='$erg' where impidx=$idx and impst=98"
    echo "$s" | $my
    continue
   fi
  fi

#  echo "already running" >&2
  break
 done
 }

#mj
mj </dev/null >>"$LOG" 2>>"$LOG" &

exit
