<template>
    <div class="card">
        <div class="flex items-center gap-4 mb-4">
            <input v-model="filter" type="text" placeholder="搜尋道具名稱..." class="p-2 border rounded text-base flex-1" />
            <Select v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="排序方式"
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
                            <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4">
                                <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                    <div class="text-md font-bold mt-2" style="width: 300px">
                                        {{ item.name }}
                                    </div>
                                </div>
                                <div class="flex items-center gap-4">
                                    <div class="text-xs text-gray-500 mt-1">
                                        上次更新：{{ formatTime(item.timestamp) }}
                                    </div>
                                    <span class="text-md font-semibold">
                                        ${{ formatPrice(item.price) }}
                                    </span>
                                    <Button icon="pi pi-heart" :severity="isFollowed(item.name) ? 'danger' : 'primary'"
                                        :outlined="!isFollowed(item.name)" style="width: 35px; height: 35px"
                                        @click="isFollowed(item.name) ? followedStore.unfollow(item.name) : followedStore.follow(item.name)"></Button>
                                    <Button icon="pi pi-link" style="width: 35px; height: 35px"
                                        @click="goToLink(item.id)"></Button>
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
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    { label: '價格高到低', value: '!price' },
    { label: '價格低到高', value: 'price' },
    { label: '只顯示已追蹤', value: 'followed' }, // 新增
]);
function isFollowed(name) {
    return followedStore.followedNames.includes(name);
}


const filteredItems = computed(() => {
    if (!filter.value) return items.value;
    return items.value.filter(item =>
        item.name && item.name.toLowerCase().includes(filter.value.toLowerCase())
    );
});

const sortedItems = computed(() => {
    if (sortField.value === 'followed') {
        // 只顯示已追蹤
        return filteredItems.value.filter(item => isFollowed(item.name));
    }
    if (!sortField.value) return filteredItems.value;
    const sorted = [...filteredItems.value].sort((a, b) => {
        const aPrice = Number(a.price) || 0;
        const bPrice = Number(b.price) || 0;
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
    return new Date(ts).toLocaleString();
}

function formatPrice(val) {
    if (!val) return '';
    return Number(val).toLocaleString();
}

function goToLink(id) {
    if (!id) return;
    window.open(`https://msu.io/marketplace/nft/${id}`, '_blank');
}

onMounted(async () => {
    loading.value = true;
    try {
        const url = '/api-prices/prices.csv?_=' + Date.now();
        const res = await fetch(url);
        if (!res.ok) throw new Error('下載失敗');
        const text = await res.text();
        const lines = text.trim().split('\n');
        // 取得標題
        const [header, ...rows] = lines;
        // 解析每一行為物件
        items.value = rows.map((line) => {
            const [name, price, imageUrl, timestamp, id] = line.split(',');
            return { name, price, imageUrl, timestamp, id };
        });
    } catch (e) {
        error.value = e.message;
    } finally {
        loading.value = false;
    }
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
