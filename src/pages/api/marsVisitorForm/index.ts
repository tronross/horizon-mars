import { formSchema } from '../../../lib/formSchema';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const result = formSchema.safeParse(req.body);

    if (!result.success) {
      // If validation fails, send a 400 Bad Request response with the validation errors
      res.status(400).json({ message: 'Invalid data', errors: result.error.errors });
      return;
    }

    console.log('Validated data:', result.data);
    res.status(200).json({ message: 'ok' });
    console.log('You have reached POST api/marsVisitorForm')
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}