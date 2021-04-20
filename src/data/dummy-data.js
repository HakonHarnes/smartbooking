export const RESERVATIONS = [
    {
        res_id: 0,
        room_id: 1,
        user_id: 1,
        room_name: '201',
        building_name: 'Dokken',
        start_time: new Date('2021-04-12T09:30:00.000Z'),
        end_time: new Date('2021-04-12T14:30:00.000Z')
    },
    {
        res_id: 1,
        room_id: 1,
        user_id: 2,
        room_name: '301',
        building_name: 'Ivar Aasens',
        start_time: new Date('2021-04-13T09:30:00.000Z'),
        end_time: new Date('2021-04-13T10:30:00.000Z')
    },
    {
        res_id: 2,
        room_id: 1,
        user_id: 5,
        room_name: '402',
        building_name: 'Dokken',
        start_time: new Date('2021-04-14T09:30:00.000Z'),
        end_time: new Date('2021-04-14T10:00:00.000Z')
    },
    {
        res_id: 3,
        room_id: 1,
        user_id: 3,
        room_name: '402',
        building_name: 'Dokken',
        start_time: new Date('2021-04-15T09:30:00.000Z'),
        end_time: new Date('2021-04-15T10:00:00.000Z')
    },
    {
        res_id: 4,
        room_id: 1,
        user_id: 2,
        room_name: '402',
        building_name: 'Dokken',
        start_time: new Date('2021-04-16T09:30:00.000Z'),
        end_time: new Date('2021-04-16T10:00:00.000Z')
    },
    {
        res_id: 4,
        room_id: 1,
        user_id: 1,
        room_name: '402',
        building_name: 'Dokken',
        start_time: new Date('2021-04-17T09:30:00.000Z'),
        end_time: new Date('2021-04-17T11:00:00.000Z')
    }
];

export const BUILDINGS = [
    { building_id: 0, building_name: 'A-Bygget', user_id: 2 },
    { building_id: 1, building_name: 'B-Bygget', user_id: 2 },
    { building_id: 2, building_name: 'C-Bygget', user_id: 2 },
    { building_id: 3, building_name: 'D-Bygget', user_id: 2 },
    { building_id: 4, building_name: 'E-Bygget', user_id: 2 },
    { building_id: 5, building_name: 'F-Bygget', user_id: 2 },
    { building_id: 6, building_name: 'G-Bygget', user_id: 2 },
    { building_id: 7, building_name: 'H-Bygget', user_id: 2 },
    { building_id: 8, building_name: 'LOL-Bygget', user_id: 3 }
];

export const ROOMS = [
    { room_id: 1, room_name: '002G', size: 4, is_active: 1, user_id: 2, building_id: 1 },
    { room_id: 2, room_name: '013G', size: 6, is_active: 1, user_id: 2, building_id: 1 },
    { room_id: 3, room_name: '666G', size: 6, is_active: 1, user_id: 2, building_id: 2 },
    { room_id: 4, room_name: '222G', size: 12, is_active: 1, user_id: 2, building_id: 2 },
    { room_id: 5, room_name: '112G', size: 8, is_active: 1, user_id: 2, building_id: 2 },
    { room_id: 6, room_name: '992G', size: 5, is_active: 1, user_id: 2, building_id: 3 },
    { room_id: 7, room_name: 'AAFG', size: 3, is_active: 1, user_id: 2, building_id: 5 },
    { room_id: 8, room_name: '2001', size: 12, is_active: 1, user_id: 2, building_id: 8 },
    { room_id: 9, room_name: '3001', size: 15, is_active: 1, user_id: 2, building_id: 8 }
];
