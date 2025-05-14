
const example_list = {"id":"40338767","name":"Handleliste","date_created":1454607288344,"date_modified":1746199576350,"syncable":false,"token":"Phqc5N7uH3QvDNt+RdJLMw==:D9yCeqEY1+PsgcCq6eMDJKAZ1w98IXDMH7kgzRh8iz4vWW89OP9CcZ9/rX1ECgnavHGj0rRlIbhQDf82A8B52StIQGu85nIZ2RaS0KflinmoSBGubncDMSEmbvytdtLGVR+PAGfA/W0EpqMfHzMUkFZpPcS2IQTrGA30qpiXuwnEPBO87P2sqVC0IENIAOTeXXWCbCoonYZbaSd6c+Zwtg==","sorting_scheme_id":"2"}

const example_task = {"id":"1112118573","series_id":"564008757","list_id":"40338768","name":"Søk lånekassen","priority":"PN","date_created":1738426482175,"date_added":1738426482175,"date_modified":1739070058330,"date_completed":1739070054000,"date_due_has_time":false,"date_start_has_time":false,"postponed":0,"source":"android","repeat_every":false,"tags":[]}

function unixEpochToISO(epoch) {
    const datetime = new Date(epoch)
    return datetime.toISOString()
}

function convert_list(rtm_list) {
    return {"id": rtm_list["id"], "name": rtm_list["name"], "date_created": unixEpochToISO(rtm_list["date_created"]),"date_modified":unixEpochToISO(rtm_list["date_modified"])}
}

function convert_task(rtm_task) {
    if (rtm_task["date_created"] != rtm_task["date_added"]) {
        console.log(`date_created ${unixEpochToISO(rtm_task["date_created"])} and date_added ${unixEpochToISO(rtm_task["date_added"])} are different for task ${rtm_task["id"]} (${rtm_task["name"]}).`)
    }
    return {"id":rtm_task["id"], "list_id":rtm_task["list_id"],"name":rtm_task["name"],"date_created":unixEpochToISO(rtm_task["date_created"]),"date_modified":unixEpochToISO(rtm_task["date_modified"]),"date_completed":unixEpochToISO(rtm_task["date_completed"])}
}

export function convert_rtm_info(rtmJSONStr) {
    rtmJson = JSON.parse(rtmJSONStr)
    const lists = map(convert_list, rtmJSON["lists"])
    const tasks = map(convert_task, rtmJSON["tasks"])
    return [lists, tasks]
}

console.log(convert_list(example_list))
console.log(convert_task(example_task))