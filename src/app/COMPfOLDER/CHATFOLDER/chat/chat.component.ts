import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../SHARED/data.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  title = 'instant-chatting';
  // user: String;
  public user = localStorage.getItem('id');
  room: String;
  // tslint:disable-next-line:ban-types
  messageText: String;
  messageArray: Array<{user: String , message: String }> = [];
  constructor(private instantChatservice: DataService){
    this.instantChatservice.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this.instantChatservice.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.instantChatservice.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  join(){
      this.instantChatservice.joinRoom({user: this.user, room: this.room});
  }

  leave(){
    this.instantChatservice.leaveRoom({user: this.user, room: this.room});
  }

  sendMessage()
  {
    this.instantChatservice.sendMessage({user: this.user, room: this.room, message: this.messageText});
  }


}