export default function AboutUs() {
    return (
      <div className="w-full min-h-screen flex flex-col md:flex-row">
          <div className="flex-1 bg-gradient-to-br from-white to-cyan-50 flex flex-col items-center justify-center p-8">
              <h1 className="text-3xl font-boldtext-3xl md:text-4xl font-light text-center mb-4">About Us</h1>
              <p className="text-base md:text-lg font-extralight text-center max-w-md leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt saepe aperiam perferendis soluta, sint cumque doloribus, laborum debitis aut unde ullam, ipsa ab non impedit nihil beatae veniam est omnis!
              </p>
        </div>
      </div>
    );
  }