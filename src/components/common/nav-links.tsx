import { Link, useLocation } from "react-router";

import { Button } from "../ui/button";

const NavLinks = () => {
  const { pathname } = useLocation();

  const getLinkClassName = (link: string) => {
    return pathname === link
      ? "text-primary font-medium hover:bg-primary/10 bg-primary/10"
      : "text-muted-foreground font-medium hover:bg-muted/50";
  };

  return (
    <div className="flex space-x-4">
      <Link to="/">
        <Button variant="ghost" className={getLinkClassName("/")}>
          Словник
        </Button>
      </Link>

      <Link to="/exercises">
        <Button variant="ghost" className={getLinkClassName("/exercises")}>
          Тренажер
        </Button>
      </Link>
    </div>
  );
};

export default NavLinks;
