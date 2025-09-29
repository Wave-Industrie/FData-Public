#! /bin/bash

cd $(dirname $0)

. cnf/splf-inqueue-01.cnf

fn=""
subj=""
name=""

while [ $# -gt 1 ]; do
 if [ "$1" == "-fn" ]; then fn="$2"; fi
 if [ "$1" == "-name" ]; then name="$2"; fi
 if [ "$1" == "-subj" ]; then subj="$2"; fi
 shift
 shift
done

if [ ! -r "$fn" ]; then exit 2; fi
if [ ! "$name" ]; then exit 3; fi
if [ ! "$subj" ]; then exit 4; fi

$pgm MDNT $XML100_MDNT UID $XML100_UID USER $XML100_USER NAME "$name" fn "$fn" SUBJ "$subj"

exit
