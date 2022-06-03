import { Link } from "react-router-dom";

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
          <p className="text-xl py-6">
            Compare many React UI libraries components in the blink of an eye!
          </p>
          <Link to="/buttons" className="btn btn-primary">
            Compare
          </Link>
        </div>
      </div>
    </div>
  );
}
