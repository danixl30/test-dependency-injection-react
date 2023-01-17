import Main from '../../../main/infraestructure/page/Main'
import { EventProvider } from '../event-handler/context/EventProvider'

export default function App() {
    return (
        <>
            <EventProvider>
                <Main />
            </EventProvider>
        </>
    )
}
