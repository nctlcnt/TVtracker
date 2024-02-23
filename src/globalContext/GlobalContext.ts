import { createContext } from 'react'
import { GlobalContextType } from '@/common/types/types'

const MyContext = createContext({} as GlobalContextType)
export default MyContext
