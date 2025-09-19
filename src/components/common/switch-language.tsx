import { Repeat as RepeatIcon } from "lucide-react"
import type { Dispatch, FC, SetStateAction } from "react"

import { Button } from "../ui/button"
import type { TransliterationVariantsType } from "@/types"

interface Props {
  isDisabled?: boolean
  translationType: TransliterationVariantsType
  setTranslationType: Dispatch<SetStateAction<TransliterationVariantsType>>
}

const SwitchLanguage: FC<Props> = ({ isDisabled, translationType, setTranslationType }) => {
  const onChangeTranslationType = () => {
    setTranslationType((prev) => {
      if (prev === "uk_la") return "la_uk"
      else return "uk_la"
    })
  }

  return (
    <div className="flex justify-between gap-1">
      <Button
        variant="outline"
        className="w-[39%] cursor-default hover:bg-white hover:text-primary rounded-lg shadow-sm text-sm"
      >
        {translationType === "la_uk" ? "Латинська" : "Українська"}
      </Button>

      <Button
        variant="secondary"
        disabled={isDisabled}
        onClick={onChangeTranslationType}
        className="rounded-lg shadow-sm bg-primary hover:bg-primary text-white"
      >
        <RepeatIcon />
      </Button>

      <Button
        variant="outline"
        className="w-[39%] cursor-default hover:bg-white hover:text-primary rounded-lg shadow-sm text-sm"
      >
        {translationType === "la_uk" ? "Українська" : "Латинська"}
      </Button>
    </div>
  )
}

export default SwitchLanguage
