#!/bin/bash
dbPass='postgres'
dbHost='localhost'
myUsr='postgres'
myRdb='support_dev'
PGPASSWORD=${dbPass} psql -h ${dbHost} -U ${myUsr} -P pager=on --set AUTOCOMMIT=off -c 'CREATE DATABASE supply_chain;'
gnome-terminal -- ./dbserver.sh
gnome-terminal -- ./blockchain.sh
gnome-terminal -- ./frontendscript.sh

