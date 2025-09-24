import './NavbarButton.css'

interface NavbarButtonProps {
  openNavbar: () => void
}

export default function NavbarButton(props: NavbarButtonProps) {
  return(
    <span className="navbar-button-actions" onClick={props.openNavbar}>
      <div></div>
      <div></div>
      <div></div>
    </span>
  )
}