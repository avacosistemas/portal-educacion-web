import { FormDef } from './form-def';
import { DynamicField } from './dynamic-form/dynamic-field';
import { Params } from '@angular/router';

export const HTTP_METHODS = {
    post: 'POST',
    put: 'PUT',
    delete: 'DELETE',
    get: 'GET'
};

export class WsDef{         
    key: string;
    url: string;
    method?: string;
    filter?: DynamicField<any>;
    querystring?: Params;
}
