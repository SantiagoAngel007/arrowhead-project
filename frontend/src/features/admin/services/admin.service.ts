const USE_MOCK = true

export const startEvent = async () => {
  if (USE_MOCK) return { status: 'started' }
  // const res = await axios.post('/api/admin/event/start')
  // return res.data
}

export const endEvent = async () => {
  if (USE_MOCK) return { status: 'ended' }
  // const res = await axios.post('/api/admin/event/end')
  // return res.data
}
