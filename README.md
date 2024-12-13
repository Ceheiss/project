# DojoScrolls
#### Video Demo:  <URL [HERE](https://www.youtube.com/watch?v=xwTVg_71zNM&ab_channel=CristobalHeiss)>

#### Description:

![logo](/frontend/public/light-background-logo.png)

DojoScrolls is an application made for martial artists. The idea comes from my own experience. Around three years ago, I started tracking my martial arts training sessions to get a clearer picture of how much time I was spending on the mats. I stored information like the date, session number (like an ID), the discipline, and a description of what we did. This often included how I felt, how sparring went, what techniques we learned, and so on.

Having logged well over 200 sessions, I accumulated a lot of data, but I thought it would be awesome to have some metrics to go with it. That is how the idea for this application was born.

![](/public/greeting.png)

As a user, you can register with DojoScrolls and start logging your training sessions. When you log in, you will be greeted with a dashboard displaying relevant data about your training, such as the total number of logged sessions, average feeling (each session records how you felt on a scale of 1 to 5, with 5 being great), charts showing sessions per month, the frequency of techniques learned, and the different disciplines trained.

![](/public/charts-2.png)

Where does the information come from? From your notes. For each training session, you can save it through a form. In the form, you must add the discipline trained, the techniques (comma-separated) practiced, how you felt, and insights (a timestamp is added automatically on the backend).

![notes](/public/notes.png)

You can view all your notes, click to see details (text is truncated in the general display), and edit or delete them (providing full CRUD functionality).

---

### Technical Aspects

The application consists of two main parts: the backend and the frontend.

The backend code is written in `Python` using `Flask`. Instead of using `Jinja`, I chose to make my application an API to be consumed by a separate frontend (to simulate two independent teams working on the application). Each route returns data in JSON format.

I used `Sqlite3` as the database and utilized the CS50 library to interact with it, just like in the Finance problem set. The data is structured in two main tables: one for users and one for notes (with `user_id` as a foreign key in the notes table).

The frontend is built with `Next.js`, which uses `React`. This decision was mainly pedagogical because I could have written the API directly in Next.js or used Jinja for the frontend. However, I wanted to work with two different technologies. I used Next.js middleware to handle route permissions based on whether the user is logged in, so there was some server-side code, but mostly I used Next.js to create and route the UI effectively.

I decided not to use `ContextAPI`, Redux, or any other state management tool. Instead, almost every component queries its own data. In some edge cases (like the Navbar buttons needing to know if a user is logged in), I used HTML `CustomEvents`, which was a fun, new approach for me (because I was determined not to share state).

Here’s an example:

```tsx
const authChange = new CustomEvent("authChange", {
  detail: { isLogged: true },
});
window.dispatchEvent(authChange);
```
For the dashboard, I used `chart.js`, which provided a simple way to generate the visual components I was looking for. I decided against diving into D3 for data visualization, as it felt too complex for my purposes.

Although Tailwind was included in the initial setup, I used plain CSS but kept Tailwind for potential future use.

---

### Running The Application

To run the application, navigate to the `api` folder and create a virtual environment:
`python3 -m venv venv``

Activate it:
`source venv/bin/activate`

Install the requirements:
`pip install -r requirements.txt`

Run the backend:
`python3 app.py`

The backend will run on port 5000.

For the frontend, navigate to the `frontend` folder and install dependencies:
`npm run install`

Create a `.env.local` file at the root level and add the API URL. For example:
`NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`

Finally run the app in development mode:
`npm run dev``

ou can now go to `http://localhost:3000/register`, create a user, and start your journey!

---

### Further Details

The frontend uses tools like TypeScript, Lint, and Prettier for formatting. I also have a simple `todo.txt` file at the root level with future tasks and improvements.

As both the developer and a user of my application, I plan to keep improving it and eventually deploy it. For now, running it locally is sufficient.



