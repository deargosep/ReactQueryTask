import { Font, FontAdapt } from '../Font'
import { Variables } from '../Variables'
import { Layout } from '../Layout'
import { Images } from '../Images'

export const useTheme = () => {
  return {
    Font: Font,
    FontAdapt: FontAdapt,
    Layout: Layout(),
    Variables: Variables(),
    Colors: Variables().colors,
    Images: Images()
  }
}
