import React, { useState, useEffect } from 'react'
import { Snackbar } from 'react-native-paper'

const awaitTime = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), duration)
  })
}

export default ({ messages = [] }) => {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (messages.length) {
      showSnack()
    }
  }, [])

  const sendNotification = () => {
    return new Promise(async (resolve, reject) => {
      try {
        await fetch('https://maker.ifttt.com/trigger/resume_viewed/with/key/j4Os_DwMKztYvI0EwJA0g-TxOu_EX1rn1VpFSAoFw2p')
        resolve()
      } catch (e) {
        console.log(e)
        resolve()
      }
    })
  }

  const showSnack = async () => {
    for (let { duration, message } of messages) {
      setMessage(message)
      setDuration(duration)
      setVisible(true)
      await awaitTime(duration)
      if (message.toLowerCase().includes('sending')) { await sendNotification() }
      setVisible(false)
      await awaitTime(200)
    }
  }

  return (
    <>
      <Snackbar duration={duration} visible={visible} onDismiss={() => null}>
        {
          message
        }
      </Snackbar>
    </>
  )
}
