import { useCallback } from 'react';

export const useMessage = () => {
    return useCallback(text => {
        if(text) {
            console.log('Message', text)
        }
        // if(window.M && text) {
            // window.M.toast({ html: text });
        // }
    }, [])
}