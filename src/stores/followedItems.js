import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFollowedItemsStore = defineStore('followedItems', () => {
    const followedNames = ref([]);
    const ignoreNames = ref([]);
    function follow(name) {
        if (!followedNames.value.includes(name)) {
            followedNames.value.push(name);
        }
    }

    function unfollow(name) {
        followedNames.value = followedNames.value.filter(n => n !== name);
    }

    function ignore(name) {
        if (!ignoreNames.value.includes(name)) {
            ignoreNames.value.push(name);
        }
    }

    function unignore(name) {
        ignoreNames.value = ignoreNames.value.filter(n => n !== name);
    }

    return { followedNames, follow, unfollow, ignoreNames, ignore, unignore };
}, {
    persist: true
});