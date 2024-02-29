import { ReactNode } from "react"

interface Props {
  children: ReactNode,
}
const Display = ({children}:Props) => {


  return (
	 <>
    {children}
	 </>
  )
}

export default Display