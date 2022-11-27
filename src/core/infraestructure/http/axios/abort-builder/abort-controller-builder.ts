export const abortControllerBuilder = {
    build() {
        const controller = new AbortController()
        return {
            signal: controller.signal,
            cancel: () => controller.abort(),
        }
    },
}
