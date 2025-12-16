declare module '@/composables/useUserProfile' {
  import { UseQueryResult } from '@tanstack/vue-query';
  import { UserProfile } from '@/types/settings';

  export function useUserProfile(): {
    profile: UseQueryResult<UserProfile | undefined>['data'];
    isLoading: UseQueryResult['isLoading'];
    isError: UseQueryResult['isError'];
    error: UseQueryResult['error'];
    refetch: UseQueryResult['refetch'];
  };
}