import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay instance
const razorpay = new (Razorpay as any)({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret',
});

export const createOrder = async (amount: number, currency: string = 'INR', receipt: string) => {
  const options = {
    amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
    currency,
    receipt,
  };
  
  return await razorpay.orders.create(options);
};

export const verifyWebhookSignature = (body: string, signature: string, secret: string): boolean => {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return expectedSignature === signature;
};
