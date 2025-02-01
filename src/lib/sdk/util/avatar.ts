/**
 * Generate avatar
 */
import { toSvg } from 'jdenticon';


/**
 * Generates a base64 encoded SVG avatar image for a given pseudo.
 *
 * @param {string} pseudo - The pseudo string used to generate the avatar.
 * @returns {string} A base64 encoded avatar.
 */
export function generateAvatar(pseudo: string): string {
    return `data:image/svg+xml;base64,${btoa(toSvg(pseudo, 256))}`;
}