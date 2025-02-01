/**
 * Notification store
 */
import type { Readable } from "svelte/store";
import { derived, writable } from "svelte/store";

export enum NotificationType {
    DEFAULT = 'default',
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
    CRITICAL = 'critical'
}

export type Notification = {
    id: string;
    type: NotificationType;
    message: string;
    timeout: number;
};

function _notifications() {
    const _notifications = writable<Notification[]>([])
    function send(message: string, type: NotificationType, timeout: number) {
        _notifications.update(state => {
            return [...state, { id: '_' + Math.random().toString(36).substr(2, 9), type, message, timeout }]
        })
    }

    function remove(id: string) {
        _notifications.update(state => state.filter(n => n.id !== id))
    }

    const notifications: Readable<Notification[]> = derived(_notifications, ($_notifications, set) => {
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
        subscribe: notifications.subscribe,
        send,
        remove,
        default: (msg: string, timeout: number = 2000) => send(msg, NotificationType.DEFAULT, timeout),
        info: (msg: string, timeout: number = 2000) => send(msg, NotificationType.INFO, timeout),
        success: (msg: string, timeout: number = 2000) => send(msg, NotificationType.SUCCESS, timeout),
        warning: (msg: string, timeout: number = 3000) => send(msg, NotificationType.WARNING, timeout),
        error: (msg: string, timeout: number = 3000) => send(msg, NotificationType.ERROR, timeout),
        critical: (msg: string, timeout: number = 5000) => send(msg, NotificationType.CRITICAL, timeout),
    }
}


export const notifications = _notifications()