/**
 * Represents a tab.
 */

export type Tab = {
    label: string;
    value: string;
    disabled: boolean;
    hidden: boolean;
};

/**
 * Represents a set of tabs.
 */
export class Tabs {
    constructor(
        public tabs: Tab[],
        public tabGroup: string,
        public selectedTab: Tab = tabs.find(tab => !tab.disabled && !tab.hidden) || tabs[0]
    ) { }
}
