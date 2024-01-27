const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../../uoft-hacks11-firebase-adminsdk-2temu-4b8d1ff980.json'); // replace with your actual path

const app = express();
const port = 3000;

//initialize firebase admin sdk
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://uoft-hacks11-default-rtdb.firebaseio.com',
});

//initialize firestore
const db = admin.firestore();

app.get('/login', (req, res) => {
   res.send('login'); 
});
app.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    // Get documents from the "users" collection
    db.collection('users').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if(doc.name == name && doc.password == password){
                    res.status(200).send('Login successful');
                }
            });
            res.status(401).send('Login failed');
        })
        .catch((error) => {
            console.log('Error getting documents:', error);
            res.status(500).send('Error retrieving documents');
        });
})
app.get('/signup', (req, res) => {
    res.send('signup');
})

app.get('/msgs', (req, res) => {
    res.send('msgs');
})
app.post('/msgs', (req, res) => {

})
app.get('/recap', (req, res) => {

})

//listening on port 3000...
app.listen(port, () => console.log(`Server listening on port ${port}!`));
