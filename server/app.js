const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../../uoft-hacks11-firebase-adminsdk-2temu-4b8d1ff980.json'); // replace with your actual path
const session = require('express-session');
const https = require('https');
const socketio = require('socket.io');

const app = express();
const port = 3000;

//establish TCP connections to the API
const server = https.createServer(app);
const io = socketio(server);

//initialize firebase admin sdk
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://uoft-hacks11-default-rtdb.firebaseio.com',
});

//initialize firestore
const db = admin.firestore();
//const msgsRef = db.collection('msgs');
const conversationRef = db.collection('Conversations');
const usersRef = db.collection('users');

// Configure session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// main endpoints for the app
app.get('/homepage', (req,res) => {
    res.send('homepage');
})

app.get('/login', (req, res) => {
   res.send('login'); 
});

//login request auth
app.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    // Get documents from the "users" collection
    db.collection('users').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if(doc.name == name && doc.password == password){
                    req.session.loggedIn = true; // Store login status in session
                    req.session.userID = doc.id; // Store user ID in session
                    res.status(200).render('homepage');
                }
            });
            res.status(401).send('Login failed');
        })
        .catch((error) => {
            console.log('Error getting documents:', error);
            res.status(500).send('Error retrieving documents');
        });
});

//A certain conversations is displayed when the user clicks on it --> link to the conversation in message previews  
app.get('/msgs/:conversation-id', (req, res) => {
    const conversationId = req.params['conversation-id'];
    req.session.conversationId = conversationId; // Store conversation ID in session
    res.send('msgs');
});

//When a message is sent, it is added to the conversation history 
app.post('/msgs:conversation-id', (req, res) => {
    const message = req.body.message;
    message['text'] = message;
    message['timestamp'] = new Date().getTime();
    message['sender'] = req.session.userID;
    
    // Add a new document to the "msgs" collection
    db.collection('msgs').add({
        message: message
    })
    .then(() => {
        //reload the DOM with the new message
        res.status(200).send('Message added successfully');
    })
    .catch((error) => {
        console.log('Error adding message:', error);
        res.status(500).send('Error adding message');
    });

})
app.get('/recap', (req, res) => {

})

io.on('connection', (socket) => {
    console.log('New WebSocket connection');
    
});

//listening on port 3000...
app.listen(port, () => console.log(`Server listening on port ${port}!`));
//Listens over the message collection
const conversationsRef = firebase.database().ref('conversations');

// Assuming conversationsRef is a reference to a Firestore collection
conversationsRef.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            const conversationId = change.doc.id;
            const messagesRef = conversationsRef.doc(`${conversationId}/messages`);

            messagesRef.onSnapshot((snapshot) => {
                // Update the DOM with the new message
                const message = snapshot.data();
            }, (error) => {
                console.log('The read failed: ', error);
            });
        }
    });
});
