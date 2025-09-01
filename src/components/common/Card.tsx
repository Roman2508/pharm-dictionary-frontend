import { type FC, type PropsWithChildren } from 'react'

const Card: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center gap-8 container max-w-3xl relative mx-auto mb-8 flex-1 p-6 border border-border backdrop-blur-[4px] rounded-lg">
      {children}
    </div>
  )
}

export default Card
