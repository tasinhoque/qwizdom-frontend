# Saturday, 10 July

## Quiz Creation

- [x] Add stage and question header (i.e. number).
- [x] Fix the image preview (the aspect ratio should be preserved)
- [x] Add points to each of the questions
## Edit Quiz

- [x] Keep an edit button in the quiz home for the creator. That button will redirect to the edit quiz page.

# Sunday, 11 July

## Quiz Preview + Play

- [x] Add a header containing quiz name, cover image, stage serial (e.g. Stage 1/7)
- [x] Show points in individual questions
- [x] Fix CSS
  - [x] Add more padding in the card
  - [x] Checkboxes and toggle buttons should be indented (add left padding)
- [x] At the end of quiz play, let the user give a feedback (containing review message and rating)

## Quiz Play

- [x] Handle scheduled quiz (set a restriction): Play quiz button should be unclickable and add a tooltip saying "This quiz hasn't started yet".
- [x]When the user has submitted, show him a confirmation dialog and THEN redirect to the quiz home

## Quiz Home

-[x] Show subscriber count, participant count, average rating (these fields will be in the quiz instance)

-[x]Fix the time of publication (use package for formatting time if necessary, e.g. `moment`): There's a `createdAt` field in the quiz instance. Format this and show it as the time of publication.

## Tasks pending

- [x]  Show participant name in the bar of result page, evaluation script
- [x]  Route after submission in manual evaluation
- [x]  Handle Blank page in manual evaluation
- []  Duplicate in option Error
- [x]  no point in survey
- [x]  Shuffle
- []  Forum edit delete
- []  patch in edit quiz
- [x]  Front page quiz logic
- []  Forget password
- []  Shuffle boolean integration
- []  Upvote downvote
- []  Delete quiz,stage
- []  Clear textfield after post

