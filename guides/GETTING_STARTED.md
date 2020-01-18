# Getting Started

**Note**: This guide refers to the team member whose project idea is being built as the **Team Lead**. This title is a formality. Team Leads should judge their leadership skills on their ability to share as much responsibility as possible with the rest of the team. **This includes making sure that everyone lands commits to the source code.**

**Note**: This guide refers to assigned LFZ Staff as **Project Managers**. Each group should be assigned one LFZ instructor for progess monitoring and coaching.

**It is important to remember that the point of the project is _not_ to make the Team Lead's vision a reality, but to solidify the knowledge and skills of the team**.

## Bootstrapping the Team

Before beginning your project, it's important to make sure that your team is well-organized and everyone is given access to your shared resources. Before coding you'll want to take care of the following things.

### Unite on Slack

Your team should use a dedicated Slack channel for all communication so that every member, including your Project Manager, can share resources with one another and coordinate on Pull Request reviews.

### Exchange Email Addresses

Now that your team is on Slack together, everyone should share their email address so that they can be given access to collaboration tools such as Figma, DB Designer, and MeisterTask.

### Exchange GitHub Usernames

Your team will be accessing the same codebase on GitHub, so it is important that everyone knows each other's GitHub usernames.

### Create a Figma

The **Team Lead** should create a Figma project for the visual design of the project. The name of the Figma should match the name of the project. Every team member, including the **Project Manager**, should be invited to collaborate on the Figma.

### Create a DB Schema

If your project will use a relational database, the **Team Lead** should create a database schema on [DB Designer](https://www.dbdesigner.net/) and invite everyone on the team, including the **Project Manager**, to collaborate on the design.

### Create a MeisterTask

The **Team Lead** should create a [MeisterTask](https://meistertask.com/app) project for the overall management of your project. Every team member, including the **Project Manager**, should be invited to collaborate on the MeisterTask.

## Bootstrapping the Codebase

Your team will be working on a **single** codebase for the duration of the project. Every team member should have write access to the codebase and every team member should be made familiar with the structure of the codebase.

### Create a GitHub Repository

The **Team Lead** should create a new, public repository on GitHub. The **name** of the repository should be written in `kebab-case`; that is all lowercase with dashes in between words. The description of the repository should be one sentence that describes the project being built.

> For example, if your project is named **Code Course** and it is a web application for coding boot camps who want to organize their curriculum, then its GitHub repository should be named `code-course` and its description should be "A web application for coding boot camps who want to organize their curriculum."

The repository should be initialized with a `README.md`.

### Add Collaborators

The **Team Lead** should modify the Settings of the GitHub repository by adding every team member as a collaborator. Once everyone on the team has been invited, a link to the GitHub repository should be published to the team's Slack channel so that team members can quickly accept the invitation.

### Add the Project Skeleton

This repository contains starter files for building a LAMP & React project. Building the initial skeleton of the project will be a good opportunity for your team to take turns adding files and opening Pull Requests to the repository.

**Note**: All source code starter files should be added to your project, but no instructions or guides should be added.

#### `client/`

The `client` directory contains some initial `.jsx` files for a simple React front end. The example `App` component tests that the system is configured properly by sending a request to the API. This test request should be removed when the system's connections have been verified.

#### `database/`

The `database` directory is here for storing a database dump of your project.

**Note:** In a real production system, the database schema is managed in an automated fashion, though somewhat differently. But a full-fledged migration system is outside the scope of this project.

#### `server/`

The `server/` directory contains starter code for a basic Express.js back end. There is a test endpoint defined at `/api/health-check` for verifying that the server and database are connecting correctly.

#### `server/public/`

The `server/public/` is used to store files that should be accessible to any client that makes a request to the server. **No files outside of `server/public/` should be directly accessible to clients.**

#### `server/sessions/`

During development, client session data is stored here for convenience. This makes debugging session management easy. **Session files themselves should not be committed**, but the directory is flagged with a `.gitkeep` file so that the directory itself remains a part of the codebase for every collaborator.

#### `server/full-stack-project.example.conf`

This file will be used as a template for configuring your Nginx web server while deploying your project. It should be included in the codebase, but won't be used until then.

#### `.gitignore`

The included `.gitignore` should be added to the codebase. It is configured to prevent common files from being committed, including code editor configuration files and files that can easily be recreated programmatically.

#### `.npmrc`

The included `.npmrc` configures `npm` to prevent the generation of a `package-lock.json`, and installing _specific_ versions of packages downloaded from the registery.

**Note**: Practices around `package-lock.json` and package versions vary by organization, but for simplicity, we are using the settings found in `.npmrc`. If you want to learn more about these settings, they are explained in `npm`'s documentation at npmjs.com.

#### `package.json`

The included `package.json` includes the basic dependencies required by the front end of the project. It also includes some scripts that automate some of the project workflow.

**Note**: Feel free to copy this file, but be sure to **update the `name` and `description`** fields.

##### `npm run build`

Build the `client/` source into `server/public/main.js`. This script is only really used during deployment.

##### `npm run dev`

Start the Webpack and PHP development servers for local development. The front end is accessed at `localhost:3000` and the back end API is accessed at `localhost:9000`.

##### `npm run db:export`

Create a dump of the project's PostgreSQL database and write it to `database/dump.sql`. This script should be run any time the database schema is modified by a team member. The dump file should be committed to the codebase so that team members have a local copy of the database that is in sync. **The team should be reminded to import the latest dump when they pull from `origin master`.**

**Note**: Although databases are often dealt with in an automated fashion, this is not how real production databases are managed. But a full-fledged migration system is outside the scope of this project.

##### `npm run db:import`

Import the dump file located at `database/dump.sql`. This will help synchronize your local database with those of your team members.

#### `webpack.config.js`

Configuration used by Webpack during development and during deployment. This file contains settings used by the `npm run dev:client` script as well as the `npm run build` script.
