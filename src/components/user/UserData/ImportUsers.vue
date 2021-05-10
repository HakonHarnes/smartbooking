<template>
    <div class="csvUpload">
        <h3>Last opp CSV fil</h3>
        <input id="csv" type="file" @change="readFileAsString" />
        <div class="message" v-if="lines > 0">
            <p>Got {{ lines }} lines</p>
            <p>Found {{ errorList.length }} error</p>
        </div>
        <div class v-if="lines > 0">
            <div class="wrapper" v-if="errorList.length > 0">
                <p class="listHeader">Faulty Lines</p>
                <div class="listItem" v-for="item in errorList" :key="item.email">{{ item }}</div>
            </div>
            <div class="wrapper">
                <p class="listHeader">Successful Lines</p>
                <div class="listItem" v-for="item in list" :key="item.email">{{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            errorList: [],
            lines: 0
        };
    },
    methods: {
        readFileAsString(event) {
            const files = event.target.files;
            if (files.length === 0) {
                alert('No file is selected');
                return;
            }
            let fileName = files[0].name.split('.');
            console.log(fileName);
            if (fileName[fileName.length - 1] !== 'csv') {
                alert('Need to be CSV file');
                return;
            }
            let csvString;
            const reader = new FileReader();
            reader.onload = event => {
                csvString = event.target.result;
                const lines = csvString.split('\r\n');
                this.lines = lines.length - 1;
                const result = [];
                const faultyLines = [];
                const headers = lines[0].split(';');
                //Dårlig sjekk her. EVT sett delimiter her til ,
                if (headers.length <= 1) {
                    alert('Needs to be semicolon delimited');
                }
                let faulty = false;

                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i]) continue;
                    const obj = {};
                    const currentline = lines[i].split(';');
                    faulty = false;

                    for (let j = 0; j < headers.length; j++) {
                        if (currentline[j] === '' || (headers[j] === 'email' && !currentline[j].includes('@'))) {
                            faulty = true;
                        }
                        obj[headers[j]] = currentline[j];
                    }
                    if (!faulty) {
                        result.push(obj);
                    } else {
                        faultyLines.push(obj);
                    }
                }

                console.log(JSON.stringify(result)); //JSON
                this.list = result;
                this.errorList = faultyLines;
            };
            reader.readAsText(files[0]);
        }
    }
};
</script>

<style scoped>
#csv {
    width: 140px;
    margin: 1rem 0;
}

.actions {
    margin: 1.4rem 0 0;
}

.error {
    font-weight: 500;
    margin: 2rem 0 0.6rem;
    font-size: 1.2rem;
    color: rgb(200, 0, 0);
}
</style>
