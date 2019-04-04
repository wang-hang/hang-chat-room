import { User } from '../interfaces'

export function rndColor() { // 排除全黑 全白
  // @ts-ignore
  const r = parseInt(Math.random() * 254 ,10) + 1 
  // @ts-ignore
  const g = parseInt(Math.random() * 254 ,10) + 1 
  // @ts-ignore
  const b = parseInt(Math.random() * 254 ,10) + 1 

  return `rgb(${r}, ${g}, ${b})`
}

export function storeUser(user: User) {
  window.sessionStorage.setItem('user', JSON.stringify(user))
}

export function getUser(): User {
  //  @ts-ignore
  return JSON.parse(window.sessionStorage.getItem('user'))
}

export function hasUser() {
  return getUser() !== null
}

export function isSelf(user: User, targetUser: User) {
  return user.name === targetUser.name
}