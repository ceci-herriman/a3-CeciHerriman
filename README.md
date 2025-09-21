## Movie Reviewer

My application link: https://a3-ceciherriman.onrender.com/

Include a very brief summary of your project here. Images are encouraged, along with concise, high-level text. Be sure to include:

- the goal of the application
- challenges you faced in realizing the application
- what authentication strategy you chose to use and why (choosing one because it seemed the easiest to implement is perfectly acceptable)
- what CSS framework you used and why
  - include any modifications to the CSS framework you made via custom CSS you authored
- a list of Express middleware packages you used and a short (one sentence) summary of what each one does. If you use a custom function, please add a little more detail about what it does.

## Technical Achievements
- **Tech Achievement 1**: I used OAuth authentication via the GitHub strategy

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

I used HTML semantic tags and role labels on divs to better convey functionality and meaning of different parts of the application. I used section elements to identify structure within groups, namely the heading sections, table sections, and form sections of groups. Additionally, I used section elements to identify the headings, or heros, at the top of each page. I also tagged some divs with roles if the divs encompassed custom functionality, such as the div checkbox wrapper I used or the hero headings. 

- Developing: "Reflect the reading order in the code order"

When writing, editing, and refactoring my HTML, I ensured that the order of elements matched the user workflow logical reading order. Code within each group natural flowed from higher-level elements like titles to lower-level elements like table elements or submit buttons. Similarly, code for each group was ordered in the same sequence in which users would read on the screen. For example, headings/heros were located at the top of my HTML code, followed by welcome messages or sub headers, followed by forms. I checked this by reading each HTML file from top of to bottom, checking for anything that seemed logically out of place. I also checked this by removing my css files and checking to see if anything was placed out of order. 
