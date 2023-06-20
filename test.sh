# test with httpie

# Create a new todo
http POST :3000/todos title="Test Todo" description="This is a test todo"

# Get all todos
http GET :3000/todos

# Delete a todo by ID (replace todo_id with the previous GET)
http DELETE :3000/todos/<todo_id>
