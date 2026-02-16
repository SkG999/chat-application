import { Conversation } from "../models/conversationModel.js";
import { Message } from "./../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    //  Make sure it firstly that, kis kis ke beech conversation is goin on
    let gotCoversation = await Conversation.findOne({
      // Ab yha dekhenge ki kis kis ke beech conversation chal rahi hai "Conversation model me "
      // All operator id se find kar deta hai sb kuch
      participants: { $all: [senderId, receiverId] },
    });
    if (!gotCoversation) {
      gotCoversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      gotCoversation.messages.push(newMessage._id);
    }
    await gotCoversation.save();
    return res
      .status(200)
      .json({ message: "Message sent successfully !", newMessage });
  } catch (error) {
    console.log(`Error is : ${error}`);
  }
};
