import html2pdf from 'html2pdf.js';
import QRcode from 'qrcode';

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

export const roleToNorwegian = {
    customer: 'Kunde',
    admin: 'Administrator',
    user: 'Bruker'
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

export const saveQrToPdf = async rooms => {
    const section = document.createElement('section');

    const div = document.createElement('div');
    const img = document.createElement('img');
    img.style.width = '54%';
    img.style.marginLeft = '23%';
    img.style.marginTop = '100px';

    const p = document.createElement('p');
    p.style.fontSize = '40px';
    p.style.width = '100%';
    p.style.marginTop = '50px';
    p.style.textAlign = 'center';

    await rooms.forEach(async room => {
        const url = await QRcode.toDataURL(`${process.env.VUE_APP_LINK}/finn-rom/velg?rom=${room.room_id}`, {
            width: 520
        });
        img.src = url;
        p.innerHTML = room.room_name;
        div.appendChild(p);
        div.appendChild(img);
        section.appendChild(div.cloneNode(true));
    });

    html2pdf()
        .set({
            filename: rooms.length > 1 ? 'qr' : `qr_${rooms[0].room_name}`,
            pagebreak: {
                after: 'div'
            }
        })
        .from(section)
        .save();
};
