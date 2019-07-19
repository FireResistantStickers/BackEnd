const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var obj = {
    title: String, // 제목
    category: String, // 카테고리
    nodeData: Object, // 아까봤던 노드 데이터들 {name:String,rank:0,link:Array,recommend:Array}
    recommend: Array,
    email: String,
    lastChange: {
        type: Date,
        default: Date.now
    },
}
var ConsoleSchema = new Schema(obj)

ConsoleSchema.statics.getConsoleStatusList = function () { // User 스키마에 대한 키값 반환
    return Object.keys(obj)
}
ConsoleSchema.statics.filterData = function (data) { // user 스키마에 맞는 데이터만 추출
    var obj = {}
    this.getConsoleStatusList().forEach(x => {
        if (data[x])
            obj[x] = data[x]
    })
    return obj
}
module.exports = mongoose.model('Console', ConsoleSchema);