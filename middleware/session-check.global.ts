import { withQuery } from 'ufo'

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useUserToken()

  console.log('to', to)
  console.log('from', from);

  if (to.meta.requiresAuth && !token.value) {
    return navigateTo(withQuery('/auth', {
      redirect: to.fullPath,
    }))
  }
})