export default class User{
public id:String;
  public userName?: String;
  public email?:String;
  public credits?:Number;

  public accountCreation!: Date;
  public accountLastConnection!: Date;
  /**
   *
   */
  constructor(id:String) {
    this.id = id;   
  }
}