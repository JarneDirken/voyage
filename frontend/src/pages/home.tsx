import background from "../assets/background.jpg";

export default function Home() {
  return (
    <div className="w-full h-full relative" style={{ minHeight: 'calc(100vh - 73.6px)' }}>
      <img
        src={background}
        alt="Background"
        className="w-full h-full object-cover absolute top-0 left-0 z-0"
      />
      <div className="w-full h-full z-10 absolute pt-20 pl-20">
        <h1 className="text-5xl font-bold">Trip planner</h1>
      </div>
    </div>
  );
}