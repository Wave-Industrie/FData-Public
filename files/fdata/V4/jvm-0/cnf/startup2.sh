#! /bin/bash

/bin/jash2 -jvm=jvm-0 /files/fdata/V4/base/confd/obj/confd-start.js

/bin/jash2 -jvm=jvm-0 /files/fdata/V4/base/disp100/obj/disp100-start.js
/bin/jash2 -jvm=jvm-0 /files/fdata/V4/base/htmld/obj/htmld-start.js
/bin/jash2 -jvm=jvm-0 /files/fdata/V4/base/httpgate/obj/httpgate-start.js

/bin/jash2 -jvm=jvm-0 /files/fdata/V4/base/ores/obj/ores-start.js


exit
