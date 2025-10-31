interface CityOption {
  zip: string
  city: string
  state_id: string
  county_name: string
  display: string
}

export function useCitySearch() {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const searchCities = async (query: string, limit = 10): Promise<CityOption[]> => {
    if (!query || query.length < 2) {
      return []
    }

    try {
      const data = await $fetch<CityOption[]>('/api/cities', {
        query: { q: query, limit }
      })
      return data || []
    } catch (error) {
      console.error('Error searching cities:', error)
      return []
    }
  }

  const debouncedSearch = (query: string, limit = 10): Promise<CityOption[]> => {
    return new Promise((resolve) => {
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      debounceTimer = setTimeout(async () => {
        const results = await searchCities(query, limit)
        resolve(results)
      }, 300)
    })
  }

  return {
    searchCities,
    debouncedSearch
  }
}