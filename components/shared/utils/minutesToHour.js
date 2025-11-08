export default function minutesToHour(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours ? 
    (remainingMinutes ? `${hours}ч ${remainingMinutes}мин` : `${hours}ч`) : 
    `${remainingMinutes}мин`;
}