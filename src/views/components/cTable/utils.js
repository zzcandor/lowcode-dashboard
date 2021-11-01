export function randomExtend(minNum, maxNum) {
    if (arguments.length === 1) {
        return parseInt(Math.random() * minNum + 1, 10)
    } else {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    }
}

export function debounce(delay, callback) {
    let lastTime

    return function() {
        clearTimeout(lastTime)

        const [that, args] = [this, arguments]

        lastTime = setTimeout(() => {
            callback.apply(that, args)
        }, delay)
    }
}

export function observerDomResize(dom, callback) {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

    const observer = new MutationObserver(callback)

    observer.observe(dom, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

    return observer
}

export function getPointDistance(pointOne, pointTwo) {
    const minusX = Math.abs(pointOne[0] - pointTwo[0])

    const minusY = Math.abs(pointOne[1] - pointTwo[1])

    return Math.sqrt(minusX * minusX + minusY * minusY)
}

export function uuid(hasHyphen) {
    return (hasHyphen ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx' : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx').replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })
}
/**
 * 如果target(也就是FirstOBJ[key])存在，
 * 且是对象的话再去调用deepObjectMerge，
 * 否则就是FirstOBJ[key]里面没这个对象，需要与SecondOBJ[key]合并
 */
export function deepMerge(FirstOBJ, SecondOBJ) { // 深度合并对象
    for (var key in SecondOBJ) {
        FirstOBJ[key] = FirstOBJ[key] && FirstOBJ[key].toString() === '[object Object]'
            ? deepObjectMerge(FirstOBJ[key], SecondOBJ[key]) : FirstOBJ[key] = SecondOBJ[key]
    }
    return FirstOBJ
}
export function deepClone(object) {
    var recursion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false
    if (!object) return object
    var parse = JSON.parse
    var stringify = JSON.stringify
    if (!recursion) return parse(stringify(object))
    var clonedObj = object instanceof Array ? [] : {}

    if (object && (typeof object === 'object')) {
        for (var key in object) {
            if (Object.prototype.hasOwnProperty.call(object, key)) {
                if (object[key] && typeof object[key] === 'object') {
                    clonedObj[key] = deepClone(object[key], true)
                } else {
                    clonedObj[key] = object[key]
                }
            }
        }
    }

    return clonedObj
}
