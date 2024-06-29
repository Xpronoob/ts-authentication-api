export class Validators {
  static get email () {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  }

  /*
    * Password must be at least 6 characters long
    * Must contain at least one uppercase letter
    * Must contain at least one lowercase letter
    * Must contain at least one number
    * Must contain at least one special character
  */
  static get password () {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
  }
}
