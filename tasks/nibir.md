# Saturday, 10 July

## Quiz Creation

- [x] Add stage and question header (i.e. number).
- [x] Fix the image preview (the aspect ratio should be preserved)
- [x] Add points to each of the questions
- CSS fixing
  - Make the cards look similar to the cards in the figma design. -[x] Textfields should have the texts in the center (currently there is a top margin) -[x] Question text-field type should be changed (at least set it to outlined)
- The user should be able to toggle the radio button/checkbox/toggle button before saving his option. Ideally, there should be an "Add Option" button at the right side of the text-field for adding the option.

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

- Handle scheduled quiz (set a restriction): Play quiz button should be unclickable and add a tooltip saying "This quiz hasn't started yet".
- [x]When the user has submitted, show him a confirmation dialog and THEN redirect to the quiz home

## Quiz Home

-[x] Show subscriber count, participant count, average rating (these fields will be in the quiz instance)

-Fix the time of publication (use package for formatting time if necessary, e.g. `moment`): There's a `createdAt` field in the quiz instance. Format this and show it as the time of publication.
