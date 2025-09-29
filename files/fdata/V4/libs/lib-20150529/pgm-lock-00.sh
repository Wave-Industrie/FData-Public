#! /bin/bash

cd $(dirname $0)
. cnf/pgm-lock-00.cnf

mode=$1
mypid=$2
pgm=$3
log=$4

a=/
pgm=${pgm//$a/-}
dn=$LOCKS_DN/$pgm

mkdir -p $dn

if [ "$mode" == "-l" ]; then
 echo >$dn/$mypid
 s=$(ls $dn)
 if [ "$s" != $mypid ]; then
  rm "$dn/$mypid"
  if [ "$log" == yes ]; then echo "$0: lock failed: $dn/$mypid" >&2; fi
  exit 1
 fi
 exit 0
fi

if [ "$mode" == "-u" ]; then
 if [ -r "$dn/$mypid" ]; then
  rm "$dn/$mypid"
  exit 0
 fi
 if [ "$log" == yes ]; then echo "$0: unlock failed: $dn/$mypid" >&2; fi
 exit 2
fi

echo "$0: unexpected mode=$mode< LOCKS_DN=$LOCKS_DN< mypid=$mypid< pgm=$pgm< dn=$dn<" >&2
exit 3
