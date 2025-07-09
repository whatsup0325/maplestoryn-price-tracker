import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFollowedItemsStore = defineStore('followedItems', () => {
    const followedNames = ref([]);

    function follow(name) {
        if (!followedNames.value.includes(name)) {
            followedNames.value.push(name);
        }
    }

    function unfollow(name) {
        followedNames.value = followedNames.value.filter(n => n !== name);
    }

    return { followedNames, follow, unfollow };
}, {
    persist: true
});