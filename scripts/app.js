 const chatList = document.querySelector('.chat-list')
 const newChatFrom = document.querySelector('.new-chat')
 const newNameForm = document.querySelector('.new-name')
 const updatemsg = document.querySelector('.update-mssg')
 const rooms = document.querySelector('.chat-rooms')

 newChatFrom.addEventListener('submit' , e=>{
     e.preventDefault();
     const message = newChatFrom.message.value.trim();
     Chatroom.addchat(message)
     .then(() =>{
         newChatFrom.reset()
     })
     .catch((err) => {
         console.log(err)
     })
 })

 newNameForm.addEventListener('submit' , e=>{
     e.preventDefault();
     const newname = newNameForm.name.value.trim()
     Chatroom.updateName(newname);
     newNameForm.reset();
     updatemsg.innerText = `Your name was updated to ${newname}`
     setTimeout(() =>{
        updatemsg.innerText = ''
     },3000)
 })

 //update the chat room according to the buttons 
 rooms.addEventListener('click' , e =>{
     if(e.target.tagName === 'BUTTON'){
         ChatUI.clear();
         Chatroom.updateroom(e.target.getAttribute('id'))
         Chatroom.getchats(chat => ChatUI.render(chat));
     }
 })

//checking local storage for a name 
 const username = localStorage.username ? localStorage.username : 'anonymous'

 const ChatUI = new chatUI(chatList)
 const Chatroom = new chatroom('general' ,username);

Chatroom.getchats((data) =>{
    ChatUI.render(data)
})