<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <div class="modal-header">
        <h2>{{ isEditing ? '編輯計畫' : '新增計畫' }}</h2>
        <button class="btn-close" @click="$emit('close')">✕</button>
      </div>

      <div class="modal-body">
        <div class="form-group">
          <label>計畫名稱 *</label>
          <input
            v-model="form.name"
            type="text"
            class="input-field"
            placeholder="例：iPhone 15"
            maxlength="20"
          />
          <span class="char-count">{{ form.name.length }}/20</span>
        </div>

        <div class="form-group">
          <label>目標金額 *</label>
          <input
            v-model.number="form.target"
            type="number"
            class="input-field"
            placeholder="例：10000"
            min="0"
          />
        </div>

        <div class="form-group">
          <label>背景顏色</label>
          <div class="color-picker">
            <button
              v-for="color in colors"
              :key="color"
              class="color-option"
              :style="{ backgroundColor: color }"
              :class="{ selected: form.color === color }"
              @click="form.color = color"
            >
              <span v-if="form.color === color" class="checkmark">✓</span>
            </button>
          </div>
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn-cancel" @click="$emit('close')">取消</button>
        <button class="btn-save" @click="save" :disabled="!isFormValid">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'

export default {
  props: {
    plan: Object,
    isEditing: Boolean
  },
  emits: ['save', 'close'],
  setup(props, { emit }) {
    const colors = [
      '#FFE5E5',
      '#FFE5CC',
      '#FFEBE5',
      '#E5F5FF',
      '#E5FFE5',
      '#F0E5FF',
      '#FFF5E5',
      '#E5FFFF'
    ]

    const form = reactive({
      name: props.plan?.name || '',
      target: props.plan?.target || 0,
      color: props.plan?.color || colors[0]
    })

    const isFormValid = computed(() => {
      return form.name.trim().length > 0 && form.target > 0
    })

    const save = () => {
      if (isFormValid.value) {
        emit('save', {
          name: form.name,
          target: form.target,
          color: form.color,
          amount: props.plan?.amount || 0
        })
      }
    }

    return {
      form,
      colors,
      isFormValid,
      save
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;
}

.modal {
  background: white;
  width: 100%;
  border-radius: 20px 20px 0 0;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
}

.btn-close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 14px;
  color: #333;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.char-count {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #999;
  text-align: right;
}

.color-picker {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.color-option {
  aspect-ratio: 1;
  border: 2px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-option.selected {
  border-color: #333;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.checkmark {
  font-size: 20px;
  color: #333;
  font-weight: bold;
}

.modal-footer {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-top: 1px solid #eee;
}

.btn-cancel,
.btn-save {
  flex: 1;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #f0f0f0;
  color: #333;
}

.btn-cancel:active {
  background: #e0e0e0;
}

.btn-save {
  background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
  color: white;
}

.btn-save:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
