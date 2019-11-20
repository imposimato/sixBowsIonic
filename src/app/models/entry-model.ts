export class EntryModel {
    public id: number;
    public value: number;
    public category: string;
    public date: Date;
    public comment: string;

    [x: string]: any;
}
