export function useAdmin() {
  const startEvent = () => console.log('Evento iniciado')
  const endEvent = () => console.log('Evento finalizado')

  return { startEvent, endEvent }
}
