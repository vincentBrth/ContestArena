/**
 * Page store
 */
import { writable, type Writable } from 'svelte/store';
export type PageInfo = {
    title: string;
};

const pageStore = <Writable<PageInfo>>writable({ title: '' });

export default {
    subscribe: pageStore.subscribe,
    set: pageStore.set,
    update: pageStore.update,
    getFormattedTitle: () => {
        let title: string = '';
        pageStore.subscribe(value => title = value.title)();
        return title ? `${title} | My App` : 'My Appna';
    }
}
