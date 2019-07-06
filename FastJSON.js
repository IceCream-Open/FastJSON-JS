const FastJSON = (function () {
    let at;

    this.format = function (str) {
        let obj = JSON.parse(str);
        at = obj;
        obj = checkArgs(obj);
        return obj;
    };

    let isObject = function (obj) {
        return "object" == typeof obj
            && "[object object]" == Object.prototype.toString.call(obj)
                .toLowerCase();
    };

    let checkArgs = function (obj) {
        for (let para in obj) {
            if (para == "_super_GXFastJSON") continue;
            let pobj = obj[para];
            pobj._super_GXFastJSON = obj;
            if (isObject(pobj)) {
                if (pobj.$ref) {
                    let g = pobj.$ref;
                    let p;
                    let b = false;

                    let first = g.substring(0, 1);
                    switch (first) {
                        case '@':
                            p = at;
                            break;
                        case '$':
                            let ss = g.split(".");
                            p = at;
                            for (let i = 1; i < ss.length; i++) {
                                p = p[ss[i]];
                            }
                            break;
                        case '.':
                            p = pobj;
                            for (let i = 0; i < g.length; i++) {
                                p = p._super_GXFastJSON;
                            }
                            break;
                    }
                    obj[para] = p;
                } else {
                    let r = checkArgs(pobj);
                }
            }
            delete pobj._super_GXFastJSON;
        }
        return obj;
    }

});
