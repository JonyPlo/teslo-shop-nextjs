import { Dispatch, SetStateAction } from 'react'

interface Props {
  showToastState: boolean
  setShowToastState: Dispatch<SetStateAction<boolean>>
}

export const toggleShowToast = ({
  showToastState,
  setShowToastState,
}: Props) => {
  if (!showToastState) {
    const showToastTime = setInterval(() => {
      setShowToastState(false)
      clearInterval(showToastTime)
    }, 1000 * 5)
  }
}
