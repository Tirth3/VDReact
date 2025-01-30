import React from 'react';
import { useState } from 'react'
import { motion } from "framer-motion"
import { Flowers } from './components/Flowers';
import Confetti from 'react-confetti'
import './App.css'

// COLORS: 
//69247C
//DA498D
//FAC67A
//F9E6CF 

const cards = [
  { id: 1, title: "🎉A most heartily welcome!✨", description: "Upon the verdant mead so wide,\nDoth silver moon in silence glide.\nSoft winds whisper, rivers gleam,\nNight enfolds a golden dream.", img: '' },
  { id: 2, title: "1. A Whisper of Love, A Promise Everlasting📜🌙💖", description: "Upon yon fair and fated eve,\nWhere roses bloom and lovers weave,\nA question humbly dost I pose A token of love,\nas time bestows.", img: './images/1.jpg' },
  { id: 3, title: "2. A Love Most Earnest and Unwavering", description: "Through the passage of fleeting days and the turning of many seasons, my heart hath remained steadfast in its devotion.\nAs the oak doth stand firm against the tempest’s cry, so too doth my love endure, unshaken and resolute. In thy laughter, I find solace; in thy presence, I am whole. Wilt thou, dear heart, grant me the honor of walking beside thee upon this day of love and beyond?", img: './images/2.jpg' },
  { id: 4, title: "3. A Question Writ in the Stars", description: "Beyond the bounds of earthly tether, love doth shine as the heavens above. The stars themselves, in their eternal watch, whisper of fated hearts and promises yet unspoken. Thus, I do beseech thee—shall we not weave together a tale most wondrous?\nShall we not bind our fates in joyous unity, as the moon doth embrace the midnight sky?", img: './images/3.jpg' },
  { id: 5, title: "4. A Most Earnest Question: Wilt Thou Be Mine?", description: "Should thy heart mirror mine own, let this be but the dawn of a love most rare and true. In the pages yet unwritten, let us pen a tale of devotion unwavering, of laughter shared and burdens halved. For thee, I would traverse the endless hours, and in thy hand, I would place mine own, now and evermore.", img: './images/4.jpg' },
  { id: 6, title: "A Rejection Most Gentle: Yet Hope Doth Endure", description: "💌 Might I, dearest heart, be permitted yet again to ask? For love, true and deep, is oft but a whisper away from its destined embrace. Wilt thou reconsider?", img: './images/5.gif' },
  { id: 7, title: "A Joyous Acceptance: Love’s Sweetest Reply", description: "Oh fairest heart, thy words have graced mine ears as the sweetest of melodies, and in thy “yes,” I have found paradise itself. No jewel of kingly crown, nor treasure of boundless depths,\ncould rival the radiance of this moment\nWith thy sweetest ‘yes’ now gracing mine ears, might we then conspire to craft an eve most wondrous?", img: './images/6.gif' },
];
function TextWithLineBreaks(props) {
  const textWithBreaks = props.text.split('\n').map((text, index) => (
    <React.Fragment key={index}>
      {text}
      <br />
    </React.Fragment>
  ));

  return <>{textWithBreaks}</>;
}
const nummaincards = 5;
let yes = false;
let no = false;
let bgmplaying = false;
function App() {
  const [index, setIndex] = useState(0);

  const nextCard = () => { if(index == 0){bgm.play();} setIndex((prev) => (prev + 1) % cards.length) };
  const prevCard = () => setIndex((prev) => (prev - 1 + cards.length) % cards.length);
  const nocard = () => { setIndex((prev) => 5); no = true };
  const yescard = () => { setIndex((prev) => 6); yes = true };
  const controlaudio = () => { if(bgmplaying){ bgm.pause(); bgmplaying = false; } else{ bgm.play(); bgmplaying = true; } };
  const bgm = new Audio('./songs/bgm (2).mp3');
  // bgm.autoplay = true;
  // bgm.play();
  return (
    <>
      {/* <Flowers></Flowers> */}
      {/* <h1> Valentine!! </h1> */}
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}>
        <div className='cardcarousel'>
          <div className="card">
            <h2 className='ctitle'>{cards[index].title}</h2>

            <p className='description'><TextWithLineBreaks text={cards[index].description}></TextWithLineBreaks></p>
            {(index > nummaincards - 2 && !yes) ? <div className="asking">💖 Wilt thou be my Valentine?</div> : <></>}

            <div className="buttons">
              {(index < nummaincards - 1) ? <div className="nextbtn" onClick={nextCard}>➡</div> :
                <>
                  {(!yes) ?
                    <>
                      <div className="nextbtn" onClick={yescard}>YES🌹</div>
                      {(!no) ? <div className="nextbtn" onClick={nocard}>NO🥹</div> : <></>}
                    </> : <></>
                  }
                </>}
            </div>
          </div>
          {(index > 0)?
            <img className="cimage" src={cards[index].img} alt="" /> : <></>
          }
        </div>
      </motion.div>

      {(yes)? <Confetti
        drawShape={ctx => {
          ctx.beginPath()
          for (let i = 0; i < 22; i++) {
            const angle = 0.35 * i
            const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
            const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
            ctx.lineTo(x, y)
          }
          ctx.stroke()
          ctx.closePath()
        }}
      /> : <></>}
    {/* <div className="bgmbtn" onClick={controlaudio}>Play/Pause</div> */}
    </>
  )
}

export default App
