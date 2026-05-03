import React, { useState, useEffect } from "react"

import Cycle from "#types/cycle"

const useCycles = () => {
    const [cycles, setCycles] = useState<Cycle[]>([])
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

                if (!canceled) {
                    setCycles(data.cycles)
                }
            } catch (error: unknown) {
                if (!canceled) {
                    setError(error instanceof Error ? error.message : "Unknown error");
                }

                throw error;
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
        cycles,
        isLoading,
        error
    }
}

export default useCycles;