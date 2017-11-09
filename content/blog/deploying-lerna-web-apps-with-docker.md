## Deploying Lerna Web Apps with Docker

*This is a short guide on how to build docker images from the packages inside
a Lerna repository. It follows on from my previous post about managing client/server web apps with Lerna*

I now use [Docker](https://docs.docker.com/) to deploy all my Node.JS based web applications, most of which are also within repositories managed in some way by [Lerna](https://github.com/lerna/lerna) to modularize the application and link packages together. But building Docker images from such packages isn't quite as straight forward as building a non-Lerna Node app.

Here are few tips and tricks on how to get it working together with some caveats to be aware of.

### 1. Where to put the Dockerfile

Imagine we're working with a Lerna repository whose structure looks like this:

```text
myrepo
├── packages/app1-client/
├── packages/app1-server/
├── packages/app2-client/
├── packages/app2-server/
├── packages/api/
├── lerna.json
└── package.json
```

There are two client/server web applications. Both servers have their respective clients packages as dependencies and also share an "api" dependency containing code commonly used by both apps. Lerna's linking mechanism takes care of wiring all this together.

Suppose we want to create a docker image for *app1*. At a glance, it would be natural to want to put the Dockerfile in the `packages/app1-server` directory. But trying to build this will result in failure because Lerna will try to link packages which are outside of Docker's build context. To build an image, we must include all the required packages in the build context and Lerna bootstrap them within the Docker build (this does have the side-effect of making the docker build context larger than otherwise, but seems to be a necessary evil).

This can be achieved by building the Docker file from the repo's root using docker-build `--file` option:

```shell
docker build -t acme/app1 -f packages/app1-server/Dockerfile .
```

Alternatively, you can place the `Dockerfile` at the root of the repo. It's a matter of taste, but I prefer this because the image build *does* encompass multiple packages and it might also be unclear that a `Dockerfile` in a specific package directory must run from two directories up with the `--file` option.

```text
myrepo
├── packages/
├── Dockerfile
├── lerna.json
└── package.json
```

As is the case in this example, if there are multiple Docker images to build (app1 and app2), multiple Docker files are required; with different names. There doesn't appear to be any convention for naming Docker files which aren't just "Dockerfile" so I name them by suffixing "Dockerfile" with the respective app name:

```text
myrepo
├── packages/
├── Dockerfile.app1
├── Dockerfile.app2
├── lerna.json
└── package.json
```

This means the docker files will be ordered neatly together when the directory listing is alphabetical. Running `docker build` will require the `--file/-f` option though:

```shell
docker build -t acme/app1 -f Dockerfile.app1 .
```

### 2. Writing the Dockerfile

#### The base

First thing, using a Node base image, install Lerna globally (using NPM):

```dockerfile
FROM node:latest

WORKDIR /usr/src/app

RUN npm i lerna -g --loglevel notice
```

#### Copying the packages

Copy the root `package.json` and install, then copy the relevant packages.

```dockerfile
COPY package.json .
RUN npm install --loglevel notice

COPY packages/api ./packages/api
COPY packages/app1-client ./packages/app1-client
COPY packages/app1-server ./packages/app1-server
```

This copies over only the packages and the package dependencies required by **app1-server**, omitting the redundant app2 packages and therefore minimizing the size of the image. Copying the repo's root `package.json` and installing before copying the packages takes advantage of Docker's layered caching mechanism. Meaning, that a root `npm install` will only occur if the root `package.json` changes. [Read more about that here](http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/).

The `COPY` commands should also ignore the `node_modules` directories within the packages, so a fresh installs occur as part of the image build. Ensure a `.dockerignore` file is present and contains:

```text
packages/**/node_modules
```

<small>I think Globs with ** patterns like this might not have worked in previous Docker versions? But this seems to work now on Docker 17.05.0.</small>

#### Lerna Bootstrap

```dockerfile
COPY lerna.json .
RUN lerna bootstrap
```

The next step is to run Lerna bootstrap in inside the docker image. Fortunately, Lerna will fail gracefully when packages listed inside `lerna.json` do not exist, as is the case here, where `app2-*` was not copied. It's also possible to copy all the packages into the image but ignore the irrelevant ones using Lerna's `--scope` option.

You might notice that in "Docker file world" this doesn't take advantage of the layered caching mechanism mentioned earlier. For each package a fresh, but potentially costly `npm install` will occur on every build if any file in the any of the copied packages has changed. I guess this could be fixed by running `lerna link` and then the steps which `lerna bootstrap` is composed of for each package (install, prepublish, prepare) - in the order of packages least likely to have changed, but this begins to defeat the purpose of using Lerna: the convenience of it doing this all for you. And, obviously the `Dockerfile` will become quite verbose. In this instance, personally, I prefer simplicity over performance.

<small>*Please comment if you know a better way of doing this*</small>

Also, the problem *can* be mitigated somewhat by [hoisting](https://github.com/lerna/lerna#--hoist-glob) all dev-dependencies up to the root `package.json/node_modules`. So at least all dev-dependencies are only installed if there is a change in the root `package.json`.

### The Command

Finally, assuming `npm start` runs the server, it can be neatly started from the workspace root, using NPM's `--prefix` option:

```dockerfile
CMD [ "npm", "--prefix", "packages/app1-server", "start" ]
```

----

A version of this setup is used by this website, which can be [found on Github](https://github.com/philmander/versatile). Please leave any comments/suggestions below.
