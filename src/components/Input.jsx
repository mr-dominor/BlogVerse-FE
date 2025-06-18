/* eslint-disable react/prop-types */
import { useId } from "react"
function Input({
  label,
  type="",
  bgColor="",
  className="",
  ...props
}) {
  const id=useId()
  return (
    <>
    {label && <label htmlFor={id}>{label}</label> }
      <input type={`${type}`} className={`${className} ${bgColor}`}{...props} />
    </>
  )
}

export default Input
