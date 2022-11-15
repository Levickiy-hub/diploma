import {useCallback} from "react";
import { useToasts } from 'react-toast-notifications'

export const useMessage=()=>{
    const { addToast } = useToasts();
    return useCallback((text,appearance='info')=>{
        if(text){
           addToast(text,{
               appearance:appearance, //success, info,error,warning
               autoDismiss: true
           })
        }
    },[addToast])
}