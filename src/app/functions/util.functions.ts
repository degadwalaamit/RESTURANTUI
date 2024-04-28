import { ActivatedRouteSnapshot } from '@angular/router';

export function getUrlSegmentPath(routeSnapshot: ActivatedRouteSnapshot) {
    let segmentPath;
    if (routeSnapshot && routeSnapshot.url) {
        routeSnapshot.url.forEach(segment => {
            if (!segmentPath) {
                segmentPath = segment.path;
            } else {
                segmentPath = segmentPath + '.' + segment.path;
            }
        });
        return segmentPath;
    }
}

export function checkValidObject(obj: any) {
    return (obj != null && obj !== undefined);
}

export function checkValidList(listObj: any) {
    if (checkValidObject(listObj)) {
        return (listObj.length > 0);
    }
    return false;
}
