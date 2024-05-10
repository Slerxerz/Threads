import Conversation from "../models/conversationModel"

async function sendMessage(req, res) {
    try {
        const {recipientId, message} = req.body
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants:{ $all:[senderId,recipientId] },
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
        console.log("Error in Send Message",error)
    }
}

export {sendMessage}