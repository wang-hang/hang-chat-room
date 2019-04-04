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

export function formatDate(timeStr: string) {
  const date = new Date(timeStr)

  const Y = date.getFullYear()
  const M = date.getMonth() + 1
  const D = date.getDate()

  const h = date.getHours()
  const m = date.getMinutes()
  const s = date.getSeconds()

  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

// 将对象转换成url参数
export function normalizeParam(obj: any) {
  let str = '?'
  for(const key in obj) {
    str += `${key}=${obj[key]}&`
  }
  if(str[str.length - 1] === '&') {
    str.slice(str.length - 1)
  }
  return str
}