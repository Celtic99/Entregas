const { Router } = require('express')
const router = Router()
const MessageService = require('../services/messageService')
const messageService = new MessageService()

router.get('/', async (req, res) => {
  try {
    const messages = await messageService.getMessages()
    res.json({ messages })
  } 
    catch (error) {
    console.error('Error al obtener mensajes:', error.message)
    res.status(500).json({ error: 'Error al obtener mensajes' })
  }
})

router.post('/', async (req, res) => {
  const { user, message } = req.body
  try {
    const newMessage = await messageService.addMessage({ user, message })
    res.json({ message: 'Mensaje agregado', newMessage })
  } 
    catch (error) {
    console.error('Error al agregar mensaje:', error.message)
    res.status(500).json({ error: 'Error al agregar mensaje' })
  }
})

module.exports = router
