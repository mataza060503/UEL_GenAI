export class ChatMessage {
  _id: string;
  ChatId: string;
  User: string;
  System: string;
  CreateAt: Date;

  constructor(data: any) {
    this._id = data._id;
    this.ChatId = data.ChatId;
    this.User = data.User;
    this.System = data.System;
    this.CreateAt = new Date(data.CreateAt);
  }

  static fromJSON(data: any): ChatMessage {
    return new ChatMessage(data);
  }

  static fromJSONArray(dataArray: any[]): ChatMessage[] {
    return dataArray.map((item) => ChatMessage.fromJSON(item));
  }
}
