import { Link } from "react-router-dom";
import { displayNames, libTypes } from "../consts";
import { shuffled } from "../utils";

const shuffledLibs = shuffled(libTypes.slice());

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
          <div className="text-2xl py-6 flex gap-2 pr-28">
            <span>
              Compare in the blink of an eye components from many React UI
              libraries such as
            </span>
            <div
              className="inline [--rotate-word-height:20px] font-semibold text-secondary"
              style={{
                ["--rotate-animation-duration" as string]:
                  3 * libTypes.length + "s",
              }}
            >
              {shuffledLibs.map((lib, i) => (
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
