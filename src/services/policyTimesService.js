import axios from './axios';

class timesService {
    getById = async id => {
        const response = await axios.get('/times/' + id);
        return response.data;
    };

    register = async (
        startMon,
        endMon,
        startTue,
        endTue,
        startWed,
        endWed,
        startThu,
        endThu,
        startFri,
        endFri,
        startSat,
        endSat,
        startSun,
        endSun,
        id
    ) => {
        const response = await axios.post('/times', {
            data: {
                startMon,
                endMon,
                startTue,
                endTue,
                startWed,
                endWed,
                startThu,
                endThu,
                startFri,
                endFri,
                startSat,
                endSat,
                startSun,
                endSun,
                id
            }
        });
        return response.data;
    };

    update = async (
        startMon,
        endMon,
        startTue,
        endTue,
        startWed,
        endWed,
        startThu,
        endThu,
        startFri,
        endFri,
        startSat,
        endSat,
        startSun,
        endSun,
        id
    ) => {
        const response = await axios.put('/times', {
            data: {
                startMon,
                endMon,
                startTue,
                endTue,
                startWed,
                endWed,
                startThu,
                endThu,
                startFri,
                endFri,
                startSat,
                endSat,
                startSun,
                endSun,
                id
            }
        });
        return response.data;
    };

    delete = async id => {
        const response = await axios.delete('/times/' + id);
        return response.data;
    };
}

export default new timesService();
