
API = "https://postboxserver.herokuapp.com/api";

// user endpoints

"/add-user" (post) = "Inserting a new user"

"/select-user" (get) = "For getting a list of all users"

"/edit-user" (post) = "Updating an existing user"

"/remove-user" (post) = "Deleting an user"

"/verify-user" (post) = "For verifying whether an user exists or not using {email & password}"

"/user-detail" (post) = "for getting full data of a single user using {_id}"

// post endpoints

"/add-post" (post) = "Inserting a new post"

"/select-post" (get) = "For getting a list of all posts"

"/edit-post" (post) = "Updating an existing post"

"/remove-post" (post) = "Deleting an post"


// comment endpoints

"/add-comment" (post) = "Inserting a new comment"

"/select-comment" (get) = "For getting a list of all comments"

"/user-comment" (post) = "For getting a list of all comments of a single user {user_id}"

"/post-comment" (post) = "For getting a list of all comments of a single post {post_id}"

"/edit-comment" (post) = "Updating an existing comment"

"/remove-comment" (post) = "Deleting an comment"
