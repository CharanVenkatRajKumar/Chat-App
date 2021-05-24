 class chatroom{
     constructor(room , username){
         this.room = room;
         this.username = username;
         this.chats = db.collection('chats')
         this.unsub
        }
     async addchat(message){
         const now = new Date();
         const chat = {
             message:message,
             room:this.room,
             username:this.username,
             created_at:firebase.firestore.Timestamp.fromDate(now)
         };
         //save to database
         const response = await this.chats.add(chat);
         return response   
     }
     getchats(callback){
         this.unsub = this.chats
         .where('room' , '==' , this.room)
         .orderBy('created_at')
         .onSnapshot(snapshot =>{
             snapshot.docChanges().forEach(change=>{
                 if(change.type === 'added'){
                     callback(change.doc.data());
                 }
             }) 
         })
     }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', username )
    } 
    updateroom(room){
        this.room = room;
        if(this.unsub){
            this.unsub();
        }
    }
 }


