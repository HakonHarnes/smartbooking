export const dayOfWeekMapper = {
    0: 'Søndag',
    1: 'Mandag',
    2: 'Tirsdag',
    3: 'Onsdag',
    4: 'Torsdag',
    5: 'Fredag',
    6: 'Lørdag'
};

export const dayOfWeekMapperEng = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat'
};

export const getDateString = (date, norwegian = true) => {
    const vars = { month: date.getMonth() + 1, day: date.getDate() };
    const month = vars.month > 9 ? vars.month : `0${vars.month}`;
    const day = vars.day > 9 ? vars.day : `0${vars.day}`;

    return norwegian ? `${day}.${month}.${date.getFullYear()}` : `${date.getFullYear()}-${month}-${day}`;
};

export const getTime = date => {
    const vars = { hours: date.getHours(), minutes: date.getMinutes() };
    const hours = vars.hours > 9 ? vars.hours : `0${vars.hours}`;
    const minutes = vars.minutes > 9 ? vars.minutes : `0${vars.minutes}`;

    return `${hours}:${minutes}`;
};
