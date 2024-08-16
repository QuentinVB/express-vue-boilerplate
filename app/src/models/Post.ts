import type User from "./User"

export default class Post {
  
  public id?: String
  public message!: String 
  public user!: User

  /**
   *
   */
  constructor(id: String) {
    this.id = id
  }
}
