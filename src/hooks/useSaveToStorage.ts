import { useLead } from '../context/LeadContext'

export default function useSaveToStorage() {
const {leads} = useLead()
const saveToStorage = () => {
 localStorage.setItem("leads", JSON.stringify(leads))
}

  return{saveToStorage}
}
