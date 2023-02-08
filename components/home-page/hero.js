import Image from 'next/image'
import classes from './hero.module.css'

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/yang.jpg"
          alt="An Image showing Name"
          width={300}
          height={300}
          priority
        />
      </div>
      <h1>Hi, I'm First Last</h1>
      <p>
        I blog about web development - especially fullstack skills with
        Javascript, Golang.
      </p>
    </section>
  )
}

export default Hero
