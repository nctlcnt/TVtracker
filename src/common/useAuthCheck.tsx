import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GlobalContext from '@/globalContext/GlobalContext.ts'

export const useAuthCheck = () => {
    const TMDBTokenFromCookies = document.cookie.match(/TMDBToken=([^;]+)/)?.[1] || ''
    const userIdFromCookies = document.cookie.match(/userId=([^;]+)/)?.[1] || ''
    const {
        tokens: { TMDBToken },
        userId,
        setUserId,
        setTokens,
    } = React.useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!TMDBToken && !TMDBTokenFromCookies) {
            navigate('/settings')
        } else if (TMDBTokenFromCookies) {
            setTokens({ 'TMDBToken': TMDBTokenFromCookies })
        }
        if (!userId && !userIdFromCookies) {
            navigate('/')
        } else if (userIdFromCookies) {
            setUserId(userIdFromCookies)
        }
    }, [])
}
