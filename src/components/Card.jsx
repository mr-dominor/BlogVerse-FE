/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

function Card({
    children="",
    id="",
    className="",
    ...props
}) {
  return (
    <div className={className}{...props} id={id}>
    </div>
  )
}

export default Card
