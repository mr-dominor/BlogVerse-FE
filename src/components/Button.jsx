/* eslint-disable react/prop-types */

function Button({
    children,
    type="button",
    bgColor="",
    className="",
    ...props
}) {
  return (
    <>
      <button className={`bg-${bgColor} ${className}`}{...props}>{children}</button>
    </>
  )
}

export default Button
