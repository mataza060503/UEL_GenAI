export class Prompt {
  Message: string | null;
  ChatId: string | null;

  constructor(data: any) {
    this.Message = data.Message || data.message || null;
    this.ChatId = data.ChatId || data.chatId || null;
  }

  static fromJSON(data: any): Prompt {
    return new Prompt(data);
  }

  static fromJSONArray(dataArray: any[]): Prompt[] {
    return dataArray.map((item) => Prompt.fromJSON(item));
  }
}
