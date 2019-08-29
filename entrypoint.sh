#!/bin/bash -i

wait-for-it db:5432 -- "$@"