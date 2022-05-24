# stocksbot
Web-app that tracks the popularity and sentiment of the stocks the user is interested in from the subreddit WSB.  Users can login to create their own list of stocks they want to track. When they select the stock, they can also see all the post related to that stock


4/25 todo
1. ~~add to user list (refer to TaskListPage)done~~
2. ~~Format delete button~~
3. ~~CRUD for notes~~
  3.1 ~~create and delete~~
  3.1.1 ~~put request not successful~~
  3.1.2 ~~fix modal~~
  3.1.3 ~~close the modal~~
  3.1.4 update usestate
4. ~~Add sentiment data~~
5. ~~Add price data - redign finnhub~~
6. authentication
6. styling
7. add stock name to notes / add stock filter for notes

Questions:
<notepage /> <NoteListSummary> Each child in a list should have a unique "key" prop.
where should I put the key note
key={props.note.id}