import ReactDOM from 'react-dom/client'
import App from '../application/app'

export default function Bootstrap() {
    ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <App />,
    )
}
