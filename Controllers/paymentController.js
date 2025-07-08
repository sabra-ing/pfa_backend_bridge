const Payment = require('../models/Payment');
const User=require('../models/userModel');
const Course=require('../models/courseModel');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const FLOUCI_API_URL = 'https://api.flouci.com/v1';
const APP_ID = 'YOUR_FLOUCI_APP_ID';
const APP_SECRET = 'YOUR_FLOUCI_APP_SECRET';
const REDIRECT_URL = 'https://your-website.com/redirect'; // Example redirect URL after payment

exports.makePayment = async (req, res) => {
    const { amount, learnerId, courseId } = req.body;

    try {
        // Validate Learner, Session, Course existence
        if (!learnerId || !courseId || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Create a unique payment ID
        const paymentId = uuidv4();

        // Step 1: Get Flouci Access Token
        const tokenRes = await axios.post(`${FLOUCI_API_URL}/oauth/token`, {
            app_id: APP_ID,
            app_secret: APP_SECRET
        });

        const accessToken = tokenRes.data.result.access_token;

        // Step 2: Create a Flouci payment session
        const paymentRes = await axios.post(`${FLOUCI_API_URL}/payments/init`, {
            amount: amount,
            success_link: REDIRECT_URL,
            fail_link: REDIRECT_URL,
            developer_tracking_id: paymentId
        }, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const paymentLink = paymentRes.data.result.link;

        // Step 3: Save Payment to MongoDB
        const newPayment = new Payment({
            paymentId,
            amount,
            learnerId,
            courseId
        });

        await newPayment.save();
        await User.findByIdAndUpdate(learnerId,{$push:{paymentsId:newPayment._id}});
        await Course.findByIdAndUpdate(courseId,{$push:{paymentOne:newPayment._id}});

        // Send payment link to frontend to redirect the user
        res.status(200).json({ message: 'Payment session created', paymentLink });
    } catch (error) {
        console.error('Payment Error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Error creating payment', error: error.message });
    }
};
