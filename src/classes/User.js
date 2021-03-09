export default class User {
    constructor(email, password, firstName, lastName, isActive, role, id) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isActive = isActive;
        this.role = role;
        this.id = id;
    }
}
