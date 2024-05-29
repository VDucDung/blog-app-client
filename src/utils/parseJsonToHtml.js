import parse from 'html-react-parser'
import { generateHTML } from '@tiptap/html'
import { extensions } from 'constants/tiptapExtensions'

const parseJsonToHtml = (json) => {
  return parse(generateHTML(json, extensions))
}

export default parseJsonToHtml
