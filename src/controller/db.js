var xlsx = require('node-xlsx');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');

module.exports = {
	run:function(res , params){
		this.res = res;
		var key = params[0];
		if(!this[key]){return;}
		this[key]();
	},

	createWares:function(){
		var DBData = this._getData();
		var key = _.findIndex(DBData,(record)=>{
						return record.name == 'wares';
					});
		if(key!= -1){return;}
		var table = {
			name:'wares',
			data:[
				['品牌','子品牌','分类','产品名称','规格','批发价格','批发数量','PC控价','手机控价','节日控价','活动','备注']
			]
		};
		DBData.push(table);
		this._setData(DBData);
	},

	setWares:function(list){
		var DBData = this._getData();
		var key = _.findIndex(DBData,(record)=>{
						return record.name == 'wares';
					});
		var table = DBData[key];
		if(!table){return;}
		_(list).forEach((record)=>{
			var key = _.findIndex(table.data,(_record)=>{
				return _record == record;
			})
			if(key == -1){
				table.data.push(record);
			}
		});
		this._setData(DBData);
	},

	_setData:function(data,fn){
		var file = fn ? fn() : this._getDBFile();
		var obj = xlsx.build(data);
		fs.writeFileSync(file,obj,'binary');
	},

	_getData:function(fn){
		var file = fn ? fn() : this._getDBFile();
		var obj = xlsx.parse(file);
		return obj;
	},

	_getDBFile:function(){
		var file = path.resolve(__dirname + "/../../data/excel/DB.xlsx");
		return file;
	},

	createTable:function(){

	},
}