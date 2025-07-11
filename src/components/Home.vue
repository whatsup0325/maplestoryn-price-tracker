<template>
    <div class="card">
        <div class="flex items-center gap-4 mb-4">
            <input v-model="filter" type="text" placeholder="Search Item Name..."
                class="p-2 border rounded text-base flex-1" />
            <Select v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort by"
                @change="onSortChange($event)" class="w-48" />
        </div>
        <DataView :value="sortedItems" paginator :rows="20">
            <template #list="slotProps">
                <div class="flex flex-col">
                    <div v-for="(item, index) in slotProps.items" :key="index">
                        <div class="flex flex-col sm:flex-row sm:items-center p-3 gap-4" :class="{
                            'border-t border-surface-200 dark:border-surface-700': index !== 0
                        }">
                            <div class="relative">
                                <img class="block xl:block mx-auto rounded w-[30px] h-[30px]" :src="item.imageUrl" />
                            </div>
                            <div class="flex flex-col md:flex-row justify-between  md:items-center flex-1 gap-4">
                                <div class="flex flex-row md:flex-col justify-end items-start gap-2">
                                    <div class="text-md font-bold mt-2">
                                        {{ item.name }}
                                    </div>
                                </div>
                                <div class="flex items-center justify-end gap-4">
                                    <div class="text-xs text-gray-500 mt-1">
                                        {{ formatTime(item.updateTime) }}
                                    </div>
                                    <span class="text-md font-semibold text-right flex justify-end"
                                        style="min-width: 100px;">
                                        ${{ formatPrice(item.currPriceWei) }}
                                        <div style="width: 20px; text-align: center; margin-left: 10px;">
                                            <span v-if="item.currPriceWei > item.prevPriceWei"
                                                class="text-red-500">↑</span>
                                            <span v-else-if="item.currPriceWei < item.prevPriceWei"
                                                class="text-green-500 ">↓</span>

                                            <span v-else-if="item.currPriceWei === item.prevPriceWei"
                                                class="text-gray-500">=</span>
                                        </div>
                                    </span>
                                    <div class="text-xs text-gray-500 text-right" style="width: 100px;">
                                        prev: ${{ formatPrice(item.prevPriceWei) }}
                                    </div>
                                    <Button icon="pi pi-heart" :severity="isFollowed(item.name) ? 'danger' : 'primary'"
                                        :outlined="!isFollowed(item.name)" style="width: 35px; height: 35px"
                                        @click="isFollowed(item.name) ? followedStore.unfollow(item.name) : followedStore.follow(item.name)"></Button>
                                    <Button icon="pi pi-ban" :severity="isIgnored(item.name) ? 'primary' : 'secondary'"
                                        style="width: 35px; height: 35px"
                                        @click="isIgnored(item.name) ? followedStore.unignore(item.name) : ignoreItem(item.name)"></Button>
                                    <Button icon="pi pi-link" style="width: 35px; height: 35px"
                                        @click="goToLink(item.name)"></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DataView from 'primevue/dataview';
import Button from 'primevue/button';
import Select from 'primevue/select';
import { useFollowedItemsStore } from '../stores/followedItems';

const items = ref([]);
const loading = ref(false);
const error = ref('');
const filter = ref('');
const followedStore = useFollowedItemsStore();
const sortKey = ref({ label: 'Price: Low to High', value: 'price' });
const sortOrder = ref(1);
const sortField = ref('price');
const sortOptions = ref([
    { label: 'Price: High to Low', value: '!price' },
    { label: 'Price: Low to High', value: 'price' },
    { label: 'Show Followed', value: 'followed' },
    { label: 'Show Unfollowed', value: 'unfollowed' },
    { label: 'Show Ignored', value: 'ignored' },
]);
function isFollowed(name) {
    return followedStore.followedNames.includes(name);
}

function isIgnored(name) {
    return followedStore.ignoreNames.includes(name);
}

function ignoreItem(name) {
    followedStore.ignore(name)
}

const filteredItems = computed(() => {
    let filtered = items.value;

    // 只有在非 "Show Ignored" 模式下才過濾掉被忽略的商品
    if (sortField.value !== 'ignored') {
        filtered = filtered.filter(item => !isIgnored(item.name));
    }

    if (!filter.value) return filtered;
    return filtered.filter(item =>
        item.name && item.name.toLowerCase().includes(filter.value.toLowerCase())
    );
});

const sortedItems = computed(() => {
    if (sortField.value === 'followed') {
        // 只顯示已追蹤，並依金額排序
        const followed = filteredItems.value.filter(item => isFollowed(item.name));
        return [...followed].sort((a, b) => {
            const aPrice = Number(a.currPriceWei) || 0;
            const bPrice = Number(b.currPriceWei) || 0;
            return sortOrder.value === -1 ? bPrice - aPrice : aPrice - bPrice;
        });
    }
    if (sortField.value === 'ignored') {
        // 只顯示被忽略的商品，並依金額排序
        const ignored = filteredItems.value.filter(item => isIgnored(item.name));
        return [...ignored].sort((a, b) => {
            const aPrice = Number(a.currPriceWei) || 0;
            const bPrice = Number(b.currPriceWei) || 0;
            return sortOrder.value === -1 ? bPrice - aPrice : aPrice - bPrice;
        });
    }
    if (sortField.value === 'unfollowed') {
        // 只顯示未追蹤的商品，並依金額排序
        const unfollowed = filteredItems.value.filter(item => !isFollowed(item.name));
        return [...unfollowed].sort((a, b) => {
            const aPrice = Number(a.currPriceWei) || 0;
            const bPrice = Number(b.currPriceWei) || 0;
            return sortOrder.value === -1 ? bPrice - aPrice : aPrice - bPrice;
        });
    }
    if (!sortField.value) return filteredItems.value;
    const sorted = [...filteredItems.value].sort((a, b) => {
        const aPrice = Number(a.currPriceWei) || 0;
        const bPrice = Number(b.currPriceWei) || 0;
        if (sortOrder.value === -1) {
            return bPrice - aPrice;
        } else {
            return aPrice - bPrice;
        }
    });
    return sorted;
});

function onSortChange(event) {
    const value = event.value.value;
    const sortValue = event.value;
    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1);
        sortKey.value = sortValue;
    } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
}

function formatTime(ts) {
    if (!ts) return '';
    // 處理 ISO 8601 格式或 Unix timestamp
    let timestamp;
    if (ts.includes('T')) {
        // ISO 8601 格式，直接使用
        timestamp = new Date(ts).getTime();
    } else {
        // Unix timestamp (秒)，轉換為毫秒
        timestamp = ts.length === 10 ? Number(ts) * 1000 : Number(ts);
    }
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}min ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
}

function formatPrice(val) {
    if (!val) return '';
    return Number(val).toLocaleString();
}

function goToLink(name) {
    if (!name) return;
    const keyword = encodeURIComponent(name).replace(/%20/g, '+');
    window.open(`https://msu.io/marketplace/nft?keyword=${keyword}`, '_blank');
}


async function fetchAllPrices() {
    loading.value = true;
    try {
        const isProd = import.meta.env.PROD;
        const baseUrl = isProd
            ? 'https://aioblob.blob.core.windows.net/msn'
            : '/api-prices';
        const url = `${baseUrl}/all_item_with_price.csv?_=${Date.now()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`下載失敗: ${url}`);
        const text = await res.text();
        const lines = text.trim().split('\n');
        const [header, ...rows] = lines;

        items.value = rows.map((line) => {
            const row = line.split(',');

            const name = row[0];
            const price = row[1];
            const imageUrl = row[2];
            const timestamp = row[3];
            const id = row[4];
            const currPriceWei = (BigInt(row[5]) / 10n ** 18n);
            const prevPriceWei = (BigInt(row[6]) / 10n ** 18n);
            const updateTime = row[7];
            return { name, price, imageUrl, timestamp, id, currPriceWei, prevPriceWei, updateTime };
        });
    } catch (e) {
        error.value = e.message;
    } finally {
        loading.value = false;
    }
}

onMounted(() => {
    fetchAllPrices();
    setInterval(fetchAllPrices, 60000); // 每1分鐘自動重抓
});
</script>

<style scoped>
.card {
    width: 100%;
    max-width: 1200px;
    min-width: 300px;
    margin: 2rem auto;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
    padding: 1.5rem;
}
</style>
