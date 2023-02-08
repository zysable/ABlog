import { useEffect, useRef, useState } from 'react'
import Notification from '../ui/notification'
import classes from './contact-form.module.css'

function ContactForm() {
  const formRef = useRef()
  const [requestStatus, setRequestStatus] = useState()
  const [requestError, setRequestError] = useState()

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
        setRequestError(null)
      }, 3000)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [requestStatus])

  async function sendMessageHandler(event) {
    event.preventDefault()

    setRequestStatus('pending')

    const sendBody = {
      email: formRef.current.email.value,
      name: formRef.current.name.value,
      message: formRef.current.message.value
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(sendBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.msg || 'Something went wrong!')
      }
      formRef.current.email.value = ''
      formRef.current.name.value = ''
      formRef.current.message.value = ''
      setRequestStatus('success')
    } catch (e) {
      setRequestStatus('error')
      setRequestError(e.message)
    }
  }

  let notification
  switch (requestStatus) {
    case 'pending':
      notification = {
        status: 'pending',
        title: 'Sending message...',
        message: 'Your message is on its way!'
      }
      break
    case 'success':
      notification = {
        status: 'success',
        title: 'Success!',
        message: 'Message sent successfully!'
      }
      break
    case 'error':
      notification = {
        status: 'error',
        title: 'Error!',
        message: requestError
      }
      break
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form
        onSubmit={sendMessageHandler}
        ref={formRef}
        className={classes.form}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input type="text" name="name" id="name" required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea name="message" id="message" rows="5" required />
        </div>
        <div className={classes.actions}>
          <button type="submit">Send Message</button>
        </div>
      </form>
      {notification && <Notification {...notification} />}
    </section>
  )
}

export default ContactForm
