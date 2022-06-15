import { Link } from "react-router-dom";
import { displayNames, libTypes } from "../states";

export default function Hero() {
  return (
    <div className="hero min-h-full">
      <div className="hero-content text-center">
        <div>
          <h1 className="text-8xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              React-UIs
            </span>
          </h1>
          <div className="text-2xl py-6 flex gap-2 pr-24">
            <span>
              Compare in the blink of an eye components from many React UI
              libraries such as
            </span>
            <div
              className="inline [--rotate-word-height:20px]"
              style={{
                ["--rotate-animation-duration" as any]:
                  3 * libTypes.length + "s",
              }}
            >
              {libTypes.map((lib, i) => (
                <span
                  key={lib}
                  className="absolute overflow-hidden opacity-0 animate-rotate-word"
                  style={{
                    animationDelay: 3 * i + "s",
                  }}
                >
                  {displayNames[lib]}
                </span>
              ))}
            </div>
          </div>
          {/* TODO: link to palette */}
          <Link to="/buttons" className="btn btn-primary">
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
}
