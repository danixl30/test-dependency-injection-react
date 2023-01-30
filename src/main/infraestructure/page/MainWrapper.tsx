import { useStateFactory } from '../../../core/infraestructure/state/useStateProvider'
import { mainWrapperLogic } from '../../application/logic/main-wrapper-logic'
import Main from './Main'

export default function MainWrapper() {
    const { openSate, onOpenClose } = mainWrapperLogic(useStateFactory)
    return (
        <>
            <button onClick={onOpenClose}>
                {openSate.value ? 'Close' : 'Open'}
            </button>
            {openSate.value && <Main />}
        </>
    )
}
