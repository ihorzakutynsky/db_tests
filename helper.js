const uuidv4 = require('uuid/v4');

const logPromise = () => {
    return new Promise((resolve, reject) => {
        try {
            resolve({
                api: {S: uuidv4()},
                request: {S: `/time/${uuidv4()}`},
                request_method: {S: "GET"},
                version: {S: "2016-01"},
                RemoteAddr: {S: "127.0.0.1"},
                server: {S: `sirin-${uuidv4()}`},
                id: {S: uuidv4()},
                accountid: {S: uuidv4()},
                url: {S: "/2016-01/time"},
                statusCode: {S: "200"},
                duration: {S: "0.486712"},
                body: {S: "{}"}
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