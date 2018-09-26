
export function setStore(key,val){
   if(typeof val==='object'){
     localStorage.setItem(key,JSON.stringify(val))
   }else {
     localStorage.setItem(key,val)
   }
}

export function getStore(key) {
  let val=localStorage.getItem(key)
   try{
      return JSON.parse(val)
   }catch (e) {
      return val
   }
}
