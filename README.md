# Kambaz LMS — Backend

REST API server powering Kambaz, a Canvas-style Learning Management System. Built with Node.js, Express, and MongoDB, handling courses, assignments, modules, enrollments, and role-based user accounts.

**Live API:** [kambaz-node-server-app-6n5i.onrender.com](https://kambaz-node-server-app-6n5i.onrender.com)
**Frontend:** [kambaz-next-js-sigma.vercel.app](https://kambaz-next-js-sigma.vercel.app/)
**Frontend repo:** [kambaz-next-js](https://github.com/teja1412-hub/kambaz-next-js)

> **Note:** Deployed on Render's free tier, which spins down after inactivity. First request after idle may take 30–60s to respond while the server wakes up.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)

---

## Overview

Kambaz is a full-stack LMS built for CS4550 (Web Development) at Northeastern University. This repo is the backend — a REST API handling data persistence, authentication, and business logic for five core resources: **Users, Courses, Enrollments, Modules,** and **Assignments**.

## Architecture

Each resource follows a consistent, layered structure that separates concerns cleanly:

```
Request → routes.js → dao.js → model.js (Mongoose) → MongoDB
```

| Layer | Responsibility |
|---|---|
| `routes.js` | Maps HTTP verbs/paths to handler functions; parses request, sends response |
| `dao.js` | Data access layer — all database queries live here |
| `model.js` | Mongoose model definition |
| `schema.js` | Mongoose schema — shape and validation of the document |

This keeps route handlers thin and testable, and isolates database logic so it can be reasoned about (or swapped) independently of Express.

## Features

- **Session-based authentication** via `express-session`, with environment-aware cookie config (`secure`, `sameSite: "none"` in production; relaxed for local dev).
- **Role-based access model** — users carry a `role` (`STUDENT`, `FACULTY`, `ADMIN`, `TA`, `USER`) used throughout the app to gate course management vs. enrollment actions.
- **Full REST CRUD** across all five resources, with nested routes reflecting real relationships (e.g., assignments scoped under courses).
- **MongoDB via Mongoose**, using UUID-based `_id`s for new documents rather than default ObjectIds.

## Tech Stack

`Node.js` · `Express 5` · `Mongoose` · `MongoDB Atlas` · `express-session` · `CORS` · `dotenv`

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/courses/:courseId/assignments` | List assignments for a course |
| `POST` | `/api/courses/:courseId/assignments` | Create an assignment |
| `PUT` | `/api/assignments/:assignmentId` | Update an assignment |
| `DELETE` | `/api/assignments/:assignmentId` | Delete an assignment |
| `GET` | `/api/courses/:courseId/modules` | List modules for a course |
| `POST` | `/api/users/current/courses` | Enroll current user in a course |
| `GET` | `/api/users/profile` | Get current session's user |
| `POST` | `/api/users/signin` | Sign in |
| `POST` | `/api/users/signup` | Sign up |
| `POST` | `/api/users/signout` | Sign out |

*(Representative endpoints — Courses, Enrollments, and Modules follow the same REST conventions.)*

## Getting Started

```bash
git clone https://github.com/teja1412-hub/kambaz-node-server-app.git
cd kambaz-node-server-app
npm install
npm start
```

Requires a running MongoDB instance (local or Atlas) — see [Environment Variables](#environment-variables).

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DATABASE_CONNECTION_STRING` | MongoDB connection URI | `mongodb://127.0.0.1:27017/kambaz` |
| `SESSION_SECRET` | Secret for signing session cookies | `"kambaz"` |
| `CLIENT_URL` | Allowed CORS origin (frontend URL) | `http://localhost:3000` |
| `SERVER_ENV` | Set to `production` to enable secure cookies | — |
| `PORT` | Server port | `4000` |

## Project Structure

```
Kambaz/
├── Users/          { schema, model, dao, routes }
├── Courses/        { schema, model, dao, routes }
├── Enrollments/    { schema, model, dao, routes }
├── Modules/        { schema, dao, routes }
├── Assignments/    { schema, model, dao, routes }
└── Database/       seed data
```

`Lab5/` contains early Express-fundamentals coursework exercises that predate the Kambaz app — kept for reference, not part of the production API.