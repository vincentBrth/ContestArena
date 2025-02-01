/**
 * Represents a restricted string with specific validation rules.
 */



/**
 * Represents a string with restrictions on its length and optional pattern matching.
 */
export class ResrictedString {
    constructor(
        public value: string = "",
        public minLength: number = 6,
        public maxLength: number = 64,
        public regex: RegExp | null = null,
    ) { }

    /**
     * Checks if the string is valid according to the defined constraints.
     * 
     * @returns {boolean} `true` if the string is valid, `false` otherwise.
     */
    valid(): boolean {
        return this.value.length >= this.minLength && this.value.length <= this.maxLength && (this.regex ? this.regex.test(this.value) : true);
    }
}


/**
 * Represents a restricted email string with specific validation rules.
 * 
 * This class extends `ResrictedString` and enforces the following constraints:
 * - The email must be between 1 and 64 characters in length.
 * - The email must match the provided regular expression pattern, which ensures:
 *   - The email does not start or end with a dot.
 *   - The email contains valid characters before and after the "@" symbol.
 * 
 * @extends {ResrictedString}
 * 
 * @param {string} value - The email string to be validated and restricted. Defaults to an empty string.
 */
export class RestrictedEmail extends ResrictedString {
    constructor(public value: string = "") {
        super(value, 1, 64, /^((?!\.)[\w\-_.]*[^.])(@[\w\-_.]*)[^.\W]$/);
    }
}