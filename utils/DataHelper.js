export default class DataHelper {
    // Generate a unique 6-digit Employee ID
    static generateEmpID() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // Generate a random string of given length
    static randomString(length = 6) {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    // Generate random first name
    static generateFirstName() {
        return this.randomString(6); // e.g., "jksdfr"
    }

    // Generate random last name
    static generateLastName() {
        return this.randomString(8); // e.g., "pqmdztyn"
    }

    // Generate a random email
    static generateEmail(firstName, lastName) {
        const domain = ["testmail.com", "mailinator.com", "example.com"];
        return `${firstName}.${lastName}${Date.now()}@${domain[Math.floor(Math.random() * domain.length)]
            }`;
    }

    // Generate full employee object
    static generateEmployee() {
        const firstName = this.generateFirstName();
        const lastName = this.generateLastName();
        const empID = this.generateEmpID();
        const email = this.generateEmail(firstName, lastName);

        return { firstName, lastName, empID, email };
    }
}
