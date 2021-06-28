import * as yup from "yup";


export const groups = (label, flow, collapsed = true) => {
  return { label, flow, collapsed }
}


export const ref = (ref) => yup.ref(ref)