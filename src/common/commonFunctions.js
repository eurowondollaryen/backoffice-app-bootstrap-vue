import axios from 'axios';
import config from '../config.js';

const commonFunctions = {
    /*
     * isNull
     * Null check용 공통함수
     * 
     */
    isNull: function(v) {
        return (v === undefined || v === null || v === "") ? true : false;
    },
    /*
     * getCommonCode
     * Null check용 공통함수
     */
    getCommonCode: function(strCommCode) {
        return axios.get(config.serverUrl + "/common-detail-code/search", {
            params: {
                COMM_CODE: strCommCode
            }
        });
    },
    /*
     * getCommonCode
     * Null check용 공통함수
     */
    getClientDate: function() {
        let date = new Date();
        let mm = date.getMonth() + 1; // getMonth() is zero-based
        let dd = date.getDate();

        return [date.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
                ].join('');
    },
    /*
     * extractValues
     * mapping object의 key값을 배열을 return한다.
     * reference: https://www.ag-grid.com/vue-data-grid/reference-data/
     */
    extractValues: function(mappings) {
        return Object.keys(mappings);
    },
    /*
     * lookupValue
     * get value with key (code) ex) 0001: "부서" => return "부서"
     */
    lookupValue: function(mappings, key) {
        return mappings[key];
    },
    /*
     * lookupKey
     * get key with value (name) ex) 0001: "부서" => return "0001"
     */
    lookupKey: function(mappings, name) {
        const keys = Object.keys(mappings);
        for(let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            if(mappings[key] === name) {
                return key;
            }
        }
        return "";
    },
    /*
     * copyObject
     * Object의 값을 copy하는 공통함수
     */
    copyObject: function(sourceObject, targetObject) {
        if(!sourceObject) return null;
        const keys = Object.keys(sourceObject);
        keys.map((key) => {
            targetObject[key] = sourceObject[key];
        });
        return targetObject;
    },
    /*
     * numberWithCommas
     * 숫자에 3자리마다 comma 붙이기
     */
    numberWithCommas: function(target) {
        return target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    /**
     * 숫자에 콤마 제거 
     */
    numberWithoutCommas: function(target) {
        return target.toString().replace(/(,)/g, "");
    }
};

export default commonFunctions;