'use client'

import { useEffect } from 'react'
import ReactGA from 'react-ga'

export default function GoogleAnalytics() {
  useEffect(() => {
    ReactGA.initialize('9748525137')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  return null
}