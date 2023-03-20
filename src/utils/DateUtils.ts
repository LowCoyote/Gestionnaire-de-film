
export default class DateUtils {
    static getFormattedDate(date: string): string {
        const dateParts = date.split('-');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    }

    static getUnformattedDate(date: string): string {
        const dateParts = date.split('/');
        return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
    }
}
