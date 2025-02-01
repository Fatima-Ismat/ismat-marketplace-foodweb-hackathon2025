import { NextApiRequest, NextApiResponse } from 'next';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'your_project_id', // replace with your Sanity project ID
  dataset: 'production',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN, // ensure this token is set in your environment variables
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { cart, user } = req.body;

    // Validate and sanitize input
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: 'Invalid cart data' });
    }

    try {
      // Create a new checkout document in Sanity
      const doc = {
        _type: 'checkout',
        user,
        cart,
        createdAt: new Date().toISOString(),
      };

      const result = await client.create(doc);
      res.status(200).json({ message: 'Checkout successful', result });
    } catch (error) {
      res.status(500).json({ message: 'Error processing checkout', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 