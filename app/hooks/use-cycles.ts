import { useState, useEffect } from "react"

import Cycle from "#types/cycle"

const useCycles = () => {
    const [cycle, setCycle] = useState<Cycle | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let canceled = false;

        const fetchCycles = async () => {
            try {
                const response = await fetch("/api/linear")

                if (!response.ok) {
                    const body = await response.json().catch(() => ({}))

                    throw new Error(body.error ?? `Request failed: ${response.status}`)
                }

                const data: { cycles: Cycle[] } = await response.json()

                if (!canceled && data.cycles?.length) {
                    // Active cycles per team is always 0 or 1 in this setup.
                    setCycle(data.cycles[0])
                }
            } catch (error: unknown) {
                if (!canceled) {
                    setError(error instanceof Error ? error.message : "Unknown error");
                }
            } finally {
                if (!canceled) {
                    setIsLoading(false);
                }
            }
        }

        fetchCycles()

        return () => {
            canceled = true
        }
    }, [])

    return {
        cycle,
        isLoading,
        error
    }
}

export default useCycles;