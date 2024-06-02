import { combineLatest, concat, Observable, of } from "rxjs";
// import { CommonAppConstants } from "../constants/app.constant";

// export function combineServiceCalls(sources: Observable<any>[]) {
//   const concatRequests: Observable<any>[] = [];

//   sources.forEach(src => {
//     concatRequests.push(concat(of(null), src));
//   });

//   return combineLatest(concatRequests).pipe(filter(val => val.some(v => v != null)));
// }

export function isValidObject(obj: any) {
  return obj != null && obj != undefined;
}

export function isValidObjectWithBlank(obj: any) {
  return obj != null && obj != undefined && obj != '';
}

export function isValidList(list: any[]) {
  return list != null && list.length > 0
}

export function isIdenticalObject(x, y) {
  if (!x || !y)
    return false;
  if (x === y)
    return true;
  // if both x and y are null or undefined and exactly the same
  if (!(x instanceof Object) || !(y instanceof Object))
    return false;

  let p;
  for (p in x) {
    if (!x.hasOwnProperty(p))
      continue;
    // Matches all the property of x available for y
    if (!y.hasOwnProperty(p))
      return false;
    // compare x[p] and y[p] values are strictly matching
    // allows to compare x[ p ] and y[ p ] when set to undefined
    if (x[p] === y[p])
      continue;
    // if they have the same strict value or identity then they are equal
    if (typeof (x[p]) !== "object") {
      return false;
    }
    else {
      //compares the inner object
      if (isIdenticalObject(x[p], y[p])) {
        continue;
      }
      else {
        return false;
      }
    }
  }
  for (p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p))
      return false;
  }
  return true;
}

// export function cloneDeep<T extends object>(obj: T): T {
//   if (!!obj) {
//     let clonedObj: T = <T>{};
//     Object.keys(obj).forEach(key => {
//       let val = obj[key];
//       if (Array.isArray(val)) {
//         clonedObj[key] = cloneDeepArray(val);
//       } else if (typeof val === CommonAppConstants.objectstr) {
//         clonedObj[key] = cloneDeep(val);
//       } else {
//         clonedObj[key] = val;
//       }
//     });
//     return clonedObj;
//   }
//   return undefined!;
// }

// export function cloneDeepArray(array: Array<unknown>): Array<unknown> {
//   if (!!array) {
//     let clonedArray: Array<unknown> =
//       array.map(x => {
//         if (Array.isArray(x)) {
//           return cloneDeepArray(x);
//         } else if (typeof x === CommonAppConstants.objectstr) {
//           return cloneDeep(<object>x);
//         }
//         return x;
//       });
//     return clonedArray;
//   }
//   return undefined!;
// }
