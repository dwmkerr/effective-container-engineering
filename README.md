# effective-container-engineering

Practical tips and patterns for building good container citizens

## Introduction

This document contains a set of tips, tricks and suggestions for building software which runs more effectively in containers. Please feel free to submit pull requests for more suggestions!

Some samples in this document require a Kubernetes cluster, there is an example of how to do this in [Appendix 1: Setting up a Kubernetes cluster]().


## Prefer a single process

In general containers should contain a single process. Not being aware of the difference between an exec form and shell form command, or the internals of how your runtime is executing code can lead to an unnecessarily complex process tree.

As an example, check the [`prefer-single-process`](./prefer-single-process) folder. Run the 'bad' container with:

```sh
make run-bad
```

Note that the process tree is unnecessarily messy (try `ps -axf`):

![Screenshot of messy process tree](./docs/psp-bad.png)

Compare this to the following:

```sh
make run-good
```

![Screenshot of clean process tree](./docs/psp-good.png)

A single process means that there's no chance that you will not have your app running as PID 1, which is important as we next in the next point.
 
### References

Take note of the 'exec form' vs 'shell form' in the following docs:

- [Docker Docs: CMD](https://docs.docker.com/engine/reference/builder/#cmd)
- [Docker Docs: ENTRYPOINT](https://docs.docker.com/engine/reference/builder/#entrypoint)

## Respect Signals

Expect to receive `SIGTERM` from Docker. Expect to receive `SIGINT` from TTY. Handle both, and be explicit you are doing so.

See: [`respect-signals`](./respect-signals) for an example.

By running the deployment in the provided [`./respect-signals/deployment.yml`](./respect-signals/deployments.yml) you can see each service updates quickly. However, changing deployments (for example, by updating the version number) will be *very* slow for containers which don't listen to stop signals.
 

## Appendix 1: Setting up a Kubernetes cluster

First, install the GCP Cloud SDK. On a Mac, the interactive installer is the easiest way to go:

```sh
curl https://sdk.cloud.google.com | bash
```

Follow the instructions, then restart your shell and initialise your environment:

```sh
exec -l $SHELL
gcloud init
```

For other platforms, and for non-interactive installs, follow the '[Google Cloud SDK Quickstart](https://cloud.google.com/sdk/docs/quickstarts)' guide.

Create a new project to work in, set is as the default, and set a default [zone](https://cloud.google.com/compute/docs/regions-zones/):

```sh
gcloud projects create container-engineering    # you'll need a unique name!
gcloud config set project container-engineering # set the default for now
gcloud config set compute/zone asia-southeast1  # use a zone close to you
```

Now create your cluster:

```sh
gcloud container clusters create container-engineering
```

If you get an 'API not enabled' error, just open the link in the error and hit the 'enable' button on the webpage shown.
