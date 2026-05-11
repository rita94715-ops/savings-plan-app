<template>
  <div class="plan-card" :style="{ backgroundColor: plan.color }">
    <div class="card-header">
      <div class="plan-info">
        <h3 class="plan-name">{{ plan.name }}</h3>
        <p class="plan-goal">目標: {{ formatCurrency(plan.target) }}</p>
      </div>
      <div class="card-actions">
        <button class="btn-icon" @click="$emit('edit', plan)" title="編輯">✏️</button>
        <button class="btn-icon" @click="$emit('delete', plan.id)" title="刪除">🗑️</button>
      </div>
    </div>

    <div class="progress-section">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <div class="progress-text">
        <span class="amount">{{ formatCurrency(plan.amount) }}</span>
        <span class="percent">{{ progressPercent }}%</span>
      </div>
    </div>

    <div class="controls">
      <button class="btn-control" @click="decreaseAmount">➖</button>
      <input
        v-model.number="inputAmount"
        type="number"
        class="input-amount"
        placeholder="輸入金額"
      />
      <button class="btn-control" @click="increaseAmount">➕</button>
    </div>

    <div class="quick-buttons">
      <button
        v-for="amount in quickAmounts"
        :key="amount"
        class="btn-quick"
        @click="addQuickAmount(amount)"
      >
        +{{ formatCurrency(amount) }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  emits: ['edit', 'delete', 'update'],
  setup(props, { emit }) {
    const inputAmount = ref(0)
    const quickAmounts = [100, 500, 1000]

    const progressPercent = computed(() => {
      if (props.plan.target === 0) return 0
      return Math.min(Math.round((props.plan.amount / props.plan.target) * 100), 100)
    })

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('zh-TW', {
        style: 'currency',
        currency: 'TWD',
        minimumFractionDigits: 0
      }).format(value)
    }

    const increaseAmount = () => {
      if (inputAmount.value > 0) {
        const newAmount = props.plan.amount + inputAmount.value
        emit('update', { ...props.plan, amount: newAmount })
        inputAmount.value = 0
      }
    }

    const decreaseAmount = () => {
      const newAmount = Math.max(0, props.plan.amount - 100)
      emit('update', { ...props.plan, amount: newAmount })
    }

    const addQuickAmount = (amount) => {
      const newAmount = props.plan.amount + amount
      emit('update', { ...props.plan, amount: newAmount })
    }

    return {
      inputAmount,
      quickAmounts,
      progressPercent,
      formatCurrency,
      increaseAmount,
      decreaseAmount,
      addQuickAmount
    }
  }
}
</script>

<style scoped>
.plan-card {
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.plan-card:active {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
}

.plan-info {
  flex: 1;
}

.plan-name {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.plan-goal {
  margin: 5px 0 0 0;
  font-size: 13px;
  color: #666;
}

.card-actions {
  display: flex;
  gap: 8px;
}

.btn-icon {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s;
}

.btn-icon:active {
  transform: scale(1.2);
}

.progress-section {
  margin-bottom: 15px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%);
  transition: width 0.3s ease;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #666;
}

.amount {
  font-weight: 600;
  color: #333;
}

.percent {
  color: #4CAF50;
  font-weight: 600;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 12px;
}

.btn-control {
  width: 40px;
  height: 40px;
  border: none;
  background: #f0f0f0;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-control:active {
  background: #e0e0e0;
}

.input-amount {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.input-amount:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.quick-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.btn-quick {
  padding: 10px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-quick:active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}
</style>
