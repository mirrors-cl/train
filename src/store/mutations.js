import {
  SAVE_USER
} from "./type";

import {setStore} from '../assets/js/utils'

export default {
  [SAVE_USER]:function (state,payload) {
      state.userInfo=payload;
      setStore('userInfo',payload)
  }
}
