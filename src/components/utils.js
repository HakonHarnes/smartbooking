export const dayOfWeekMapper = {
    0: 'Søndag',
    1: 'Mandag',
    2: 'Tirsdag',
    3: 'Onsdag',
    4: 'Torsdag',
    5: 'Fredag',
    6: 'Lørdag'
};

export const getDateString = (date, norwegian = true) => {
    const vars = { month: date.getMonth() + 1, day: date.getDate() };
    const month = vars.month > 9 ? vars.month : `0${vars.month}`;
    const day = vars.day > 9 ? vars.day : `0${vars.day}`;

    return norwegian ? `${day}.${month}.${date.getFullYear()}` : `${date.getFullYear()}-${month}-${day}`;
};
