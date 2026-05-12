<template>
  <div class="bg-settings">
  <input v-model="userBgUrl" placeholder="請輸入背景圖片網址">
  <button @click="saveBg">更換背景</button>
</div>
  <div class="app-container">
    <header class="app-header">
      <h1>💰 存錢計畫</h1>
      <p class="subtitle">堅持儲蓄，實現夢想</p>
    </header>

    <main class="app-main">
      <button class="btn-add" @click="openModal">+ 新增計畫</button>

      <div class="plans-container">
        <PlanCard
          v-for="plan in plans"
          :key="plan.id"
          :plan="plan"
          @edit="editPlan"
          @delete="deletePlan"
          @update="updatePlan"
        />
      </div>

      <div v-if="plans.length === 0" class="empty-state">
        <p>還沒有任何計畫</p>
        <p class="empty-hint">點擊「+ 新增計畫」開始存錢吧！</p>
      </div>
    </main>

    <PlanModal
      v-if="showModal"
      :plan="currentPlan"
      :is-editing="isEditing"
      @save="savePlan"
      @close="closeModal"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import PlanCard from './components/PlanCard.vue'
import PlanModal from './components/PlanModal.vue'
import { loadPlans, savePlans } from './utils/storage.js'

export default {
  components: {
    PlanCard,
    PlanModal
  },
  setup() {// 在 setup() 內部加入這段
const userBgUrl = ref(localStorage.getItem('user-bg') || '');

const saveBg = () => {
  localStorage.setItem('user-bg', userBgUrl.value);
  // 立即套用到背景
  document.body.style.backgroundImage = `url(${userBgUrl.value})`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundAttachment = 'fixed';
};

// 修改你原本的 onMounted (第 55-57 行)
onMounted(() => {
  plans.value = loadPlans();
  // 加上這一行來載入背景
  if (userBgUrl.value) {
    document.body.style.backgroundImage = `url(${userBgUrl.value})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
  }
});

// 記得要把變數 return 出去給畫面使用 (在 setup 最後的 return 裡面加上)
return {
  plans,
  showModal,
  // ... 其他原本有的 ...
  userBgUrl, // 新加的
  saveBg      // 新加的
}
    const plans = ref([])
    const showModal = ref(false)
    const isEditing = ref(false)
    const currentPlan = ref(null)

    onMounted(() => {
      plans.value = loadPlans()
    })

    const openModal = () => {
      currentPlan.value = null
      isEditing.value = false
      showModal.value = true
    }

    const closeModal = () => {
      showModal.value = false
    }

    const editPlan = (plan) => {
      currentPlan.value = { ...plan }
      isEditing.value = true
      showModal.value = true
    }

    const savePlan = (planData) => {
      if (isEditing.value && currentPlan.value) {
        const index = plans.value.findIndex(p => p.id === currentPlan.value.id)
        if (index > -1) {
          plans.value[index] = { ...plans.value[index], ...planData }
        }
      } else {
        const newPlan = {
          id: Date.now(),
          createdAt: new Date().toISOString(),
          ...planData
        }
        plans.value.push(newPlan)
      }
      savePlans(plans.value)
      closeModal()
    }

    const deletePlan = (id) => {
      if (confirm('確定要刪除這個計畫嗎？')) {
        plans.value = plans.value.filter(p => p.id !== id)
        savePlans(plans.value)
      }
    }

    const updatePlan = (updatedPlan) => {
      const index = plans.value.findIndex(p => p.id === updatedPlan.id)
      if (index > -1) {
        plans.value[index] = updatedPlan
        savePlans(plans.value)
      }
    }

    return {
      plans,
      showModal,
      isEditing,
      currentPlan,
      openModal,
      closeModal,
      editPlan,
      savePlan,
      deletePlan,
      updatePlan
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-bottom: 20px;
}

.app-header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px 20px 20px;
  text-align: center;
  color: white;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.app-header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
}

.subtitle {
  margin: 8px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.app-main {
  padding: 20px;
}

.btn-add {
  width: 100%;
  padding: 14px;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-add:active {
  transform: scale(0.98);
  box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.plans-container {
  display: grid;
  gap: 15px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.7);
}

.empty-state p {
  margin: 0;
  font-size: 16px;
}

.empty-hint {
  font-size: 14px;
  margin-top: 10px;
  opacity: 0.8;
}

/* 毛玻璃按鈕樣式 */
.btn-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* 針對蘋果手機 */
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s;
}

.btn-glass:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* 確保背景能蓋滿全螢幕 */
body {
  margin: 0;
  min-height: 100vh;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
