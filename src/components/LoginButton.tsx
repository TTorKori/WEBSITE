interface Props {
	children: string,
	onClick: () => void
}


const LoginButton = ({children, onClick}:Props) => {
  return (
	 <button type="button" onClick={onClick}>{children}</button>
  )
}

export default LoginButton;