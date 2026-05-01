import React, { useState, useEffect } from "react"

import { Cycle } from "@linear/sdk"
import linear from "#api/linear-client"

const useCycles = () => {
    const [cycles, setCycles] = useState<Cycle[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCycles = async () => {
            try {
                const teams = await linear.teams()
                const [team] = teams.nodes;

                const cycles = await team.cycles({ filter: { isActive: { eq: true } } })

                if (cycles.nodes && cycles.nodes?.length) {
                    setCycles(cycles.nodes)
                } else {
                    console.warn(`There are no cycles for ${team.displayName}`)
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(`@useCycles - An error occurred while retreiving assigned cycles ${error.message}`)
                }

                throw error;
            } finally {
                setIsLoading(false)
            }
        }

        fetchCycles()
    }, [])

    return {
        cycles,
        isLoading
    }
}

export default useCycles;