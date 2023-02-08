import db from '@/db'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const { email, name, message } = req.body
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

      if (!emailRegex.test(email) || !name.trim() || !message.trim()) {
        res.status(422).json({ code: 1, msg: 'Invalid input!' })
        return
      }
      const contacts = db.collection('contacts')
      const now = new Date()
      try {
        const result = await contacts.insertOne({
          email: email.trim(),
          name: name.trim(),
          message: message.trim(),
          created: now,
          updated: now
        })
        res.status(201).json({ code: 0, insertedId: result.insertedId })
      } catch (e) {
        res.status(503).json({ code: 1, msg: 'Something went wrong!' })
      }
      break

    default:
      res.status(404).send('<h1>404 Not Found</h1>')
  }
}
