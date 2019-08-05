import { dateTrans } from "infrastructure/regular-expression";

//兼容性转化
export function convertToArray(src): any {
    if (src instanceof Array) {
        return src;
    }

    var arr = [];
    arr.push(src);
    return arr;

}


/**
 * 根据文件名检索
 */
export function indexOfFileByName(arr: any, fileName): any {
    if (arr instanceof Array) {
        for (var i = arr.length - 1; i >= 0; --i) {
            var item = arr[i];
            if (item.name && item.name == fileName) {
                return item;
            }
        }
    }

    return null;
}

export function formatOldJson(json): any {

    if (json.acceptanceOpinions) {
        json.acceptanceOpinions.contractingUnit = convertToArray(json.acceptanceOpinions.contractingUnit);

        json.acceptanceOpinions.designUnit = convertToArray(json.acceptanceOpinions.designUnit);

        if (json.acceptanceOpinions.filingTime && json.acceptanceOpinions.filingTime != "") {
            json.acceptanceOpinions.filingTime = dateTrans(json.acceptanceOpinions.filingTime);
        }
    }

    if (json.constructionUnit instanceof Array && json.constructionUnit.length == 0) {
        json.constructionUnit = [
            {
                designUnit: '',
                qualificationLevel: '',
                legalRepresentative: '',
                contacts: '',
                contactsNumber: ''
            }];

    }
    
    json.constructionUnit = convertToArray(json.constructionUnit);



    if (json.implementation == null || json.implementation.length == 0) {
        json.implementation = [{
            designUnit: '',
            personInChargeName: '',
            opinion: ''
        }];
    }


    if (json.constructionSituation == null || json.constructionSituation.length == 0) {
        json.constructionSituation = [{
            contractingUnit: '',
            projectManagerName: '',
            subcontractors: '',
            personInChargeName: '',
            opinion: ''
        }];
    }



    json.constructionSituation = convertToArray(json.constructionSituation);
    json.implementation = convertToArray(json.implementation);

    if (json.dateOfReview && json.dateOfReview != '') {
        json.dateOfReview = dateTrans(json.dateOfReview);

    }


    if (json.planStartTime && json.planStartTime != "") {
        json.planStartTime = dateTrans(json.planStartTime);
    }
    if (json.planEndTime && json.planEndTime != "") {
        json.planEndTime = dateTrans(json.planEndTime);
    }


    if (json.mappingUnit) {
        if (json.mappingUnit.no instanceof String) {
            json.mappingUnit.no = [{ noValue: json.mappingUnit.no }];
        }
        if (json.mappingUnit.no instanceof Array) {
            if (json.mappingUnit.no[0] instanceof String) {
                var list = [];
                for (var i = 0; i < json.mappingUnit.no.length; ++i) {
                    var item = { noValue: json.mappingUnit.no[i] };
                    list.push(item);
                }
                json.mappingUnit.no = list;
            }
        }
        json.mappingUnit.no = convertToArray(json.mappingUnit.no);


    }


    return json;
}


