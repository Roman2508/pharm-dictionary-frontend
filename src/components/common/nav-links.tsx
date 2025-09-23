import { Link, useLocation } from "react-router"

import { Button } from "../ui/button"

const linkClassNames = "text-muted-foreground font-medium hover:bg-muted/50"
const activeLinkClassNames = "text-primary font-medium hover:bg-primary/10 bg-primary/10"

const NavLinks = () => {
  const { pathname } = useLocation()

  return (
    <div className="flex space-x-4">
      <Link to="/">
        <Button variant="ghost" className={pathname === "/" ? activeLinkClassNames : linkClassNames}>
          Словник
        </Button>
      </Link>

      <Link to="/exercises">
        <Button variant="ghost" className={pathname.includes("/exercises") ? activeLinkClassNames : linkClassNames}>
          Тренажер
        </Button>
      </Link>
    </div>
  )
}

export default NavLinks
