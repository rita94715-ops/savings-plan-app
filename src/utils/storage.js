const STORAGE_KEY = 'savings_plans'

export function loadPlans() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error loading plans:', error)
    return []
  }
}

export function savePlans(plans) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans))
  } catch (error) {
    console.error('Error saving plans:', error)
  }
}
