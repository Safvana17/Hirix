import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getMe } from '../redux/slices/authSlice'
import type { AppDispatch } from '../redux/store'

const App = () => {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])


  return (
    <div>
      
    </div>
  )
}

export default App


