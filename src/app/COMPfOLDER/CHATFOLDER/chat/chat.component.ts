import { Component, OnInit } from '@angular/core';
import { DataService } from "../../../SHARED/data.service";
import { ApiserviceService } from 'src/app/SHARED/apiservice.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  
  ngOnInit(): void {

    this.fn_UserProfile();
  }

  fn_UserProfile() {
    let data ={ id: localStorage.getItem('id') }

    this.api.methPOst('userp',data).subscribe((res) => {
      this.user = res['arrList']['username']
    }, (error) => {
      // console.log(error, 'this is my error')
    })
  }

  title = 'instant-chatting';
  // user: String;

  public user = ''
  room: String;
  // tslint:disable-next-line:ban-types
  messageText: String;
  messageArray: Array<{user: String , message: String }> = [];
  constructor(private instantChatservice: DataService, private api:ApiserviceService){
    this.instantChatservice.newUserJoined()
      .subscribe(data => this.messageArray.push(data));


    this.instantChatservice.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.instantChatservice.newMessageReceived()
      .subscribe(data => this.messageArray.push(data));
  }

  join(){
      this.instantChatservice.joinRoom({user: this.user, room: this.room});
      console.log(this.user)
  }

  leave(){
    this.instantChatservice.leaveRoom({user: this.user, room: this.room});
  }

  sendMessage()
  {
    if(this.messageText != ''){
    this.instantChatservice.sendMessage({user: this.user, room: this.room, message: this.messageText});
    this.messageText = ''}
    else{
      
    }
  }




}