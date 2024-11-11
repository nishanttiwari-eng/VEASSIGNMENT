import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function navigateReset(scr, params) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name: scr, params:params}],
  });
}

export function navigateGoBack() {
  navigationRef.current?.goBack();
}
