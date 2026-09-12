import Image from "next/image";
import Link from "next/link";

export function QuoteScene() {
  return (
    <section className="quote-scene" aria-label="Quote scene">
      <div className="quote-grain" aria-hidden="true" />
      <div className="quote-flower-wrap" aria-hidden="true">
        <Image
          alt=""
          className="quote-flower-image"
          height={860}
          priority
          src="/quote-flower.png"
          width={560}
        />
      </div>

      <blockquote className="quote-main">
        <span>You can be the prettiest shade of </span>
        <em>blue</em>
        <span>, but if their favorite color is </span>
        <strong>red</strong>
        <span>, it does not matter.</span>
      </blockquote>

      <Link className="quote-next" href="/characters">
        <span>if you have ever felt this way in life click this</span>
        <b aria-hidden="true">&rsaquo;</b>
      </Link>
    </section>
  );
}
