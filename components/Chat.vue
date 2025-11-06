<template>
  <div v-if="isAuthenticated">
    <div v-if="!closed" class="chat-widget" :class="{ 'collapsed': collapsed }">
      <div class="chat-header">
        <div class="left">
          <button class="collapse-btn" @click="toggleCollapsed" :title="collapsed ? 'Buka chat' : 'Minimize chat'">
            <span v-if="collapsed">🔽</span>
            <span v-else>🔼</span>
          </button>
          <h3 v-if="!collapsed">Chat - {{ room }}</h3>
        </div>
        <div class="right" style="display:flex;gap:8px;align-items:center;">
          <button v-if="!collapsed" @click="clearMessages" class="clear-btn">Clear</button>
          <button v-if="!collapsed" @click="closeChat" class="close-btn" title="Tutup chat">✖</button>
        </div>
      </div>

      <div v-show="!collapsed" class="chat-messages" ref="messagesWrap">
        <div v-for="m in messages" :key="m.id" class="chat-message">
          <div class="meta">
            <strong>{{ (m.user && m.user.name) || ('User ' + (m.userId || 'anon')) }}</strong>
            <span class="ts">{{ formatTs(m.createdAt) }}</span>
          </div>
          <div class="text">{{ m.message }}</div>
        </div>
      </div>

      <form v-show="!collapsed" @submit.prevent="send" class="chat-input">
        <input v-model="newMessage" placeholder="Tulis pesan..." :disabled="!isAuthenticated" />
        <button :disabled="sending || !newMessage.trim() || !isAuthenticated">Kirim</button>
      </form>

      <div v-if="!isAuthenticated && !collapsed" class="px-3 pb-3 text-xs text-gray-500">Silakan login untuk mengirim pesan.</div>
    </div>
    <button v-else class="chat-opener-btn" @click="openChat" title="Buka chat">
      💬
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({ room: { type: String, default: 'global' } })
const room = props.room

const messages = ref([])
const newMessage = ref('')
const sending = ref(false)
const polling = ref(null)
const messagesWrap = ref(null)
const isAuthenticated = ref(false)
const collapsed = ref(false)
const closed = ref(false)
function closeChat(){
  closed.value = true
  try{ localStorage.setItem(`chat_closed_${room}`, '1') }catch(e){}
  stopPolling()
}

function openChat(){
  closed.value = false
  try{ localStorage.setItem(`chat_closed_${room}`, '0') }catch(e){}
  if(!collapsed.value){ fetchMessages(); startPolling() }
}

function formatTs(v){
  try{ return new Date(v).toLocaleString() }catch(e){return ''}
}

async function fetchMessages(){
  try{
    const token = localStorage.getItem('dinda_token')
    if(!token){
      console.warn('No token available for chat')
      messages.value = []
      return
    }
    const res = await $fetch(`/api/chat?room=${encodeURIComponent(room)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if(res?.success) messages.value = res.data || []
    // scroll to bottom
    nextTick(()=>{
      if(messagesWrap.value) messagesWrap.value.scrollTop = messagesWrap.value.scrollHeight
    })
  }catch(e){ 
    console.error(e)
    // If authentication fails, clear messages
    if(e?.status === 401) {
      messages.value = []
    }
  }
}

async function send(){
  if(!newMessage.value.trim()) return
  sending.value = true
  try{
    const token = localStorage.getItem('dinda_token')
    if(!token){
      alert('Silakan login terlebih dahulu untuk mengirim pesan.')
      return
    }

    await $fetch('/api/chat', { method: 'POST', body: { room, message: newMessage.value.trim() }, headers: { Authorization: `Bearer ${token}` } })
    newMessage.value = ''
    await fetchMessages()
  }catch(e){ console.error(e) }
  finally{ sending.value = false }
}

function clearMessages(){ messages.value = [] }

function startPolling(){
  if(polling.value) return
  polling.value = setInterval(fetchMessages, 2500)
}

function stopPolling(){
  if(polling.value){ clearInterval(polling.value); polling.value = null }
}

function toggleCollapsed(){
  collapsed.value = !collapsed.value
  try{ localStorage.setItem(`chat_collapsed_${room}`, collapsed.value ? '1' : '0') }catch(e){}
  if(collapsed.value){ stopPolling() } else { fetchMessages(); startPolling() }
}

onMounted(()=>{
  // restore collapsed and closed state per room
  try{
    const keyCollapsed = `chat_collapsed_${room}`
    const sCollapsed = localStorage.getItem(keyCollapsed)
    collapsed.value = sCollapsed === '1'
    const keyClosed = `chat_closed_${room}`
    const sClosed = localStorage.getItem(keyClosed)
    closed.value = sClosed === '1'
  }catch(e){ collapsed.value = false; closed.value = false }

  // determine if user is authenticated by presence of token
  try{ isAuthenticated.value = !!localStorage.getItem('dinda_token') }catch(e){ isAuthenticated.value = false }

  if(!closed.value){
    fetchMessages()
    if(!collapsed.value) startPolling()
  }
})

onBeforeUnmount(()=>{ stopPolling() })
</script>

<style scoped>
.chat-widget{ width:320px; border:1px solid #e6e6e6; border-radius:8px; background:white; display:flex; flex-direction:column; font-family: Poppins, sans-serif }
.chat-widget.collapsed{ width: 48px; height: 48px; overflow: visible }
.chat-header{ display:flex; justify-content:space-between; align-items:center; padding:8px 12px; border-bottom:1px solid #f0f0f0 }
.chat-header .left{ display:flex; align-items:center; gap:8px }
.collapse-btn{ background:transparent; border:none; cursor:pointer; font-size:14px }
.close-btn{ background:transparent; border:none; cursor:pointer; font-size:16px; color:#888; margin-left:4px; border-radius:4px; padding:2px 6px; transition:background 0.2s }
.close-btn:hover{ background:#f0f0f0; color:#d33 }
.chat-messages{ padding:12px; height:300px; overflow:auto }
.chat-message{ margin-bottom:10px }
.meta{ font-size:12px; color:#666; display:flex; gap:8px; align-items:center }
.text{ background:#f6f8fb; padding:8px 10px; border-radius:6px; margin-top:4px }
.chat-input{ display:flex; gap:8px; padding:8px }
.chat-input input{ flex:1; padding:8px; border-radius:6px; border:1px solid #e0e0e0 }
.chat-input button{ padding:8px 12px; background:#4CAF50; color:white; border-radius:6px; border:none }
.clear-btn{ background:transparent; border:1px solid #e0e0e0; padding:6px 8px; border-radius:6px }
.chat-opener-btn{ position:fixed; bottom:24px; right:24px; z-index:1000; width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg, #17B3A9, #0FA39B); color:white; font-size:24px; border:none; box-shadow:0 4px 20px rgba(23, 179, 169, 0.3); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.3s ease; animation:pulse 2s infinite }
.chat-opener-btn:hover{ transform:scale(1.1); box-shadow:0 6px 25px rgba(23, 179, 169, 0.4) }
@keyframes pulse{ 0%{ box-shadow:0 4px 20px rgba(23, 179, 169, 0.3) } 50%{ box-shadow:0 4px 20px rgba(23, 179, 169, 0.6), 0 0 0 10px rgba(23, 179, 169, 0.1) } 100%{ box-shadow:0 4px 20px rgba(23, 179, 169, 0.3) } }
</style>