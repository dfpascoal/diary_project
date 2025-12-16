import { useQuery } from '@tanstack/vue-query'
import type { UserProfile } from '@/types/settings'

const fetchUserProfile = async (): Promise<UserProfile> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?u=john',
    status: 'Ativo'
  }
}

export function useUserProfile() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
    staleTime: 5 * 60 * 1000, 
  })

  return {
    profile: data,
    isLoading,
    isError,
    error,
    refetch
  }
}