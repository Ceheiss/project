# DojoScrolls
#### Video Demo:  <URL [HERE](https://www.youtube.com/watch?v=xwTVg_71zNM&ab_channel=CristobalHeiss)>
#### Description:
This is an application to track progress on one or more martial arts.
A user can create an account, keep track of his training by adding information like the discipline practiced, techniques viewed, how he felt during training, and whatever other insights are relevant.

The notes are saved on a database, and are only accessible for the given user. The user can perform all CRUD operations on the notes (creating, reading, updating, and deleting them), and based on the information in the notes, a dashboard is built for the user to check some relevant metrics like total sessions, sessions trained per month, most viewed techniques, and others.

The backend is a Flask API. For the database I'm using sqlite3. The frontend is a NextJS application.

The decision of the stack is mostly for educational purposes and to simulate having two teams working on the same project (so having the frontend separated from the backend).