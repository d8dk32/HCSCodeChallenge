# HCSCodeChallenge
Coding challenge for HCS interview

Implementation steps:

1) Create a very basic Express Server, just to make sure I had something my front-end could hit and that it was working properly. I made a single simple endpoint that returned a list of things, and another "catch-all" endpoint.

2) Set up skeleton of front-end. I used create-react-app to quickly spin up the framework for a single page app. This first chunk of the front-end involved tearing out some of the create-react-app stuff and creating a very simple login page, with fields for username and password, and a Login button.

3) Add some basic (and insecure) login functionality. I created a login endpoint on my Express server that accepts a POST with the username and password, and if it matches the hardcoded username and password, then it "authenticates" the user, meaning that it responds that it was the correct user/password. the front end saves this to its state and jumps to the Tasks page. if the password doesn't match, it pops up an alert saying as much. If you try to access the Tasks without logging in, rather than display tasks it tells you that you are not authenticated and provides a link to the Login page. I realize this is not adequately secure, but considering that I was working under a timecrunch, I was more focused on getting the outward functionality to the point it should be. If I were to attempt to make it more secure, I would likely lean towards using JWT tokens for authentication, passing a cookie back and forth on all requests, and authenticating the task list-related calls as well. This is a model I am somewhat familiar with as I use it in my current role. 

4) Add the Tasks page. This is the page the user gets to if they successfully "authenticate". It shows a list of tasks, which can be added to, deleted from, or saved to the mongo store. I started with a hardcoded list just to have something to test the add/delete functionality with. Once this was in place, I could add the Mongo functionality, including the "save" button.

5) Mongo Setup. Step 1 would be to install a local mongo instance, but I had one already. Step 2 was to devise a way to load some starter data into a new collection when the server started. I only wanted to do this if it hadn't been done already. So when the server starts, it connects to the mongo instance, tries to find some data for our test user, and if it can't it puts that data in the collection.

6) Add endpoints for querying and updating user data. I added 2 new endpoints to my Express server, a GET for querying user data. it requires the username and returns the name and tasks for that user. The other was a POST, which took a list of tasks as the payload and included the username in the endpoint URL. This task was saved to the mongo store, associated with that username.

7) Add the mongo connectivity to the Tasks page. There are 2 aspects to this. The first was to load the user data when the page loaded, to display a greeting to the user and show their list of tasks. The 2nd was to update the task list when the user clicked the "save tasks" button. These connected to the respective GET and POST endpoints created in the previous step. 