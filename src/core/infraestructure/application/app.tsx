import MainWrapper from '../../../main/infraestructure/page/MainWrapper'
import { EventProvider } from '../event-handler/context/EventProvider'

export default function App() {
    return (
        <>
            <EventProvider>
                <MainWrapper />
            </EventProvider>
        </>
    )
}
