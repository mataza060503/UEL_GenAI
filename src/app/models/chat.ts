export class ChatHistory {
  _id: string;
  AccountId: string;
  Title: string;
  CreateAt: Date;
  UpdateAt: Date;

  constructor(data: any) {
    this._id = data._id;
    this.AccountId = data.AccountId;
    this.Title = data.Title;
    this.CreateAt = new Date(data.CreateAt);
    this.UpdateAt = new Date(data.UpdateAt);
  }

  static fromJSON(data: any): ChatHistory {
    return new ChatHistory(data);
  }

  static fromJSONArray(dataArray: any[]): ChatHistory[] {
    return dataArray.map((item) => ChatHistory.fromJSON(item));
  }
}
