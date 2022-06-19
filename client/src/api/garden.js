import axios from '@/utils/axios'

export function getGarden() {
  return axios.get('/garden')
}
