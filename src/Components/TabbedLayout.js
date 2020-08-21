import React from 'react';
import { useState } from 'react';

export function TabbedLayout({children, labels}) {
  const [active, setActive] = useState(0);

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        flexDirection: 'row',
      }}
    >

      <div
        style={{
          width: "calc(100% - 35px)"
        }}
      >
        {children[active]}
      </div>
      <div
        style={{
          display: 'flex',
          height: '100%',
          justifyContent: 'space-around',
          flexDirection: 'column',
          flexGrow: 1,
          background: '#1E1E1E',
          color: '#DCDCDC',
          borderLeft: '2px solid #DCDCDC',
        }}
      >
        {labels.map((l, i) => (
          <div
            key={l}
            onClick={() => setActive(i)}
            style={{
              writingMode: 'vertical-rl',
              borderBottom: '2px solid #DCDCDC',
              flexGrow: 1,
              padding: "10px 5px",
            }}
          >
            {l}
          </div>
        ))}
      </div>
    </div>
  )
}
