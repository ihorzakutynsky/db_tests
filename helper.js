const uuidv4 = require('uuid/v4');

const logPromise = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve({
                timestamp: Date.now(),
                api: uuidv4(),
                request: `/time/${uuidv4()}`,
                request_method: "GET",
                version: "2016-01",
                RemoteAddr: "127.0.0.1",
                server: `sirin-${uuidv4()}`,
                id: uuidv4(),
                accountid: uuidv4(),
                url: "/2016-01/time",
                statusCode: "200",
                duration: 0.486712,
                body: "{}"
            });
        } catch(e) { reject(e); }
    })
}

const generateMockLogs = async (count) => {
    const promises = [];
    for (let i=0; i<count; i++) {
        promises.push(logPromise())
    }
    return await Promise.all(promises);
}



module.exports = {
    generateMockLogs
} 