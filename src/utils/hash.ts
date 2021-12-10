import * as bcrypt from 'bcrypt';

export class Hash {
    public static async createHash(text) {
        const saltOrRounds = 10;
        const password = text;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    public static async verifyHash(password, hash) {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    }
}