import { useMutation } from '@tanstack/react-query'


export const useMutationHook = (fnCallback, options = {}) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
        ...options,
      })
      return mutation
}