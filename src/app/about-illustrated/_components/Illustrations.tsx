import styles from "./IllustratedAbout.module.css";

// Original, editable SVG artwork. Moving parts are separate groups; no bitmap
// masks or external illustration assets are needed.
export function DeskPortrait() {
  return (
    <svg className={styles.drawing} viewBox="0 0 640 520" role="img" aria-labelledby="desk-portrait-title">
      <title id="desk-portrait-title">Vicky, wearing glasses and braids, working at a laptop beside a small plant.</title>
      <path className={styles.wash} d="M112 130C129 44 310 27 431 77S603 269 534 360S282 485 158 408S40 227 112 130Z" />
      <g className={styles.ink}>
        {/* Loose studio lines and a pinned note. */}
        <path className={styles.faint} d="M104 376Q307 369 555 381M132 389L559 392M125 419L146 419M174 419L228 419M480 419L532 419" />
        <path className={styles.paper} d="M459 104L520 96L526 159L463 166Z" />
        <path className={styles.faint} d="M479 112L504 108M473 128L510 122M475 140L504 135" />
        <path d="M483 91L488 108" />
        {/* Hair silhouette, with individual braid contours. */}
        <path className={styles.hair} d="M216 174C191 112 219 69 267 72C319 61 355 104 341 152L356 275L196 285Z" />
        <path className={styles.hairDetail} d="M235 87Q209 133 224 197L218 269M251 80Q226 132 242 202L237 272M266 78Q248 137 258 203M281 79Q270 124 279 149M302 86Q293 118 303 140M318 102Q309 139 322 185L336 262M326 152L342 269" />
        {/* Neck and blouse. */}
        <path className={styles.skin} d="M254 197L252 238L282 257L309 229L294 191" />
        <path className={styles.shirt} d="M246 224L212 235Q187 249 178 301L166 362L325 373L350 305Q350 252 310 228L280 257Z" />
        <path d="M249 224L235 240L255 265L279 255L295 267L319 244L307 227M280 260L283 344M214 264L202 305M323 270L329 302" />
        <path className={styles.faint} d="M222 276L215 316M232 280L227 323M246 276L244 324M263 282L261 325M304 281L309 303" />
        <circle cx="284" cy="281" r="1.8" /><circle cx="286" cy="303" r="1.8" />
        {/* Face, ears, glasses, and eyes. */}
        <path className={styles.skin} d="M237 124Q258 91 299 111L319 137L312 178Q305 211 280 216Q253 211 239 184L230 157Z" />
        <path className={styles.hair} d="M228 145Q218 106 248 90Q300 69 320 122Q293 95 272 118Q248 134 228 145Z" />
        <path className={styles.skin} d="M237 150Q220 142 224 162Q227 176 239 172" />
        <path d="M230 153L233 164M280 156L276 177L285 180M273 192Q284 199 296 190M250 144Q259 139 269 143M288 140Q299 137 308 143" />
        <path className={styles.glasses} d="M243 149Q254 144 274 149L273 167Q252 176 245 163ZM284 148Q299 141 313 148L309 164Q292 173 285 164Z" />
        <path d="M274 153L284 152M241 152L230 150" />
        <g className={styles.eyes}><path d="M253 155Q258 151 264 155M292 153Q298 149 303 153" /><circle cx="260" cy="155" r="1.8" /><circle cx="299" cy="153" r="1.8" /></g>
        <circle className={styles.accentFill} cx="237" cy="180" r="4" />
        {/* Resting arm and a small typing movement. */}
        <path className={styles.skin} d="M186 302Q192 297 204 305L220 337L275 337L286 356L212 367Q198 364 191 347L180 322Z" />
        <g className={styles.typingHand}>
          <path className={styles.skin} d="M315 302L333 309L335 331L373 334Q390 335 390 345L386 354L322 352Q309 348 307 333Z" />
          <path d="M367 335L376 344M358 336L365 345M349 337L355 345" />
        </g>
        {/* Laptop stays clear of the portrait. */}
        <path className={styles.laptop} d="M299 270Q298 263 307 262L466 260Q475 259 474 269L452 358L320 360Z" />
        <path d="M307 270L465 268M317 359L284 369Q282 374 298 375L464 375Q478 374 473 369L452 358" />
        <path className={styles.accentStroke} d="M376 304L365 315L375 325M400 304L411 314L400 325M392 300L382 329" />
        {/* Plant and mug. */}
        <path className={styles.paper} d="M91 333L139 333L134 371Q114 379 98 370Z" />
        <g className={styles.plant}>
          <path d="M115 335L115 277M115 316L94 298M116 306L137 285" />
          <path className={styles.leaf} d="M115 298Q88 297 86 277Q112 275 115 298ZM116 310Q142 310 146 286Q122 284 116 310ZM116 282Q100 265 113 250Q128 266 116 282Z" />
        </g>
        <path className={styles.paper} d="M495 324L534 324L531 363Q514 371 499 363ZM535 331Q559 329 551 349Q547 357 533 352" />
        <path className={styles.steam} d="M511 309Q501 297 512 287Q521 278 511 267M524 310Q514 298 525 289" />
        {/* A thought, not a constant shower of decoration. */}
        <g className={styles.spark}>
          <path className={styles.accentStroke} d="M376 128Q373 116 384 110Q401 104 408 117Q415 130 401 140L400 150L387 151L386 140Q377 137 376 128ZM388 158L400 157M390 165L398 164M390 96L389 84M416 102L424 93M421 123L434 122M369 101L360 93" />
        </g>
      </g>
      <path className={styles.captionLine} d="M429 428Q409 399 448 386M441 381L448 386L445 396" />
      <text className={styles.svgNote} x="374" y="456" transform="rotate(-4 374 456)">a few tabs open. always.</text>
    </svg>
  );
}

export function ProcessSketch({ revision }: { revision: number }) {
  return (
    <svg className={styles.drawing} viewBox="0 0 580 420" role="img" aria-labelledby="process-sketch-title">
      <title id="process-sketch-title">An open sketchbook: a rough wireframe becomes a finished website with a lilac illustration.</title>
      <path className={styles.wash} d="M61 100Q182 43 333 78T513 267Q481 369 301 349T51 262Q28 180 61 100Z" />
      <g className={styles.ink}>
        <path className={styles.paper} d="M61 103Q169 82 271 119Q366 79 500 107L515 333Q371 308 279 349Q179 316 73 341Z" />
        <path d="M271 119L279 349M67 347Q188 326 279 356Q402 321 516 342M270 125Q247 201 276 341" />
        <path className={styles.faint} d="M90 152L239 152M91 167L223 167M96 304L169 304M96 312L185 312" />
        <g className={styles.wireframe}>
          <path d="M94 184L238 181L240 283L96 287ZM96 201L239 198M103 190L107 190M114 190L117 190M124 190L127 190M108 215L166 214L167 265L109 266ZM108 215L167 265M166 214L109 266M180 218L226 218M180 231L217 231M180 244L224 244M181 255L208 255" />
        </g>
        <g key={revision} className={styles.finishedSketch}>
          <path className={styles.trace} pathLength="1" d="M304 152L473 151L480 286L308 289ZM305 173L475 172" />
          <g className={styles.finishedDetails}>
            <circle cx="315" cy="163" r="2" /><circle cx="325" cy="163" r="2" /><circle cx="335" cy="163" r="2" />
            <path className={styles.accentFill} d="M320 191L389 190L391 263L322 264Z" />
            <path d="M338 244Q349 199 375 225M338 244L379 244M403 197L457 197M404 209L448 209M404 223L458 223M404 234L440 234" />
            <path className={styles.laptop} d="M405 248L454 248L455 262L405 262Z" />
            <path d="M312 307L457 305M313 317L397 316" />
          </g>
        </g>
        <path className={styles.accentStroke} d="M225 78Q266 42 322 67M308 54L324 67L305 73" />
        <g transform="rotate(15 531 220)"><path className={styles.accentFill} d="M523 133L536 133L536 302L530 326L523 302Z" /><path d="M523 149L536 149M524 298L536 298M530 153L530 292" /></g>
      </g>
      <text className={styles.svgNote} x="82" y="382" transform="rotate(-3 82 382)">first, a little messy.</text>
      <text className={styles.svgNote} x="324" y="378" transform="rotate(2 324 378)">then, a little magic.</text>
    </svg>
  );
}

export function NeonSketch() {
  return (
    <svg className={styles.drawing} viewBox="0 0 560 390" role="img" aria-labelledby="neon-sketch-title">
      <title id="neon-sketch-title">Neon, a sleeping tabby cat, curls up on a cushion beside a pair of slippers.</title>
      <path className={styles.wash} d="M109 90Q204 28 352 72T487 247Q458 333 273 326T77 237Q54 146 109 90Z" />
      <g className={styles.ink}>
        <path className={styles.cushion} d="M98 239Q88 199 140 176Q241 147 365 175Q460 192 451 246Q447 285 309 296Q157 307 109 272Q95 260 98 239Z" />
        <path className={styles.faint} d="M109 252Q242 303 439 251M136 261L142 270M158 270L165 278M187 276L194 284M218 280L225 287M253 282L260 289M291 280L298 287M329 276L336 283M368 270L375 277M408 258L415 267" />
        <g className={styles.catBreathing}>
          <path className={styles.fur} d="M143 215Q119 156 166 127Q217 96 288 128Q311 140 322 168Q365 151 392 176Q412 201 391 225Q367 253 295 248Q222 268 166 243Z" />
          <path className={styles.furDark} d="M158 144Q163 167 187 176L175 184Q151 173 146 163ZM192 126Q193 152 219 163L205 173Q184 157 180 133ZM228 122Q225 143 250 158L239 168Q215 152 216 122ZM266 129Q252 143 278 160L268 171Q241 152 252 125Z" />
          <path className={styles.furLight} d="M262 226Q295 203 321 220L347 239Q306 256 277 245Z" />
          {/* Ears and face are separate from the tail. */}
          <path className={styles.fur} d="M308 184L302 142L337 164Q356 161 370 170L404 151L396 195Q397 225 364 238Q330 238 311 212Z" />
          <path className={styles.ear} d="M310 155L314 181L329 171ZM393 163L375 176L389 187Z" />
          <path className={styles.furDark} d="M339 165L346 189L355 170L364 191L371 171L360 163Z" />
          <path className={styles.furLight} d="M339 210Q351 204 359 212Q371 205 380 213Q376 234 359 235Q342 232 339 210Z" />
          <path d="M324 196Q331 204 340 198M370 199Q379 205 386 196M350 213L362 215L357 220ZM357 221Q352 227 347 223M357 221Q362 228 367 224M335 212L311 208M336 219L308 221M379 214L405 207M380 221L407 220" />
          <path className={styles.furLight} d="M262 235Q273 217 292 228L314 240Q306 253 286 250L266 246Z" />
          <path d="M286 233L283 242M294 236L292 246" />
        </g>
        <g className={styles.catTail}>
          <path className={styles.fur} d="M172 207Q132 221 167 244Q220 276 263 248Q275 235 263 227Q254 223 245 234Q218 249 188 237Q166 228 185 218" />
          <path d="M166 229L157 238M188 237L182 252M212 242L211 259M237 239L242 253" />
        </g>
        <path className={styles.paper} d="M58 304Q68 278 82 284L105 314Q110 329 95 331L60 328Q47 325 58 304ZM106 321Q108 290 124 294L153 319Q165 333 150 339L115 343Q101 343 106 321Z" />
        <path className={styles.faint} d="M60 306L94 318M109 323L143 329" />
      </g>
      <g className={styles.sleepMarks} aria-hidden="true"><text x="395" y="136">z</text><text x="419" y="110">z</text><text x="445" y="76">z</text></g>
      <path className={styles.captionLine} d="M221 71Q215 89 237 103M226 103L237 103L231 93" />
      <text className={styles.svgNote} x="105" y="58" transform="rotate(-3 105 58)">head of taking breaks.</text>
    </svg>
  );
}
