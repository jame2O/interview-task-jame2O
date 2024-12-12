import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import 'react-tooltip/dist/react-tooltip.css'
import App from 'components/App'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<App />)
