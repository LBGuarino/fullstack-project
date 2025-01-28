export default function AboutUs() {
    return (
      <div className="w-full min-h-screen flex flex-col md:flex-row">
          <div className="flex-1 bg-gradient-to-br from-white to-cyan-50 flex flex-col items-center justify-center p-8">
              <h1 className="text-3xl font-boldtext-3xl md:text-4xl font-light text-center mb-4">About Us</h1>
              <p className="text-base md:text-lg font-extralight text-center max-w-md leading-relaxed">
                  We are a team of highly skilled and experienced professionals who are dedicated to providing the best possible service to our clients. Our team is made up of experts in various fields, including engineering, marketing, and sales, who are committed to delivering exceptional results.
              </p>
        </div>
      </div>
    );
  }