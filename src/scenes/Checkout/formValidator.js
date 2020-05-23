const validate = function(path, form){
    // get rule
    const rule = findRuleByPath(path);
    // get value from form obj
    const value = getValueAtObjectByPath(path, form);
    // return error msg if rule and error exists
    return rule ? getFieldError(rule, value) : null;
};


// setup validation rules
const rules = {
    contact : {
        first_name : {
            field_name : "First Name",
            regex : /^.*$/,
            required : true
        },
        last_name : {
            field_name : "Last Name",
            regex : /^.*$/,
            required : true
        },
        email : {
            field_name : "Email",
            regex : /^[a-zA-Z0-9\-\_]+\@([0-9a-zA-Z\-\_]+\.)+[a-zA-Z0-9\-\_]+$/,
            required : true
        },
        phone : {
            field_name : "Phone",
            regex : /^\+?[0-9]+$/,
            required : true
        }
    },
    payment : {
        card : {
            field_name : "Card Number",
            regex : /^([0-9]{4}\-?){4}$/,
            required : true
        },
        csc : {
            field_name : "CVC",
            regex : /^[0-9]{3,4}$/,
            required : true
        },
        exp_date : {
            field_name : "Expiry",
            regex : /^[0-9]{2}\/?[0-9]{2}$/,
            required : true
        }
    },
    coupons :  {
        field_name : "Coupon",
        regex : /^[a-zA-Z0-9]+$/,
        required : false
    },
    shipping : {
        address : {
            field_name : "Address",
            regex : /^.*$/,
            required : true
        },
        country : {
            field_name : "Country",
            regex : /^[A-Z]{2}$/,
            required : true
        }
    }
};



// ----- helpers ------
const findRuleByPath = (path) => getValueAtObjectByPath(path, rules);


const getValueAtObjectByPath = function(path, form){
    const drill = (paths, obj) => {
        // get path
        let path = paths.shift();
        // still need to get sub path?
        if(paths.length > 0){
            // ensure its a object
            if(obj[path] && Object.prototype.toString.call(obj[path]) === "[object Object]"){
                return drill(paths, obj[path]);
            } else {
                return obj[path] || null;
            }
        } else {
            return obj[path] || null;
        }
    };
    return drill(path.split("."), form);
}


const deleteValueAtObjectByPath = function (obj, path) {
    if (!obj || !path) {
      return;
    }
    if (typeof path === 'string') {
      path = path.split('.');
    }
    for (var i = 0; i < path.length - 1; i++) {  
      obj = obj[path[i]];
      if (typeof obj === 'undefined') {
        return;
      }
    }
    delete obj[path.pop()];
}

const setValueAtObjectByPath = function(_obj, field, value){
    const assignHandler = (obj, prop, value) => {
        if (typeof prop === "string")
            prop = prop.split(".");
        if (prop.length > 1) {
            var e = prop.shift();
            assignHandler(obj[e] =
                    Object.prototype.toString.call(obj[e]) === "[object Object]"
                    ? obj[e]
                    : {},
                prop,
                value);
        } else
            obj[prop[0]] = value;
    }
    return assignHandler(_obj, field, value);
}


const getFieldError = function(rule, value){
    // has input
    if((value || "").length){
        return (new RegExp(rule.regex, "ig")).test(value) ? null : `${rule.field_name} is invalid`;
    } else
    // not empty
    if(rule.required === true && !(value || "").length){
        return `${rule.field_name} is required`
    }
}



export { 
    validate, 
    getValueAtObjectByPath, 
    deleteValueAtObjectByPath, 
    setValueAtObjectByPath 
};