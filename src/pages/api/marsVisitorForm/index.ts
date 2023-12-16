///////////////////////////
// marsVisitorForm Handler
///////////////////////////

import { NextApiRequest, NextApiResponse } from 'next';
import { formSchema } from '../../../lib/formSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Validate the data, server-side
    const result = formSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
      return;
    }

    // Code to save the data to a database would go here,
    // but we're just going to log it to the console as proof of concept
    console.log('Validated data:', result.data);
    res.status(200).json({ message: 'ok' });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}