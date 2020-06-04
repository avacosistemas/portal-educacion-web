import { Injectable } from '@angular/core';
import { CONTROL_TYPE, NUMBER } from '../../model/dynamic-form/dynamic-field';
import * as _moment from 'moment';

const BOOLEAN = 'boolean';
const STRING = 'string';
@Injectable({
    providedIn: 'root'
})
export class FilterService{

    private filterEquals(valueA: any, valueB: any){
        if (typeof valueA === BOOLEAN || typeof valueB === BOOLEAN){
        return Boolean(valueA) === Boolean(valueB);
        }else if (typeof valueA === NUMBER || typeof valueB === NUMBER){
        return Number(valueA) === Number(valueB);
        }
        return valueA === valueB;
    }

    private filterGreaterEquals(valueA: any, valueB: any){
        if (valueA._f || valueA._isAMomentObject){
            return valueA.isSameOrAfter(valueB);
        }

        return valueA >= valueB;
    }

    private filterLessEquals(valueA: any, valueB: any){
        if (valueA._f || valueA._isAMomentObject){
            return valueA.isSameOrBefore(valueB);
        }
        return valueA <= valueB;
    }

    private filterIncludes(valueA: any, valueB: any){
        if (typeof valueA === BOOLEAN || typeof valueB === BOOLEAN ||
            typeof valueA === NUMBER || typeof valueB === NUMBER ||
            typeof valueA === STRING || typeof valueB === STRING){
        return String(valueA).toLowerCase().includes(String(valueB).toLowerCase());
        }
        console.warn('this type is not posible to filtre ' + valueA);
        console.warn('this type is not posible to filtre ' + valueB);
        return false;
    }
}

export const enum FILTER_TYPE {
    LIKE = 'LIKE',
    EQUALS = 'EQUALS',
    LESS_EQUALS = 'LESS-EQUALS',
    LESS = 'LESS',
    GREATER_EQUALS = 'GREATER-EQUALS',
    GREATER = 'GREATER'
}
