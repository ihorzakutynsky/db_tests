const { generateMockLogs } = require("./helper");

const dbDrivers = ["mongo", "redis", "elasticsearch", "dynamo"];

const dbType = process.argv[2] || "mongo";
const documentsCount = process.argv[3] || 1000;

if (!dbDrivers.includes(dbType)) {
    console.log(`Driver ${dbType} not found`);
    process.exit(1);
}

const db = require(`./dbDrivers/${dbType}`);

const run = async () => {
    console.log("Start data gen");
    const data = await generateMockLogs(documentsCount);
    console.log("Finish data gen");
    const savePromises = data.map(item => {
        return new Promise((resolve, reject) => {
            db.insert(item).then(res => resolve(res)).catch(e => reject(e))
        })
    })

    const startTime = Date.now();

    try {
        const res = await Promise.all(savePromises);
        const took = Date.now() - startTime;
        console.log(`Res: ${res.length}, Time: ${took} ms, Avg: ${took / res.length} ms/request.`);
    } catch (e) { console.log(e) }
    
}

run();
