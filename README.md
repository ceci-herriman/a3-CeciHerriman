## Movie Reviewer

My application link: https://a3-ceciherriman.onrender.com/

Premade user login: 
- username: c
- password: c

Note: Please use light mode on your browser. 

The goal of this application is to support movie-watchers in keeping track of what movies they have watched in the past and what they thought of them. They can enter, delete, edit, and view movie reviews they have made, facilitating reflection on movie experiences and discourse with others. The application uses MongoDB to store user data and review data, Bulma for a CSS framework, and Express for middleware. Users can log in through a log in page and can create a new account by inputting their desired username and password and checking the "Create new user if not existing" checkbox. Users will then automatically be taken to the main page with a welcome message and new user alert if applicable. 

The biggest challenges I faced when working on this project centered around the server development with Express. Using express definitely served as a learning curve as a lot of the operations and functionality is abstracted out. Developing the endpoints and querying the database wasn't very hard, however understanding how files were served and how the order of app.use() calls mattered was very hard. I struggled with disallowing users from accessing paths until they had logged in while still allowing for them to access /login. I ended up creating an array of public paths and adding middleware to only allow requests to those paths or requests from logged in users. I also struggled with handling authentication on the server side. I had to look through documentation to understand how sessions on servers worked with express, and how I could utilize req.session to implement the logic I wanted. I learned that I could store fields within the session and access those throughout the server, which I used to check if users were logged in, display usernames, and store user ids for database queries. Another big challenge I had was sending data back to the frontend to display when a login error occurred. I solved this problem by returning index.html wth specific error parameter values that communicated what went wrong on the server. Then, on the client side, I used the received value to determine what to print on the frontend. 

I chose to manually authenticate by checking inputted usernames and passwords with those stored in my database. I chose this method because it was the most straightforward and allowed me to easily create user ids in the database that I could use for other queries. This more straightforward implementation granted me the opportunity to spend more time designing the frontend and server. I used server sessions to hold authentication data as opposed to cookies because I wanted the ability to clear all sessions by restarting the server. 

I used the CSS framework Bulma because of its modern look and bright colors that I thought would contribute well to an overall simple and easy to use interface. I did not want to choose a framework that had a distinct style oriented to a certain subject as movies are very broad, however I still wanted the design to have popping elements that Bulma's colors, buttons, and input styles had. It was also very easy to incorporate into my project as it only required one import statement and allowed me to add styling with class names. I modified some parts of the CSS framework that didn't contribute to good accessibility standards. I changed the default color of input placeholder text to be a darker shade of grey so that contrast with the background would be better. I also changed button and input focus/hover style rules to be more visible for users with low vision or keyboard users. 

I used express-session to create user sessions on the server side and store authentication data to use throughout the server. I used express.json() to automatically parse incoming JSON requests so that I did not have to manually do so for every route. I used express.urlencoded({ extended: true }) to parse incoming form data from the login form so that the server could process what the user inputted. I used express.static('public') to serve all static files under the 'public' folder. My first custom function stopped all requests from continuing until my mongoDB connection was established so that database queries wouldn't be attempted prematurely. My second custom function restricted access to routes if users weren't logged in yet -- the function only allowed unauthenticated users to access /login, which is used to authenticate, and would redirect them to the log in page if they tried to access other routes. 

Given the nature of the data my application requires for movie review entries, my entry form only requires input elements, however, they varied of type text and number. I tried to use a textarea element, but it was too big in size given the data that would be inputted into it. To demonstrate more HTML form fields, I used a checkbox element in my log in form, allowing users to choose to create a new user if not existing already. In each of my forms, I used button elements for submission instead of input elements that I used in a2. 

To complete my project, I used the professor's online resources for express, mongoDB, and and authentication. I also used mongoDB and express documentation. I also used ChatGPT to help debug my code and understand Google Lighthouse outputs.

## Technical Achievements
- **Tech Achievement 1**: I achieved 100 on all four lighthouse tests.

To achieve 100 on accesibility, I had to make changes to font colors and modify select element roles. Achieving 100 on performance was by far the most difficult. To achieve 100 on performance, I had to adjust how my css style sheets and javascript files were being sent to the client, since I am using a large CSS framework (and font awesome for the login page). I put the "defer" tag on my javascript script tags to stop my script from blocking page rendering. I also made some of my css style sheets non-blocking so that it can be loaded asyncronously. I had to be cognizant of which I put as non-blocking as it affects page element movement while loading, so I only used this for font awesome, which is used for icons. I also refactored my css code to reduce the size of the file and therefore the time it takes to send it. To achieve 100 on best practices, I removed console logs of errors. For 100 on SEO, I added a robots.txt file to allow for webcrawling. 

Screenshots of 100s results from running lighthouse through devTools and PageSpeed:

![alt text](<Screenshot 2025-09-21 at 3.56.37 PM.png>)
![alt text](<Screenshot 2025-09-21 at 4.18.06 PM.png>)
![alt text](<Screenshot 2025-09-21 at 4.40.43 PM.png>)
![alt text](<Screenshot 2025-09-21 at 4.41.09 PM.png>)

- **Tech Achievement 2**: I hosted my site on Railway in addition to Render

URL: https://a3-ceciherriman-production.up.railway.app/

Railway seems faster to use overall. It automatically deploys when you push, and that overall process is definitely faster than that of Render's. It has a cool feature where you can see all of the build, deploy, and HTTP logs, which I found useful during my deployment process and also afterwards. It would also definitely be a big benefit for troubleshooting issues on your hosted app. The actual process of creating a project and configuring settings was much smoother than Render, as the service does a lot of inference behind the scenes as opposed to Render where you had to still fill out config fields. One thing that Railway does not do as well as Render is provide an intuitive user interface for new users. I had a to click around a lot just to find my deployment URL, which I ended up having to generate. For example, there are multiple settings pages that you can access from the same location, and their "architecture" page design is (still) confusing. Additionally, one other downside of Railway versus Render is that Railway has a 30 day / $5 credit trial plan, and then you must upgrade. However, from what I can tell, Railway does not take awhile to re-boot deployments after they haven't been in use for several minutes, it is always up and running. 


### Design/Evaluation Achievements
- **Design Achievement 1**: I followed the following tips from the W3C Web Accessibility Initiative:

- Writing: "Provide informative, unique page titles"

For both my login and home pages, I added a hero to the top of the screen. In the hero, I added a title identifying the specific page and a subtitle identifying the application. The main title provided a concise description that conveyed the page's purpose and distinguished it from the other page. I made the page identifying description the main title so that the most specific and relevant information was presented first, as w3 recommended. 

- Writing: "Use headings to convey meaning and structure"

I used headings to group related content. I grouped by concrete actions users can take, including the submit entry form, the edit entry form, and the data display table, to convey the structure of the application and action flow. I made sure that the headings clearly described the sections through the use of specifc and descriptive language that illustrated what the user could do in each section. 

- Writing: "Provide clear instructions"

I added general instructions above each form (edit and entry submit) detailing important specifications of each process. I also added this information into the input labels where appropriate. In the movie entry form, I communicate that the form is used for movie entries and that all fields must be filled. I have labels next to each input field communicating what data should be entered and any restrictions (year range and rating scale). In the edit form, I communicate the entry fields that users can edit and that not all fields need to be changed. Similarly, in my log in page, I have a "incorrect username or password" error to help guide users fix their log in problem. I don't specify which is incorrect because that contributes to bad security. 

- Writing: "Keep content clear and concise"

In all of my titles, subtitles, and informational blurbs, I wrote in sequences of several short sentences as opposed to one length sentence to keep information concise and to the point. However, I actively worked to use descriptive words to maintain a high level of helpful detail for users. I made sure to avoid using frontend-related technical terms that I was tempted to use in my instructions, such as "input element". 

- Designing: "Provide sufficient contrast between foreground and background"

I made several css rules which overrode my Bulma CSS framework. One of them was changing the color of the input element placeholder text. Bulma's default was a very light shade of grey, which did not have much contrast with the white background. To fix this, I made a new css style rule that set the placeholder text to a much darker shade of grey. It is still slightly lighter than standard text, but still dark enough for everyone to read. Additionally, I used Bulma's standard "danger" style color for my error messages. However, its shade of red was very light, so I used a darker shade of their "danger" color (has-text-danger-60) to ensure it had a better contrast with the background. Finally, throughout my designing process, I made sure to choose colors for headers and buttons that would stand out from the white background. 

- Designing: "Don’t use color alone to convey information"

When designing my frontend, I made sure to make text, shape, and spacing a priority when conveying information. I kept color as a secondary and only added it after I had everything else layed out and written. For my error messages regarding log in errors (on both the main and log in pages), I worked on designing the right text and choosing the correct spacing and size of the text to best inform users of errors. For example, I tinkered with what font weight, wording, and location on the screen would best catch the eyes of users and illustrate where the user should go to solve the problem. Only at the end of this process did I color the text red for good measure. Similarly, though I use color on the buttons to convey relationships or functionality (blue buttons for editing, red for deletion, green for submitting), I made sure not to rely on this. In my original design, I had the edit section light up with the color of the "edit" button when it was clicked to catch the eyes of users and orient them to the edit section. I changed this by instead removing the entry section and replacing it with the edit section completely when the edit button was clicked. This way, it was clear to users where they should go to edit their row, even without color. 

- Designing: "Ensure that interactive elements are easy to identify"

The other css rules I made to overrode my Bulma CSS framework were to make custom borders around inputs elements and buttons that were more easily seen. The Bulma on-hover and on-focus versions of buttons had very subtle differences from the main button states. This was the same for input fields and checkboxes. These differences were not enough to make these elements easily identifiable for users only using keyboards or those with low vision. As a result, I made css rules that showed a thick black border around all checkboxes, input fields, and buttons on hover, focus, and selection. Now, no matter what interaction style a user uses, they will be able to identify what elements they are interacting with.

- Designing: "Ensure that form elements include clearly associated labels"

For every button, input field, and checkbox in my application, there is a label associated. Since English is a left-to-right language, I followed w3's noted standard for label positioning, with all input field labels being above the field and my checkbox field being to the right. I also made sure that buttons associated with fields had readable text within them that clearly conveyed its use. I also made sure that it was clear which label was associated with what. For example, I included "here:" after the labels in my entry form field since there were many fields stacked on top of each other. I also included icons in the login form to help convey what each field was used for. 

- Designing: "Use headings and spacing to group related content"

My use of headings is described above. I used spacing to create whitespace between groups and visually separate content to better distinguish groups. I made sure there was a decent sized gap between the view results group on the right and the create/edit entry group on the left so that users can better infer that each are used for separate, discrete actions. However, I wanted to maintain proximity and place them next to each other to try and convey the relationship between the groups. In other words, I placed them next to each other and not on top of each other because each action/group should be used in tandem with the others, and in no specific order either. If there was a specific workflow/timeline for users, then it would make sense to stack the groups, however, I wanted users to be able to view their ratings content while doing other actions like creating or editing entries. 

- Developing: "Associate a label with every form control"

For every label I used for input/checkbox elements in my html, I used a "for" attribute that references the id of the respective form element. This ensures that readers can understand the required input they must provide.

- Developing: "Use mark-up to convey meaning and structure"

I used HTML semantic tags and role labels on divs to better convey functionality and meaning of different parts of the application. I used section elements to identify structure within groups, namely the heading sections, table sections, and form sections of groups. Additionally, I used section elements to identify the headings, or heros, at the top of each page. I also tagged some divs with roles if the divs encompassed custom functionality, such as the hero headings. 

- Developing: "Reflect the reading order in the code order"

When writing, editing, and refactoring my HTML, I ensured that the order of elements matched the user workflow logical reading order. Code within each group natural flowed from higher-level elements like titles to lower-level elements like table elements or submit buttons. Similarly, code for each group was ordered in the same sequence in which users would read on the screen. For example, headings/heros were located at the top of my HTML code, followed by welcome messages or sub headers, followed by forms. I checked this by reading each HTML file from top of to bottom, checking for anything that seemed logically out of place. I also checked this by removing my css files and checking to see if anything was placed out of order. 
