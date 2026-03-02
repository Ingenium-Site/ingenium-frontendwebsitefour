import React, { useEffect, useState } from 'react'

const words = ['sight', 'fluence', 'telligent', 'tegrity', 'genium']
const colors = ['#00C2B8', '#00A3FF', '#F55A1F', '#C9A227', '#00C2B8']

export default function TextMorph(){
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % words.length), 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="textmorph" aria-live="polite" aria-atomic="true">
      <div className="textmorph__row">
        <span className="textmorph__in">In</span>
        <span className="textmorph__slot">
          <span
            key={index}
            className="textmorph__word"
            style={{ color: colors[index % colors.length] }}
          >
            {words[index]}
          </span>
          <span className="textmorph__underline" />
        </span>
      </div>
    </div>
  )
}
