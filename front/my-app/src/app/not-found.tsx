export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 bg-gradient-to-br from-white to-cyan-50 flex flex-col items-center justify-center p-8">
        <h1 className="text-3xl font-boldtext-3xl md:text-4xl font-light text-center mb-4">
            404 - Page Not Found
        </h1>
        <p className="text-base md:text-lg font-extralight text-center max-w-md leading-relaxed">
          {`The page you are looking for does not exist (yet).`}
        </p>
      </div>
    </div>
  );
}