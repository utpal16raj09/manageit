import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { createOrder, verifyWebhookSignature } from '../services/razorpay';

const router = Router();
const prisma = new PrismaClient();

router.post('/create-order', async (req, res) => {
  const { amount, receipt, invoiceId, idempotencyKey } = req.body;
  
  try {
    if (idempotencyKey) {
      const existingPayment = await prisma.payment.findUnique({
        where: { idempotencyKey }
      });
      if (existingPayment && existingPayment.razorpayOrderId) {
        return res.json({ orderId: existingPayment.razorpayOrderId, amount: existingPayment.amount });
      }
    }

    const order = await createOrder(amount, 'INR', receipt);

    await prisma.payment.create({
      data: {
        invoiceId,
        razorpayOrderId: order.id,
        amount,
        idempotencyKey,
      }
    });

    res.json(order);
  } catch (error) {
    console.error('Failed to create order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

router.post('/webhook', async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'dummy_secret';
  const signature = req.headers['x-razorpay-signature'] as string;
  const rawBody = (req as any).rawBody || JSON.stringify(req.body);

  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    return res.status(400).json({ status: 'ignored', reason: 'invalid signature' });
  }

  const event = req.body;

  if (event.event === 'payment.captured') {
    const paymentId = event.payload.payment.entity.id;
    const orderId = event.payload.payment.entity.order_id;
    const amountCaptured = event.payload.payment.entity.amount / 100;

    try {
      const payment = await prisma.payment.findUnique({
        where: { razorpayOrderId: orderId }
      });

      if (payment && payment.status !== 'SUCCESS') {
        await prisma.payment.update({
          where: { razorpayOrderId: orderId },
          data: {
            status: 'SUCCESS',
            razorpayPaymentId: paymentId
          }
        });

        if (payment.invoiceId) {
          const invoice = await prisma.invoice.findUnique({
            where: { id: payment.invoiceId }
          });

          if (invoice) {
            const newAmountPaid = invoice.amountPaid + amountCaptured;
            const newStatus = newAmountPaid >= invoice.amountDue ? 'PAID' : 'PARTIAL';

            await prisma.invoice.update({
              where: { id: invoice.id },
              data: {
                amountPaid: newAmountPaid,
                status: newStatus
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('Webhook processing error:', error);
      return res.status(500).send('Server Error');
    }
  }

  res.json({ status: 'ok' });
});

export default router;
