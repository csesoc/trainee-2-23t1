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

Coming soon&trade;

### 2.3. Terminology

```
Wave    => Meeting
Tide    => Meeting invite
```
## 3. Feature & Reqirements 

### 3.1. Login & Registration

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

### 3.2. Navigation bar
    * A search bar should be implemented for searching future Waves and pending Tides
    
    * A button to send Tide

    * Notifications

    * Drop down menu should contain:
        - Profile Image
        - Name
        - Email
        - Custom status
        - Settings button
        - Theme button
        - Logout button

### 3.3. Profile Page

    * Profile should display the following items
        - Profile Image
        - Name
        - User handle
        - Custom status
        - Availability (Calander)
    
    * A button should be provided for users to edit their profile
    
    * Users should be able to choose the date range displayed on the calander (Refer to design)

    * Hovering on a timeslot on the calander should display details of the user's availability. (Refer to design)

### 3.4. Meeting Arrangement Page / Modal

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

### 3.5. Dashboard

```
I thought Victor's design is quite suited for our dashbard, told him to polish it up a bit.

A dashbard isn't needed for now, though it certainly wouldn't hurt having one.
```

## :memo: 4. Technical Specifications

### 4.1. Stack

* Language  : `TypeScript`
* Front-end : `React, TailwindCSS, FramerMotion`
* Back-end  : `Express, Prisma, JWT`
* Database  : `MongoDB`

### 4.2. Style guide 

* `JS / JSX / TS / TSX`: Indent -> 2 spaces
* `Vanilla CSS`: Indent -> 4 spaces
* `Chocolate CSS`: Does not exist 

### 4.3. API

#### 4.3.1. `/auth/login`

* **`POST`** - Called when user requrests login

```json
/*
Headers:
    Content: application/json
*/

// Inputs:
{
    "email": "email@email.com",
    "passowrd": "password"
}

// Outputs:
{
    "userId": "12345",
    "userToken": "thisIsATokenGeneratedUsingJWT"
}

// Errors:
{
    "error": "Invald email or password"
}
```

#### 4.3.2. `/auth/register`

* **`POST`** - Called when user requests registration

```json
/* 
Headers:
    Content: application/json
*/

// Inputs:
{
    "name": "Henry Wan",
    "email": "email@email.com",
    "userHandle": "m4ch374",
    "password": "password"
}

// Outputs:
{
    "userId": "12345",
    "userToken": "thisIsATokenGeneratedUsingJWT"
}

// Errors:
{
    // One of the error messages

    // Prevent bypassing checks bc ppl could directly call the api
    "error": [
        "User handle already taken",
        "Email already taken",
        "Invalid email",
        "Invalid password",
        "Invalid user handle"
    ]
}
```

#### 4.3.3. `/auth/register/check_email`

* **`POST`** - Called when we want to know if the email is taken

```json
/*
Headers:
    Content: application/json
*/

// Inputs:
{
    "email": "email@email.com"
}

// Outputs:
{
    "taken": "true"
}

// Errors: 
{
    "error": "Invalid email format"
}
```

#### 4.3.4. `/auth/register/check_handle`

* **`POST`** - Called when we want to know if the handle is taken

```json
/* 
Headers:
    Content: application/json
*/

// Inputs:
{
    "userHandle": "m4ch374"
}

// Outputs:
{
    "taken": "true"
}

// Errors:
{
    "error": "Invalid handle"
}
```

#### 4.3.5. `/user`

```
* Update once I've setup the database schema
```
