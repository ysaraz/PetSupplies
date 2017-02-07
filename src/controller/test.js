var xlsx = require('node-xlsx');
var path = require('path');
var lodash = require('lodash');
var fs = require('fs');

module.exports = {

	run:function(res , params){
		this.res = res;
		var key = params[0];
		if(!this[key]){return;}
		this[key]();
	},

	vaild:function(){
		this.res.send('HELLO WORLD !!!');
	},

	sourceData:function(){
		var sourceData = this._getData(this._getSourceFile);
		this.res.json(sourceData[1]);
	},

	setAgentData:function(){
		var DBData = this._getData(this._getDBFile);
		DBData[0] = {
			name:'agent',
			data:[
				['name','mark']
				['小宠',''],
				['维斯康',''],
				['卫仕',''],
				['维克',''],
				['爱迪森',''],
			]
		};
		this._setData(this._getDBFile,DBData);
		this.res.json(DBData);
	},

	_setData:function(fn,data){
		var file = fn();
		var obj = xlsx.build(data);
		fs.writeFileSync(file,obj,'binary');
	},

	_getData:function(fn){
		var file = fn();
		var obj = xlsx.parse(file);
		return obj;
	},

	_getDBFile:function(){
		var file = path.resolve(__dirname + "/../../data/excel/DB.xlsx");
		return file;
	},

	_getSourceFile:function(){
		var file = path.resolve(__dirname + "/../../data/excel/宠物用品价格表.xlsx");
		return file;
	},

}