import cloneDeep from 'lodash/cloneDeep';

export default function FixedQueue(len) {
    var ret = [];

    ret.push = function() {
        if(ret.length === len) {
            ret.shift(); //drop off first element
        }
        return Array.prototype.push.apply(this, arguments);
    };

    ret.get = function(index) {
        return cloneDeep(ret[index]);
    };

    ret.secondToLast = function() {
        return ret.get(ret.length - 2);
    };

    ret.clear = function() {
        while(ret.length) {
            ret.pop();
        }
    };

    return ret;
}
