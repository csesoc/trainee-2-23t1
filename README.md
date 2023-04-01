# Project Waves

## :milky_way: 1. Origin Story 

It is often difficult to co-ordinate and arrange meetings, especially for a large group where people have different timetables.

Even though we have tools like When2Meet that facilitates this process, it is still not a streamlined experience.

And as a wise man once said:
> "Idk bro, When2Meet is kinda shit" - Aristotle (probably)

Which is how this project was born, where we seek to make a webapp that streamlines and provide a better experience when it comes to arranging meetings.

## :ocean: 2. Waves 

### 2.1. Product Introduction 

When it comes to arranging meetings, it is often a headache to decide on the *when* and *where*. Which is what this product is aiming to solve.

### 2.2. Proposed design

Figma design link: <a href="https://www.figma.com/file/JU5Cdu40ZiNiWNeo1jI98d/CSESoc-Waves-Prototype?node-id=0%3A1&t=nJURGzarZ4qTklS2-1" target="_blank">CLick to go to design prototye</a>

### 2.3. Terminology

```
Wave    => Meeting
Tide    => Meeting invite
```

## 3. Getting Started

### 3.1. Frontend

```
// Setup
cd ./frontend
npm install

// Running frontend
npm run dev
```

### 3.2. Backend

```
// Setup
cd ./backend
npm install
npx prisma generate

// Running backend
npm run dev
```

### 3.3. DB

We are using `MongoDB` which is notoriously annoying to run locally, we recommend using `MongoDB Atlas` instead.

1. Navigate to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Do your signup things and what not
3. Once you're in the Atlas dashboard, click on `Data Services` and `Connect`
4. You should see a popup, then click `Connect using VSCode`
5. Execute the following command

```
cd ./backend
touch .env
```

6. Add this line. (You should be able to find the link in the popup in step 4.)
```bash
DATABASE_URL="${your_atlas_url}"
```

## 4. Feature & Reqirements 

### 4.1. Login & Registration

    * Login should require:
        - Email 
        - Passowrd

    * Registration should require:
        - Name
        - User handle 
        - Email 
        - Password

    * During registration, upon unfocus, application should check:
        - If the email is taken
        - If the user handle is taken

    * Only allow users to register when the pass the above checks

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e575cf9 (Docs: updated docs)
### 4.2. Navigation bar
    * A search bar should be implemented for searching future Waves and pending Tides
    
    * A button to send Tide
=======
* To be decided 
* **Leon** is voting for `MERN`, I'm looking for others
* One thing for sure is that `TailwindCSS` will the main tool for styling
>>>>>>> 481f866 (Msic: small styling)
=======
* Language  : `TypeScript`
* Front-end : `React, TailwindCSS, FramerMotion`
* Back-end  : `Express, Prisma, JWT`
* Database  : `MongoDB`
>>>>>>> 33efa79 (Docs: updated docs)

    * Notifications

    * Drop down menu should contain:
        - Profile Image
        - Name
        - Email
        - Custom status
        - Settings button
        - Theme button
        - Logout button

### 4.3. Profile Page

    * Profile should display the following items
        - Profile Image
        - Name
        - User handle
        - Custom status
        - Availability (Calander)
    
    * A button should be provided for users to edit their profile
    
    * Users should be able to choose the date range displayed on the calander (Refer to design)

    * Hovering on a timeslot on the calander should display details of the user's availability. (Refer to design)

### 4.4. Meeting Arrangement Page / Modal

    * Required inputs:
        - Meeting title
        - Meeting description
        - Meeting date & time
        - Users
        - And optionally location

    * User should be able to add multiple people for the Wave

    * The calander input for chooseing date & time should 
      contain information on the group's availability

    * It is not neseccary to choose a time where everyone's free

### 4.5. Dashboard

```
I thought Victor's design is quite suited for our dashbard, told him to polish it up a bit.

A dashbard isn't needed for now, though it certainly wouldn't hurt having one.
```

## :memo: 5. Minor Notes
### 5.1. Stack

* Language  : `TypeScript`
* Front-end : `React, TailwindCSS, React Router DOM, React Query`
* Back-end  : `Express, Prisma, JWT, tRPC`
* Database  : `MongoDB`

### 5.2. Style guide 

* `JS / JSX / TS / TSX`: Indent -> 2 spaces
* `Vanilla CSS`: Indent -> 4 spaces
* `Chocolate CSS`: Does not exist 

### 5.3. Backend 

<<<<<<< HEAD
<<<<<<< HEAD
Note that we will not be using the normal `REST API` approach, but instead, we will be using a library called `tRPC`.

The reason why we chose to do it is because of the fact that 
1. It is extremely hard to consider everything and prototype an API structure within a short amount of time
2. Less code, type safety, the line between backend and frontend is blured (which is a good thing if we want to push code fast)

#### Short runthrough of `tRPC`

**Terminology:**
```
// Note that Service and Router is a terminology in the context of our repo
// i.e. Only Procedure is a terminology used by the official tRPC docs

* Procedure == API Endpoints
* Service   == Collection of procedures
    - e.g. Lets say we have:
            * /auth/register
            * /auth/login
            * /auth is a service

* Router == The root "/"
```

**Using `tRPC`:**

Backend:
```ts
// ./backend/src/service/hello.ts

// Hello router is then added to router.ts (refer to backend code)

import { trpc } from "../trpc_provider"

const helloRouter = trpc.router({
  helloWorld: trpc.procedure.query(() => {
    return "Hello World"
  })
})

export default helloRouter
```

Frontend:
```tsx
const SomeComponent:React.FC = () => {
    const hello = trpc.hello.helloWorld.useQuery();

    return (
        <div>
            {hello.isLoading ? "Loading" : hello.data}
        </div>
    )
}
```

**`query()` vs `mutation()`**

```
query(): GET
mutation(): anything that is not GET

// they call it mutation bc the data in the db mutates
=======
#### 4.3.1. `/auth/login`
=======
Note that we will not be using the normal `REST API` approach, but instead, we will be using a library called `tRPC`.
>>>>>>> e575cf9 (Docs: updated docs)

The reason why we chose to do it is because of the fact that 
1. It is extremely hard to consider everything and prototype an API structure within a short amount of time
2. Less code, type safety, the line between backend and frontend is blured (which is a good thing if we want to push code fast)

#### Short runthrough of `tRPC`

**Terminology:**
```
// Note that Service and Router is a terminology in the context of our repo
// i.e. Only Procedure is a terminology used by the official tRPC docs

* Procedure == API Endpoints
* Service   == Collection of procedures
    - e.g. Lets say we have:
            * /auth/register
            * /auth/login
            * /auth is a service

* Router == The root "/"
```

**Using `tRPC`:**

Backend:
```ts
// ./backend/src/service/hello.ts
import { trpc } from "../trpc_provider"

const helloRouter = trpc.router({
  helloWorld: trpc.procedure.query(() => {
    return "Hello World"
  })
})

export default helloRouter
```

Frontend:
```tsx
const SomeComponent:React.FC = () => {
    const hello = trpc.hello.helloWorld.useQuery();

    return (
        <div>
            {hello.isLoading ? "Loading" : hello.data}
        </div>
    )
}
```

**`query()` vs `mutation()`**

```
query(): GET
mutation(): anything that is not GET

// they call it mutation bc the data in the db mutates
```
