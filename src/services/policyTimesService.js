import axios from './axios';

class timesService {
    getById = async id => {
        const response = await axios.get('/times/' + id);
        return response;
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
        return response;
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
        return response;
    };

    delete = async id => {
        const response = await axios.delete('/times/' + id);
        return response;
    };
}

export default new timesService();
