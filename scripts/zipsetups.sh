#!/bin/bash
set -e

rm -rf build/audi90gto-setups.zip build/nissangtpzxt-setups.zip

cd public/setups/audi90gto && find . -type f | zip ../../../build/audi90gto-setups.zip -@ && cd ../../../
cd public/setups/nissangtpzxt && find . -type f | zip ../../../build/nissangtpzxt-setups.zip -@ && cd ../../../
