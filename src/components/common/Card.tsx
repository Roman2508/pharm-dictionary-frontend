import { type FC, type PropsWithChildren } from "react";

const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex-1">
      {/* bg-white */}
      {children}
    </div>
  );
};

export default Card;
