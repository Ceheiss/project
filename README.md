# DojoScrolls
#### Video Demo:  <URL [HERE](https://www.youtube.com/watch?v=xwTVg_71zNM&ab_channel=CristobalHeiss)>
#### Description:

![logo]('/frontend/public/light-background-logo.png')

DojoScrolls is an application made for martial artists. The whole idea comes from my own experience, around 3 years ago I thought started tracking my martial arts trainings just to get a glimpse about how much time I was really spending on the mats. I stored information like the date, session number (like an id), the discipline, and some description about what we did (which included some times howI felt, how was sparring, what techniques we learned and so on).

Having logged well over 200 sessions, I have recollected a lot of data, but I thought it would be awesome to also have some metrics to go with it. That is how the idea for this application was born.

As a user, you can register to DojoScrolls and start logging your training sessions. When you log in, you will be greeted with a dashboard that will display some relevant data about your training, such as the total amount of logged sessions, average feeling (each session you record how you felt on a scale 1 to 5, 5 being great), charts that display amount of sessions per month, amount of techniques learned with which frequency, and amount of martial arts trained.

Where does the information comes from? From your notes. For each training session you have, you can save it through a from. In the form you will have to add the discipline trained, the techniques (comma separated) practiced, how you felt, and insights (a timestamp is added automatically on the backend).

You can check all of your notes, click to get details (text gets truncated on the general display), and edit them or delete them (so notes have all CRUD operations).

### Technical Aspects

The application consists on two main parts, the backend and the frontend applications.

The backend code is written with `Python` using the `Flask`. I decided instead of using `Jinja`, for my application to be an API to be consumed by a separate frontend (to simulate two independent teams working on the application). Therefore each route returns data in a JSON format.

I used `Sqlite3` as a database and used the CS50 library to interface with my database, just like in the Finance problem set. The data consists on two main tables, one for the users, and one for the notes (the `user_id` is a foreign key on the notes table).

On the frontend I decided to use `NextJS` which uses `React`. This decision was mainly a pedagogic one, because I could have probably written the api directly on NextJS or the frontend in Jinja, but I wanted to use two different technologies. I had to use NextJS's middleware to handle the permitted routes based on whether the user is logged in or not, so there was actually some server side code there as well, but mostly I used NextJS as a way to create the UI and route it effectively.

I decided not to use `ContextAPI` or Redux or anything to provide State to components, so almost each component queries it's own data. In some edge cases (like the Navbar buttons to be aware if a user logged in) I had to use HTML `CustomEvents`, which was fun, and new (because I was hard headed on not sharing state).

I'm talking about this:
```tsx
const authChange = new CustomEvent("authChange", {
  detail: { isLogged: true },
});
window.dispatchEvent(authChange);
```

### Running The Application

To run the application you have to go to the `api` folder and create an enviroment:
`python3 -m venv venv``
Activate it:
`source venv/bin/activate``
And install requirements:
`pip install -r requirements.txt`
Then you can run the backend with:
`python3 app.py`
And it will run on port 5000.

For the front end you go to the `frontend`folder and from there install dependencies:
`npm run install`
Create a `.env.local` at root level and add the info to where the api will be running. So most likely:
`NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`
Finally run the app in development mode:
`npm run dev``

You should be able to go to `http://localhost:3000/register`, create a user, and start your journey!

### Further Details

The application on the frontend uses tools ike Typescript, Lint, and Prettify for formating. I have a simple `todo.txt`file at root level with future tasks and improvements.