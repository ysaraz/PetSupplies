var xlsx = require('node-xlsx');
var path = require('path');
var _ = require('lodash');
var fs = require('fs');

var DB = require('./db');

module.exports = {
	run:function(res , params){
		this.res = res;
		var key = params[0];
		if(!this[key]){return;}
		this[key]();
	},

	xiaoChong:function(){
		var sourceData = this._getData(this._getFile);
		var data = sourceData[0];
		var list = [];
		var typeName = '';
		var info = [];
		_(data.data).forEach((record,key)=>{
			if(key > 1 && record.length > 0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['小宠','',record[0],record[1],record[2],record[4],record[5],record[7],record[8],record[9],'',''];
				list.push(info);
			}
		});
		DB.setWares(list);
		this.res.json(list);
	},

	Vitscan:function(){
		var sourceData = this._getData(this._getFile);
		var data = sourceData[1];
		var list = [];
		var typeName = '';
		var info = [];
		_(data.data).forEach((record,key)=>{
			if(key>3 && key<32 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','伯纳天纯',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>34 && key<45 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','味纯',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>47 && key<57 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','味臻纯',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>61 && key<90 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','维斯康',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>91 && key<104 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','维斯康·金装',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>105 && key<112 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','维斯康·膏体',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>113 && key<127 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','维斯康·其他',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>131 && key<143 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','维＋',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>145 && key<151 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','罗斯蔓草本',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>152 && key<163 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','罗斯蔓焕活',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
			if(key>167 && key<181 && record.length>0){
				typeName = record[0] ? record[0] : typeName ;
				record[0] = typeName;
				info=['维斯康','优维坊',record[0],record[2],record[3],record[4],null,record[6],record[6],record[6],record[7],''];
				list.push(info);
			}
		});
		DB.setWares(list);
		this.res.json(list);
	},

	Nourse:function(){
		var sourceData = this._getData(this._getFile);
		var data = sourceData[2];
		var list = [];
		var typeName = '',
			name = '';
		var info = [];
		_(data.data).forEach((record,key)=>{
			if(key > 1 && record.length > 0){
				typeName = record[0] ? record[0] : typeName ;
				name = record[1] ? record[1] : name;
				//品牌	子品牌	分类	产品名称	规格	批发价格	批发数量	PC控价	手机控价	节日控价	活动	备注
				info=['卫仕','',typeName,name,record[2],record[4],record[5],record[6],record[7],record[7],'满100减10',''];
				list.push(info);
			}
		});
		DB.setWares(list);
		this.res.json(list);
	},

	_getData:function(fn){
		var file = fn();
		var obj = xlsx.parse(file);
		return obj;
	},

	_getFile:function(){
		var file = path.resolve(__dirname + "/../../data/excel/宠物用品价格表.xlsx");
		return file;
	},

	_getDBFile:function(){
		var file = path.resolve(__dirname + "/../../data/excel/DB.xlsx");
		return file;
	},
}