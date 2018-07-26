# effective-container-engineering

Practical tips and patterns for building good container citizens

## Introduction

This document contains a set of tips, tricks and suggestions for building software which runs more effectively in containers. Please feel free to submit pull requests for more suggestions!

## Prefer a single process

TODO

Take note of the 'exec form' vs 'shell form' in the following docs:

- [Docker Docs: CMD](https://docs.docker.com/engine/reference/builder/#cmd)
- [Docker Docs: ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint)

## Respect Signals
