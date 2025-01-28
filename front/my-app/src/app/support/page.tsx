export default function Support() {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 bg-gradient-to-br from-white to-cyan-50 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-boldtext-3xl md:text-4xl font-light text-center mb-4">Support</h1>
            <p className="text-base md:text-lg font-extralight text-center max-w-md leading-relaxed">
                If you have any questions or need help, please contact us at 
                <a href="mailto:support@mmst.eu" className="text-cyan-700 hover:text-cyan-500 transition-all duration-300 ease-in-out">
                {` support@hi-tec.eu `}
                </a>
            </p>
      </div>
    </div>
  );
}