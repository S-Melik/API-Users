const express = require('express');
const app = express();

app.use(express.json());

const users = [
    {id: 1, name: 'user1'},
    {id: 2, name: 'user2'},
    {id: 3, name: 'user3'},
];

// the get method takes two arguments
// the first one is the path (url)
// the second one is a call back function that also have two arguments req and res
app.get('/', (req, res) => {
    res.send('Hello World');
}); 

app.get('/api/users', (req, res) => {
    res.send(users);
 });

 app.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id == parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
 });

 app.post('/api/users', (req, res) => {
    if (!req.body.name || req.body.name.length < 3) {
        // 400 bad Request
        return res.status(400).send('Name is required and should be minimum 3 characters.')
    }
    const user = {
        id: users.length + 1,
        name: req.body.name
    };  
    users.push(user);
    res.send(user);
 });

// app.put()
 app.patch('/api/users/:id', (req, res) => {
    // Look up for the user
    // If not existing, return 404
    const user = users.find(c => c.id == parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    // Validate
    // If invalid, return 400 - Bad request
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(400).send('Name is required and should be minimum 3 characters.')
    }

    // Update user
    user.name = req.body.name;
    // Return the update user
    res.send(user);
 });

 app.delete('/api/users/:id', (req, res) => {
    // Look up for the user
    // If not existing, return 404
    const user = users.find(c => c.id == parseInt(req.params.id));
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    // Delete
    const index = users.indexOf(user);
    users.splice(index, 1);

    // Return the same user
    res.send(user);
 });

 // PORT is an (environment variable)
const port = process.env.PORT || 3000;  // use port 3000, but if it's not avalible use another port
app.listen(3000, () => console.log(`Listening on port ${port}!!!`)); // setup a listener


// app.post()
// app.put()
// app.delete()