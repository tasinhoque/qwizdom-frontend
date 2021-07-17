# Tasks

## Quiz Creation Basic

- Send default image when user hasn't chosen any image

## Quiz Creation

- CSS fixing
  - Make the cards look similar to the cards in the figma design.
  - Textfields should have the texts in the center (currently there is a top margin)
  - Question text-field type should be changed (at least set it to outlined)
- The user should be able to toggle the radio button/checkbox/toggle button before saving his option. Ideally, there should be an "Add Option" button at the right side of the text-field for adding the option.

## Quiz Preview + Play

- Handle timer in quiz play
- Add a header containing quiz name, cover image, stage serial (e.g. Stage 1/7)
- Show points in individual questions
- Fix CSS
  - Add more padding in the card
  - Checkboxes and toggle buttons should be indented (add left padding)
- At the end of quiz play, let the user give a feedback (containing review message and rating)

## Quiz Play

- Handle time bound quiz
- Handle scheduled quiz (set a restriction)

## My Submission

- Keep a back button (to go back to the quiz home)
- Make the input elements un-clickable

## Quiz Card

- Fix participant count (API integration needed)
- Fix rating (API integration needed)
- Rename the component (`SingleCard` to `QuizCard`)
- Add padding
- When there's blank space due to absence of chip/title, the bottom row components should stay at the bottom.

## Quiz Home

- Show subscriber count
- Fix the time of publication (use package for formatting time if necessary, e.g. `moment`)
- Show start and end date for quiz participation

## Profile

- Fix bug: In the published quizzes section, some quizzes are showing empty chips as categories.
- Let the user edit or publish a draft quiz
- Let the user delete his quiz
- Add fields
  - profession
  - bio
  - education (e.g. CSE, BUET)

## Forum

- Complete the view, follow facebook


## Notification

- [backend] Implement push notification
- Fetch notifications for a user
- Facebook style


## 12 July

- "Q : dfsd": Remove the "Q : " part
- Add Upload cover photo button (remove the text), basic quiz creation page

## Major tasks

- Leaderboard: Tasin
- All submissions of a quiz: Enan
- Forum: Enan
- Notification: Tasin
- Manual Evaluation: Nibir

## Minor Tasks

- [x] In quiz home, the pagination component is not getting displayed on the
  next line. It's on the same line with the review component in some cases.
- [ ] Show categories for quiz in quiz home.
- [ ] In quiz creation, we're not restricting the creator. We shouldn't let the
  creator use descriptive format for questions while creating a quiz with auto
  evaluation.
- [ ] There should be some restrictions on date picking. For example, the
  creator shouldn't be able to pick a date older than the present.
- [ ] Rename: paragraph to descriptive (question type)
- [ ] Add explanation text field in descriptive type question
- [ ] Change serial: The first question a new stage should have serial 1.
- [ ] Scheduled quiz should have some restrictions. 
- [ ] Remove the remember me checkbox from sign in page
- [ ] Remove date picker if the quiz is unscheduled
- [ ] Draft quiz shouldn't be displayed in dashboard
- [ ] Show correct average rating and participant count
- [ ] Show subscriber count in quiz home
- [ ] Remove the forgot password link (sign in)
- [ ] Remove the copyright text (sign in)
- [ ] Start the date picker from today and start the time picker from present
  time
- [ ] Show error if the creator doesn't choose correct answer for MCQ/Checkbox
  in case of Test
