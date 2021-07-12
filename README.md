# Tasks

## Quiz Creation Basic

- If survey, remove the evaluation field
- If unscheduled, remove the time picker and duration field
- Check garbage input in duration, or better put restriction (only number will be allowed)
- Add some more categories in the database
- Add dashboard header
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
- When the user has submitted, show him a confirmation dialog and THEN redirect to the quiz home

## My Submission

- Keep a back button (to go back to the quiz home)
- Make the input elements un-clickable
- Keep a header containing date of participation, quiz name, cover image, current stage, etc.

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

## Leaderboard

- [backend] Write necessary APIs
- Complete the view

## Notification

- [backend] Implement push notification
- Fetch notifications for a user
- Facebook style

## Review

- Let the user give feedback on a quiz
