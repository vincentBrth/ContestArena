/**
 * Hold the toasts data
 */
import type { Readable } from "svelte/store";
import { derived, writable } from "svelte/store";

export enum ToastType {
    DEFAULT= 'default',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    CRITICAL = 'critical'
}

export type Toast = {
    id: string;
    type: ToastType;
    message: string;
    timeout: number;
};

function toastStore () {
    const _notifications = writable<Toast[]>([])
    function send (message : string, type : ToastType, timeout : number) {
        _notifications.update(state => {
            return [...state, { id: '_' + Math.random().toString(36).substr(2, 9), type, message, timeout }]
        })
    }

    function remove(id : string) {
        _notifications.update(state => state.filter(n => n.id !== id))
    }

    const notifications : Readable<Toast[]>= derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })

    return {
        subscribe : notifications.subscribe,
        send,
        remove,
        default: (msg :string, timeout : number = 3000) => send(msg, ToastType.DEFAULT, timeout),
        info: (msg:string, timeout:number = 3000) => send(msg, ToastType.INFO, timeout),
        success: (msg:string, timeout:number = 3000) => send(msg, ToastType.SUCCESS, timeout),
        warning: (msg:string, timeout:number = 3000) => send(msg,  ToastType.WARNING, timeout),
        error: (msg:string, timeout:number = 3000) => send(msg,ToastType.ERROR, timeout),
        critical: (msg:string, timeout :number = 3000) => send(msg, ToastType.CRITICAL, timeout),
    }
}


export const toasts = toastStore()