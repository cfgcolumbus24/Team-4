const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.post('/volunteers', async (req, res) => {
    const { name, email, availability, preferredSubjects } = req.body;
    if (!name || !email || !availability || !preferredSubjects) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, availability, and preferred subjects are required.'
        });
    }
    try {
        const volunteerRef = db.collection('volunteers').doc();
        await volunteerRef.set({
            name,
            email,
            availability,
            preferredSubjects
        });
        res.status(201).json({
            success: true,
            message: 'Volunteer availability submitted successfully.',
            volunteerId: volunteerRef.id
        });
    } catch (error) {
        console.error("Error adding volunteer:", error);
        res.status(500).json({
            success: false,
            error: 'Failed to submit volunteer availability.'
        });
    }
});

app.get('/volunteers', async (req, res) => {
    try {
        const volunteersSnapshot = await db.collection('volunteers').get();
        const volunteers = volunteersSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        res.status(200).json({
            success: true,
            volunteers
        });
    } catch (error) {
        console.error("Error retrieving volunteers:", error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve volunteers.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
